// Role-specific profile data storage and helpers
// Stores in localStorage under distinct keys

const CUST_KEY = 'rw_customer'
const MECH_KEY = 'rw_mechanic'
const GARAGE_KEY = 'rw_garage'

export function ensureDefaults(role){
  if(role==='customer'){
    const v = localStorage.getItem(CUST_KEY)
    if(!v){
      const def = {
        vehicles: [
          { id: 'VH-001', brand: 'Maruti', model: 'Baleno', plate: 'MH12AB1234', primary: true },
        ],
        addresses: [
          { id: 'ADDR-01', label: 'Home', line: 'A-12, Sunrise Apt', city: 'Pune', pincode: '411001' },
        ],
        favorites: [
          { id: 'MECH-88', name: 'Anand AutoWorks', rating: 4.8 },
        ],
        orders: [
          { id: 'ORD-1001', date: Date.now()-86400000*10, items: 2, total: 1799, status: 'Completed' },
        ],
      }
      localStorage.setItem(CUST_KEY, JSON.stringify(def))
    }
  }
  if(role==='mechanic'){
    const v = localStorage.getItem(MECH_KEY)
    if(!v){
      const def = {
        skills: ['Engine','Brakes','Electrical'],
        certifications: [{ id: 'CERT-01', name: 'ASE Level 1', year: 2023 }],
        serviceAreas: [{ id: 'AREA-01', area: 'Kothrud', km: 10 }],
        availability: {
          mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false,
        },
        jobs: [{ id: 'JOB-220', title: 'ECU Scan', date: Date.now()-86400000*3, status: 'Completed' }],
      }
      localStorage.setItem(MECH_KEY, JSON.stringify(def))
    }
  }
  if(role==='garage'){
    const v = localStorage.getItem(GARAGE_KEY)
    if(!v){
      const def = {
        team: [
          { id: 'TM-01', name: 'Ravi', role: 'Lead Mechanic' },
          { id: 'TM-02', name: 'Priya', role: 'Service Advisor' },
        ],
        bays: [
          { id: 'BAY-1', name: 'Bay 1', status: 'Active' },
          { id: 'BAY-2', name: 'Bay 2', status: 'Busy' },
        ],
        inventory: [
          { id: 'INV-01', name: 'Engine Oil 5W-30', stock: 24, unit: 'L' },
          { id: 'INV-02', name: 'Brake Pads', stock: 12, unit: 'sets' },
        ],
        services: [
          { id: 'SRV-01', category: 'Maintenance', name: 'Basic Service', price: 1299 },
          { id: 'SRV-02', category: 'Repairs', name: 'Brake Service', price: 999 },
        ],
        hours: { weekdays: '09:00-18:00', weekends: '10:00-16:00' },
      }
      localStorage.setItem(GARAGE_KEY, JSON.stringify(def))
    }
  }
}

export function getCustomer(){
  const v = localStorage.getItem(CUST_KEY)
  return v ? JSON.parse(v) : { vehicles: [], addresses: [], favorites: [], orders: [] }
}
export function saveCustomer(data){
  localStorage.setItem(CUST_KEY, JSON.stringify(data))
}

export function getMechanic(){
  const v = localStorage.getItem(MECH_KEY)
  return v ? JSON.parse(v) : { skills: [], certifications: [], serviceAreas: [], availability: {}, jobs: [] }
}
export function saveMechanic(data){
  localStorage.setItem(MECH_KEY, JSON.stringify(data))
}

export function getGarage(){
  const v = localStorage.getItem(GARAGE_KEY)
  return v ? JSON.parse(v) : { team: [], bays: [], inventory: [], services: [], hours: {} }
}
export function saveGarage(data){
  localStorage.setItem(GARAGE_KEY, JSON.stringify(data))
}
