export const mechanicProfileDefaults = {
  rating: 4.8,
  servicesCompleted: 96,
  totalEarnings: 139500,
  monthlyEarnings: 32600,
  pendingAmount: 2800,
  servicesThisMonth: 14,
  avgPerService: 1960,
  services: [
    { id: 'svc-oil', name: 'Engine Oil Change', rate: '₹900' },
    { id: 'svc-battery', name: 'Battery Jump Start', rate: '₹700' },
    { id: 'svc-brake', name: 'Brake Inspection', rate: '₹1100' },
    { id: 'svc-puncture', name: 'Puncture Repair', rate: '₹350' }
  ],
  reviews: [
    { id: 'rev-1', rating: '4.9', customerName: 'Rohit Kulkarni', comment: 'Reached quickly and fixed the issue professionally.' },
    { id: 'rev-2', rating: '4.7', customerName: 'Ananya Shah', comment: 'Clear communication and fair pricing.' },
    { id: 'rev-3', rating: '5.0', customerName: 'Manish Verma', comment: 'Battery issue resolved in under 20 minutes.' },
    { id: 'rev-4', rating: '4.8', customerName: 'Priyanka Joshi', comment: 'Good diagnosis and neat work quality.' }
  ],
  availability: {
    startTime: '09:30',
    endTime: '19:00',
    serviceArea: 'Bengaluru West Zone'
  }
}

export function getMechanicDashboardStats() {
  return {
    todayJobs: 3,
    todayEarnings: 3680,
    monthlyJobs: 33,
    monthlyEarnings: 47200,
    rating: '4.8',
    totalReviews: 96
  }
}

export function getMechanicWeeklyEarnings() {
  return [
    { day: 'Mon', amount: 2400 },
    { day: 'Tue', amount: 3100 },
    { day: 'Wed', amount: 2700 },
    { day: 'Thu', amount: 3550 },
    { day: 'Fri', amount: 2980 },
    { day: 'Sat', amount: 3320 },
    { day: 'Sun', amount: 2860 }
  ]
}

export function getMechanicRecentReviews() {
  return [
    { id: 'recent-1', name: 'Amit Joshi', rating: 5, text: 'Came on time and fixed my battery quickly.', date: 'Today' },
    { id: 'recent-2', name: 'Sneha Nair', rating: 4, text: 'Good service and helpful updates throughout.', date: 'Yesterday' },
    { id: 'recent-3', name: 'Vikram Patil', rating: 5, text: 'Very professional, explained issue clearly.', date: '2 days ago' },
    { id: 'recent-4', name: 'Neha Sharma', rating: 4, text: 'Puncture resolved fast with fair charges.', date: '3 days ago' }
  ]
}

export function getMechanicNearbyRequests(mechanicId = 'm1', now = Date.now()) {
  return [
    {
      id: `DEMO-REQ-${mechanicId}-1`,
      customerName: 'Rahul Sharma',
      customerPhone: '+91 98765 43210',
      location: 'Kormangala Depot, Bengaluru',
      distance: '1.3 km',
      distanceKm: 1.3,
      etaMinutes: 8,
      price: 650,
      vehicle: 'Hyundai i20',
      createdAt: now - 6 * 60000,
      problem: 'Car not starting after fuel stop. Suspected battery terminal issue.',
      status: 'pending'
    },
    {
      id: `DEMO-REQ-${mechanicId}-2`,
      customerName: 'Priya Nair',
      customerPhone: '+91 99887 76655',
      location: 'Indiranagar Main Road, Bengaluru',
      distance: '2.5 km',
      distanceKm: 2.5,
      etaMinutes: 14,
      price: 420,
      vehicle: 'Honda Activa',
      createdAt: now - 12 * 60000,
      problem: 'Front-left tyre puncture on scooter, replacement needed on-site.',
      status: 'pending'
    },
    {
      id: `DEMO-REQ-${mechanicId}-3`,
      customerName: 'Amit Patil',
      customerPhone: '+91 91234 56789',
      location: 'Whitefield Bridge, Bengaluru',
      distance: '4.1 km',
      distanceKm: 4.1,
      etaMinutes: 20,
      price: 850,
      vehicle: 'Maruti Swift',
      createdAt: now - 20 * 60000,
      problem: 'Battery drained overnight, needs jump start and charging check.',
      status: 'pending'
    }
  ]
}

export function getFallbackCompletedOrders(now = Date.now()) {
  return [
    {
      id: 'ORDER-1001',
      customerName: 'Arjun Mehta',
      customerPhone: '+91 98989 89898',
      location: 'HSR Layout, Bengaluru',
      problem: 'Flat battery and jump start required',
      vehicle: 'Hyundai i20',
      status: 'completed',
      progress: 100,
      amount: 850,
      distanceKm: 3.2,
      completedAt: now - 2 * 86400000,
      acceptedAt: now - 2 * 86400000 - 5400000
    },
    {
      id: 'ORDER-1002',
      customerName: 'Nisha Verma',
      customerPhone: '+91 97777 11111',
      location: 'Koramangala, Bengaluru',
      problem: 'Tyre puncture replacement and pressure check',
      vehicle: 'Honda Activa',
      status: 'completed',
      progress: 100,
      amount: 420,
      distanceKm: 5.4,
      completedAt: now - 5 * 86400000,
      acceptedAt: now - 5 * 86400000 - 4200000
    },
    {
      id: 'ORDER-1003',
      customerName: 'Karan Deshpande',
      customerPhone: '+91 96666 23456',
      location: 'Malleshwaram, Bengaluru',
      problem: 'Brake noise and front pad inspection',
      vehicle: 'Maruti Baleno',
      status: 'completed',
      progress: 100,
      amount: 1450,
      distanceKm: 4.1,
      completedAt: now - 8 * 86400000,
      acceptedAt: now - 8 * 86400000 - 7200000
    }
  ]
}
