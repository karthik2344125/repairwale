// Role-specific profile data storage and helpers
// Stores in localStorage under distinct keys

const CUST_KEY = 'rw_customer'
const MECH_KEY = 'rw_mechanic'

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
        services: [
          { id: 'SRV-M-01', name: 'Engine Diagnostics', category: 'Diagnostics', price: 699, duration: '45 mins', active: true },
          { id: 'SRV-M-02', name: 'Brake Service', category: 'Repairs', price: 999, duration: '60 mins', active: true },
        ],
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
  return v ? JSON.parse(v) : { skills: [], services: [], certifications: [], serviceAreas: [], availability: {}, jobs: [] }
}
export function saveMechanic(data){
  localStorage.setItem(MECH_KEY, JSON.stringify(data))
}



