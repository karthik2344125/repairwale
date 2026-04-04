import { connectRealtimeWithFallback } from './realtime'

function normalizeLocation(position) {
  return {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    timestamp: Date.now()
  }
}

export function watchDeviceLocation({ onLocation, onError, options = {} } = {}) {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    if (onError) onError(new Error('Geolocation is not available in this browser'))
    return () => {}
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      if (onLocation) onLocation(normalizeLocation(position))
    },
    (error) => {
      if (onError) onError(error)
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 3000,
      ...options
    }
  )

  return () => {
    try {
      navigator.geolocation.clearWatch(watchId)
    } catch {}
  }
}

export function startMechanicLiveTracking({
  mechanicId,
  orderId,
  onConnect,
  onDisconnect,
  onLocation,
  onError,
  minEmitIntervalMs = 3000,
  watchOptions
} = {}) {
  let stopWatch = () => {}
  let lastSentAt = 0
  let stopped = false

  const realtime = connectRealtimeWithFallback({
    onConnect: (socket, url) => {
      if (stopped) return

      if (onConnect) onConnect({ url, socket })

      stopWatch = watchDeviceLocation({
        options: watchOptions,
        onError,
        onLocation: (location) => {
          if (!mechanicId || !orderId) return
          const now = Date.now()
          if (now - lastSentAt < minEmitIntervalMs) return
          lastSentAt = now

          socket.emit('mechanic:location', {
            mechanicId,
            orderId,
            lat: location.lat,
            lng: location.lng,
            timestamp: location.timestamp
          })

          socket.emit('update-mechanic-location', {
            orderId,
            location
          })

          if (onLocation) onLocation(location)
        }
      })

      socket.on('disconnect', () => {
        if (onDisconnect) onDisconnect()
      })
    },
    onError
  })

  return {
    get socket() {
      return realtime.socket
    },
    stop: () => {
      stopped = true
      try {
        stopWatch()
      } catch {}
      try {
        if (realtime.socket && orderId) {
          realtime.socket.emit('stop-tracking', { orderId })
        }
      } catch {}
      realtime.disconnect()
    }
  }
}


