import React, { useState, useEffect, useRef } from 'react'

/**
 * TrackingSimulator - Demo component that simulates a real service booking with fake mechanic movement
 * Shows how the real-time tracking feature works end-to-end
 */
export default function TrackingSimulator({
  onStatusChange,
  onLocationUpdate,
  autoStart = false,
  forceRunning = null,
  onDemoStart,
  onDemoStop,
  userLocation = null,
  showControls = true
}) {
  const MAX_DEMO_ETA_MINUTES = 25
  const SEARCH_PHASE_MS = 5000
  const ACCEPT_PHASE_MS = 10000
  const ENROUTE_PHASE_MS = 75000
  const ARRIVAL_PHASE_MS = 80000
  const WORKING_PHASE_MS = 110000 // 30 seconds of work after arrival
  const COMPLETED_PHASE_MS = 115000 // 5 seconds to show completion
  const [simulationState, setSimulationState] = useState('idle') // idle, searching, en_route, arrived, working, completed
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const animationFrameRef = useRef(null)
  const simulationTimeRef = useRef(0)
  const autoStartConsumedRef = useRef(false)
  const selectedMechanicRef = useRef(null)
  const initialEtaRef = useRef(18)
  const nearbyMechanicsRef = useRef([])
  const routePointsRef = useRef([])
  const routeDistanceKmRef = useRef(0)
  const routeDurationMinRef = useRef(0)
  const startTokenRef = useRef(0)
  const customerLocationRef = useRef(null)
  const mechanicStartLocationRef = useRef(null)
  const mechanicDestinationRef = useRef(null)

  const buildNearbySnapshot = ({
    acceptedMechanicId,
    etaMinutes,
    distanceKm,
    currentLocation,
    status
  } = {}) => {
    const now = Date.now()
    return (nearbyMechanicsRef.current || []).map((item) => {
      if (item.id !== acceptedMechanicId) {
        return {
          ...item,
          status: item.status || 'available',
          lastUpdatedAt: item.lastUpdatedAt || now,
          currentLocation: item.currentLocation || item.start || null
        }
      }

      return {
        ...item,
        status: status || 'accepted',
        etaMinutes: typeof etaMinutes === 'number' ? etaMinutes : item.etaMinutes,
        distanceKm: typeof distanceKm === 'number' ? distanceKm : item.distanceKm,
        currentLocation: currentLocation || item.currentLocation || item.start || null,
        lastUpdatedAt: now
      }
    })
  }

  const mechanicPool = [
    { id: 'mech-101', name: 'Ravi Sharma', phone: '+91 98XXX 12031', vehicle: 'Bike Service Van', plate: 'DL 7S AX 2184', rating: 4.8, jobs: 342 },
    { id: 'mech-102', name: 'Amit Verma', phone: '+91 98XXX 77302', vehicle: 'Rapid Assist Van', plate: 'DL 3C BK 9041', rating: 4.7, jobs: 286 },
    { id: 'mech-103', name: 'Nitin Yadav', phone: '+91 99XXX 44815', vehicle: 'Roadside Patrol', plate: 'DL 8C QP 5620', rating: 4.9, jobs: 411 }
  ]

  const createNearbyMechanicStart = (customerLoc) => {
    const angle = Math.random() * Math.PI * 2
    const distanceKm = 0.7 + Math.random() * 4.3
    const latOffsetKm = Math.sin(angle) * distanceKm
    const lngOffsetKm = Math.cos(angle) * distanceKm

    const latOffset = latOffsetKm / 110.574
    const lngOffset = lngOffsetKm / (111.320 * Math.cos((customerLoc.lat * Math.PI) / 180))

    return {
      lat: customerLoc.lat + latOffset,
      lng: customerLoc.lng + lngOffset
    }
  }

  const fetchRoadRouteMetrics = async (start, end) => {
    const coords = `${start.lng},${start.lat};${end.lng},${end.lat}`
    const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Road metrics failed')
    const payload = await response.json()
    const best = payload?.routes?.[0]
    const points = (best?.geometry?.coordinates || []).map(([lng, lat]) => [lat, lng])
    if (!points.length) throw new Error('No route points')
    return {
      routePoints: points,
      distanceKm: Number(best.distance || 0) / 1000,
      etaMinutes: Math.max(2, Math.round(Number(best.duration || 0) / 60))
    }
  }

  // Simulate linear interpolation between two points
  const interpolateLocation = (start, end, progress) => {
    return {
      lat: start.lat + (end.lat - start.lat) * progress,
      lng: start.lng + (end.lng - start.lng) * progress
    }
  }

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (loc1, loc2) => {
    const R = 6371 // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180)
    const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos(loc2.lat * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const getPointAlongRoute = (routePoints, progress) => {
    if (!Array.isArray(routePoints) || !routePoints.length) return null
    if (routePoints.length === 1) {
      return { lat: routePoints[0][0], lng: routePoints[0][1] }
    }

    const clamped = Math.max(0, Math.min(1, progress))
    const segments = []
    let total = 0

    for (let i = 1; i < routePoints.length; i += 1) {
      const a = { lat: routePoints[i - 1][0], lng: routePoints[i - 1][1] }
      const b = { lat: routePoints[i][0], lng: routePoints[i][1] }
      const seg = calculateDistance(a, b)
      segments.push(seg)
      total += seg
    }

    if (!total) {
      return { lat: routePoints[0][0], lng: routePoints[0][1] }
    }

    const target = total * clamped
    let walked = 0
    for (let i = 1; i < routePoints.length; i += 1) {
      const seg = segments[i - 1]
      if (walked + seg >= target) {
        const ratio = seg ? (target - walked) / seg : 0
        return {
          lat: routePoints[i - 1][0] + (routePoints[i][0] - routePoints[i - 1][0]) * ratio,
          lng: routePoints[i - 1][1] + (routePoints[i][1] - routePoints[i - 1][1]) * ratio
        }
      }
      walked += seg
    }

    const last = routePoints[routePoints.length - 1]
    return { lat: last[0], lng: last[1] }
  }

  // Calculate ETA in minutes
  const calculateETA = (distance, speed = 40) => {
    return Math.ceil((distance / speed) * 60)
  }

  // Main simulation loop
  useEffect(() => {
    if (!isRunning) return

    const animate = () => {
      simulationTimeRef.current += 50 // ~20fps - slower, smoother movement
      let newState = simulationState
      let newProgress = progress

      // Simulation stages with timing
      if (simulationTimeRef.current < SEARCH_PHASE_MS) {
        // Stage 1: Searching for mechanics
        newState = 'searching'
        onStatusChange?.('Finding nearby mechanics...', 'searching')
      } else if (simulationTimeRef.current < ACCEPT_PHASE_MS) {
        // Stage 2: Mechanic accepted
        newState = 'accepted'
        const mechanic = selectedMechanicRef.current || mechanicPool[0]
        const acceptedSnapshot = buildNearbySnapshot({
          acceptedMechanicId: mechanic.id,
          etaMinutes: initialEtaRef.current,
          distanceKm: routeDistanceKmRef.current,
          currentLocation: mechanicStartLocationRef.current,
          status: 'accepted'
        })
        nearbyMechanicsRef.current = acceptedSnapshot
        onStatusChange?.(
          `${mechanic.name} accepted your request. Reaching in ${initialEtaRef.current} min`,
          'accepted',
          {
            mechanic,
            eta: initialEtaRef.current,
            acceptedAt: Date.now(),
            nearbyMechanics: acceptedSnapshot,
            acceptedMechanicId: mechanic.id,
            routePoints: routePointsRef.current,
            mechanicStartLocation: mechanicStartLocationRef.current,
            customerLocation: mechanicDestinationRef.current
          }
        )
      } else if (simulationTimeRef.current < ENROUTE_PHASE_MS) {
        // Stage 3: En route with slower real-time movement
        newState = 'en_route'
        newProgress = (simulationTimeRef.current - ACCEPT_PHASE_MS) / (ENROUTE_PHASE_MS - ACCEPT_PHASE_MS)
        
        if (newProgress <= 1) {
          const mappedPoint = getPointAlongRoute(routePointsRef.current, newProgress)
          const currentLocation = mappedPoint || interpolateLocation(
            mechanicStartLocationRef.current,
            mechanicDestinationRef.current,
            newProgress
          )
          const remainingDistance = Math.max(0, (routeDistanceKmRef.current || calculateDistance(currentLocation, mechanicDestinationRef.current)) * (1 - newProgress))
          const eta = Math.max(1, Math.round((routeDurationMinRef.current || initialEtaRef.current) * (1 - newProgress)))
          const mechanic = selectedMechanicRef.current || mechanicPool[0]
          const enRouteSnapshot = buildNearbySnapshot({
            acceptedMechanicId: mechanic.id,
            etaMinutes: eta,
            distanceKm: remainingDistance,
            currentLocation,
            status: 'en_route'
          })
          nearbyMechanicsRef.current = enRouteSnapshot

          onStatusChange?.(
            `${mechanic.name} is en route - ${remainingDistance.toFixed(1)} km away, ETA ${eta} min`,
            'en_route',
            {
              distance: remainingDistance,
              eta: eta,
              location: currentLocation,
              mechanic,
              acceptedAt: Date.now() - (initialEtaRef.current - eta) * 60000,
              nearbyMechanics: enRouteSnapshot,
              acceptedMechanicId: mechanic.id,
              routePoints: routePointsRef.current,
              mechanicStartLocation: mechanicStartLocationRef.current,
              customerLocation: mechanicDestinationRef.current
            }
          )

          onLocationUpdate?.(currentLocation)
        }
      } else if (simulationTimeRef.current < ARRIVAL_PHASE_MS) {
        // Stage 4: Arrived
        newState = 'arrived'
        const mechanic = selectedMechanicRef.current || mechanicPool[0]
        const arrivedSnapshot = buildNearbySnapshot({
          acceptedMechanicId: mechanic.id,
          etaMinutes: 0,
          distanceKm: 0,
          currentLocation: mechanicDestinationRef.current,
          status: 'arrived'
        })
        nearbyMechanicsRef.current = arrivedSnapshot
        onStatusChange?.(
          `${mechanic.name} has arrived at your location and is starting work`,
          'arrived',
          {
            distance: 0,
            eta: 0,
            location: mechanicDestinationRef.current,
            mechanic,
            nearbyMechanics: arrivedSnapshot,
            acceptedMechanicId: mechanic.id,
            routePoints: routePointsRef.current,
            mechanicStartLocation: mechanicStartLocationRef.current,
            customerLocation: mechanicDestinationRef.current
          }
        )
        onLocationUpdate?.(mechanicDestinationRef.current)
      } else if (simulationTimeRef.current < WORKING_PHASE_MS) {
        // Stage 5: Working
        newState = 'working'
        const mechanic = selectedMechanicRef.current || mechanicPool[0]
        const timeWorking = (simulationTimeRef.current - ARRIVAL_PHASE_MS) / 1000 // in seconds
        const totalWorkTime = (WORKING_PHASE_MS - ARRIVAL_PHASE_MS) / 1000 // total work duration
        const workProgress = Math.round((timeWorking / totalWorkTime) * 100)
        
        const workingSnapshot = buildNearbySnapshot({
          acceptedMechanicId: mechanic.id,
          etaMinutes: 0,
          distanceKm: 0,
          currentLocation: mechanicDestinationRef.current,
          status: 'working'
        })
        nearbyMechanicsRef.current = workingSnapshot
        onStatusChange?.(
          `${mechanic.name} is working on your service (${workProgress}% complete)`,
          'working',
          {
            distance: 0,
            eta: 0,
            location: mechanicDestinationRef.current,
            mechanic,
            nearbyMechanics: workingSnapshot,
            acceptedMechanicId: mechanic.id,
            workProgress: workProgress,
            routePoints: routePointsRef.current,
            mechanicStartLocation: mechanicStartLocationRef.current,
            customerLocation: mechanicDestinationRef.current
          }
        )
        onLocationUpdate?.(mechanicDestinationRef.current)
      } else if (simulationTimeRef.current < COMPLETED_PHASE_MS) {
        // Stage 6: Completed
        newState = 'completed'
        const mechanic = selectedMechanicRef.current || mechanicPool[0]
        const completedSnapshot = buildNearbySnapshot({
          acceptedMechanicId: mechanic.id,
          etaMinutes: 0,
          distanceKm: 0,
          currentLocation: mechanicDestinationRef.current,
          status: 'completed'
        })
        nearbyMechanicsRef.current = completedSnapshot
        onStatusChange?.(
          `${mechanic.name} has completed the service. Thank you for using RepairWale!`,
          'completed',
          {
            distance: 0,
            eta: 0,
            location: mechanicDestinationRef.current,
            mechanic,
            nearbyMechanics: completedSnapshot,
            acceptedMechanicId: mechanic.id,
            routePoints: routePointsRef.current,
            mechanicStartLocation: mechanicStartLocationRef.current,
            customerLocation: mechanicDestinationRef.current
          }
        )
        onLocationUpdate?.(mechanicDestinationRef.current)
      } else {
        // End demo
        newState = 'completed'
        setIsRunning(false)
        simulationTimeRef.current = 0
        onDemoStop?.({ reason: 'completed' })
        return
      }

      setSimulationState(newState)
      setProgress(Math.min(newProgress, 1))
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRunning, simulationState, progress])

  const handleStart = async () => {
    const startToken = Date.now()
    startTokenRef.current = startToken

    const hasLiveLocation = typeof userLocation?.lat === 'number' && typeof userLocation?.lng === 'number'
    if (!hasLiveLocation) {
      onStatusChange?.('Enable location access to start live road demo.', 'idle')
      onDemoStop?.({ reason: 'no-live-location' })
      return
    }

    const customerLoc = { lat: userLocation.lat, lng: userLocation.lng, name: 'Live User Location' }

    const mechanicsWithMetrics = await Promise.all(
      mechanicPool.map(async (base) => {
        const start = createNearbyMechanicStart(customerLoc)
        try {
          const metrics = await fetchRoadRouteMetrics(start, customerLoc)
          return {
            ...base,
            start,
            etaMinutes: metrics.etaMinutes,
            distanceKm: metrics.distanceKm,
            routePoints: metrics.routePoints
          }
        } catch {
          const directDistance = calculateDistance(start, customerLoc)
          const fallbackEta = Math.max(3, Math.round((directDistance / 30) * 60))
          return {
            ...base,
            start,
            etaMinutes: fallbackEta,
            distanceKm: directDistance,
            routePoints: [
              [start.lat, start.lng],
              [customerLoc.lat, customerLoc.lng]
            ]
          }
        }
      })
    )

    if (startTokenRef.current !== startToken) return

    const sortedByEta = [...mechanicsWithMetrics].sort((a, b) => a.etaMinutes - b.etaMinutes)
    const withinDemoWindow = sortedByEta.filter((item) => item.etaMinutes <= MAX_DEMO_ETA_MINUTES)
    const acceptancePoolBase = withinDemoWindow.length ? withinDemoWindow : sortedByEta
    const acceptancePool = acceptancePoolBase.slice(0, Math.min(3, acceptancePoolBase.length))
    const acceptedCandidate = acceptancePool[Math.floor(Math.random() * acceptancePool.length)] || sortedByEta[0]
    const randomAccepted = {
      ...acceptedCandidate,
      etaMinutes: Math.min(MAX_DEMO_ETA_MINUTES, acceptedCandidate.etaMinutes)
    }
    const decoratedNearby = sortedByEta.map((item) => ({
      ...item,
      status: item.id === randomAccepted.id ? 'accepted' : 'available',
      currentLocation: item.start,
      lastUpdatedAt: Date.now()
    }))

    customerLocationRef.current = customerLoc
    mechanicStartLocationRef.current = randomAccepted.start
    mechanicDestinationRef.current = { lat: customerLoc.lat, lng: customerLoc.lng }
    routePointsRef.current = randomAccepted.routePoints || []
    routeDistanceKmRef.current = randomAccepted.distanceKm || 0
    routeDurationMinRef.current = randomAccepted.etaMinutes || 12

    selectedMechanicRef.current = randomAccepted
    nearbyMechanicsRef.current = decoratedNearby
    initialEtaRef.current = randomAccepted.etaMinutes
    simulationTimeRef.current = 0
    setProgress(0)
    setSimulationState('idle')
    setIsRunning(true)
    onDemoStart?.({
      mechanic: randomAccepted,
      etaMinutes: randomAccepted.etaMinutes,
      nearbyMechanics: decoratedNearby,
      acceptedMechanicId: randomAccepted.id
    })
  }

  const handleStop = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    setIsRunning(false)
    simulationTimeRef.current = 0
    setProgress(0)
    setSimulationState('idle')
    selectedMechanicRef.current = null
    nearbyMechanicsRef.current = []
    routePointsRef.current = []
    onStatusChange?.('Demo stopped. Start again to re-run the mechanic flow.', 'idle')
    onDemoStop?.({ reason: 'manual' })
  }

  useEffect(() => {
    if (!autoStart || isRunning || autoStartConsumedRef.current) return
    autoStartConsumedRef.current = true
    handleStart()
  }, [autoStart, isRunning])

  useEffect(() => {
    if (forceRunning === true && !isRunning) {
      handleStart()
    }
    if (forceRunning === false && isRunning) {
      handleStop()
    }
  }, [forceRunning, isRunning])

  const getStatusColor = () => {
    switch (simulationState) {
      case 'searching': return '#60a5fa'
      case 'accepted': return '#fbbf24'
      case 'en_route': return '#3b82f6'
      case 'arrived': return '#10b981'
      case 'completed': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getStatusIcon = () => {
    switch (simulationState) {
      case 'searching': return '🔍'
      case 'accepted': return '✓'
      case 'en_route': return '🚗'
      case 'arrived': return '📍'
      case 'completed': return '✅'
      default: return '⏸️'
    }
  }

  return null
}
