import React, { useRef, useState } from 'react'
import RequestForm from '../components/RequestForm'
import Button from '../components/Button'

// Professional service catalogue (industry-style) with pricing tiers
const catalog = [
  {
    id: 'emergency',
    title: 'Emergency Roadside Assistance',
    items: [
      { id: 'breakdown', title: 'Breakdown Quick Fix', desc: 'Minor repairs done on spot (belts, fuses)', price: '₹299–699' },
      { id: 'flat_tyre', title: 'Flat Tyre Assistance', desc: 'Tyre change or puncture patching', price: '₹249–499' },
      { id: 'jump_start', title: 'Battery Jump-Start', desc: 'Start the vehicle with portable booster', price: '₹199–399' },
      { id: 'fuel_delivery', title: 'Emergency Fuel Delivery', desc: '2–5 litres of fuel delivered (fuel cost extra)', price: '₹149–299' },
      { id: 'locked_keys', title: 'Keys Locked Assistance', desc: 'Unlock support (non-destructive)', price: '₹399–899' },
    ],
  },
  {
    id: 'maintenance',
    title: 'At-Home Vehicle Maintenance',
    items: [
      { id: 'standard_service', title: 'Standard Service', desc: 'Oil change, filters check, brake inspection', price: '₹999–1,599' },
      { id: 'comprehensive', title: 'Comprehensive Service', desc: 'Full engine check, coolant & AC inspection', price: '₹1,699–2,999' },
      { id: 'pickup_drop', title: 'Pickup & Drop Servicing', desc: 'Mechanic collects and returns vehicle', price: '₹199–499' },
      { id: 'detailing', title: 'Car/Bike Wash & Detailing', desc: 'Exterior & interior cleaning', price: '₹399–1,999' },
    ],
  },
  {
    id: 'repairs',
    title: 'Mechanical & Electrical Repairs',
    items: [
      { id: 'engine', title: 'Engine Repair', desc: 'Diagnostics, tune-ups, minor component fix', price: '₹699–4,999' },
      { id: 'brake', title: 'Brake Service', desc: 'Pads replacement & alignment', price: '₹399–1,999' },
      { id: 'battery_replace', title: 'Battery Replacement', desc: 'Installation + testing (battery cost extra)', price: '₹199–399' },
      { id: 'clutch', title: 'Clutch & Gear Work', desc: 'Labour & parts replacement', price: '₹1,499–6,999' },
      { id: 'ecu', title: 'ECU Scanning & Reset', desc: 'Sensor scan & code clearing', price: '₹399–1,099' },
    ],
  },
  {
    id: 'parts',
    title: 'Spare Parts & Accessories',
    items: [
      { id: 'tyres', title: 'Tyres', desc: 'Branded tyres + fitting charges', price: '₹1,000–8,000' },
      { id: 'oils', title: 'Engine Oils & Fluids', desc: 'Top brands (Synthetic/Mineral)', price: '₹299–1,999' },
      { id: 'filters', title: 'Filters & Consumables', desc: 'Air/Oil filters, spark plugs, brake fluid', price: '₹99–899' },
      { id: 'batteries', title: 'Batteries', desc: 'Car/bike batteries with warranty', price: '₹900–8,999' },
    ],
  },
  {
    id: 'towing',
    title: 'Towing & Vehicle Transport',
    items: [
      { id: 'city_tow', title: 'City Towing (Up to 10 km)', desc: 'For accident or full breakdown', price: '₹799–1,499' },
      { id: 'flatbed', title: 'Flatbed Towing', desc: 'Premium towing for cars & superbikes', price: '₹1,499–3,999' },
      { id: 'long_distance', title: 'Long Distance Transport', desc: 'Cost per kilometer (after 10 km)', price: '₹30–60 per km' },
    ],
  },
  {
    id: 'digital',
    title: 'Digital & Support Services',
    items: [
      { id: 'estimates', title: 'Digital Estimate & Billing', desc: 'Automated breakdown of charges', price: 'Free' },
      { id: 'tracking', title: 'Real-Time Mechanic Tracking', desc: 'Live location + ETA updates', price: 'Free' },
      { id: 'chat', title: 'In-App Chat & Support', desc: 'Voice/text chat with mechanic', price: 'Free' },
      { id: 'history', title: 'Service History & Warranty Tracking', desc: 'Records all repairs & invoices', price: 'Free' },
    ],
  },
]

export default function Service(){
  const [prefill, setPrefill] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const formRef = useRef(null)

  function bookService(s){
    const text = `${s.title} — ${s.price}`
    setPrefill(text)
    setSelectedService({ id: s.id, title: s.title, price: s.price })
    // scroll to form
    setTimeout(() => {
      const el = document.getElementById('request-form')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 120)
  }

  async function handleSubmit(problem){
    // attempt to get user's location
    let lat = 28.6139, lng = 77.2090
    try{
      const pos = await new Promise((res, rej) => {
        if (!navigator.geolocation) return rej(new Error('no geo'))
        navigator.geolocation.getCurrentPosition(p => res(p), e => rej(e), { timeout: 5000 })
      })
      lat = pos.coords.latitude; lng = pos.coords.longitude
    }catch(e){ /* ignore and use default */ }

    const payload = { customerName: 'Guest', lat, lng, problem, service: selectedService }
    try{
      const r = await fetch('/api/request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await r.json()
      if (data && data.ok) {
        alert('Request created — ' + data.request.id)
        // optionally navigate to map
        window.location.href = '/map'
      } else {
        alert('Could not create request')
      }
    }catch(err){
      console.warn(err)
      alert('Request failed: ' + err.message)
    }
  }

  return (
    <div>
      <h2 style={{marginTop:0}}>Services</h2>
      {catalog.map(cat => (
        <section key={cat.id} style={{marginBottom:20}}>
          <h3 className="category-title">{cat.title}</h3>
          <div className="services-grid">
            {cat.items.map(s => (
              <div key={s.id} className="card service-card">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div className="service-title">{s.title}</div>
                    <div className="muted">{s.desc}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontWeight:800}}>{s.price}</div>
                    <div style={{marginTop:8}}><Button variant="primary" size="sm" onClick={() => bookService(s)}>Book Service</Button></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section id="request-form" style={{marginTop:20}} className="card">
        <h3>Request a Service</h3>
        <p className="muted">Selected: {selectedService ? `${selectedService.title} (${selectedService.price})` : 'None'}</p>
        <RequestForm onSubmit={handleSubmit} initialProblem={prefill} submitLabel={selectedService ? 'Book Selected Service' : 'Book'} ref={formRef} />
      </section>
    </div>
  )
}
