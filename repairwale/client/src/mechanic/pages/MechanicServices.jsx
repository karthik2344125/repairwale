import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../shared/components/Button'
import { getMechanic, saveMechanic } from '../../shared/services/roleData'
import { showSuccess } from '../../shared/services/toast'

const styles = `
.mechanic-services {
  min-height: 100vh;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  padding: 40px 20px;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0;
}

.page-subtitle {
  color: rgba(255,206,50,0.7);
  font-size: 14px;
  margin-top: 6px;
}

.card {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.4);
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #0B1F3B;
  box-shadow: 0 0 12px rgba(29,99,255,0.12);
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;
  margin: 0 0 16px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.service-item {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  border: 1px solid #0B1F3B;
  border-radius: 20px;
  padding: 16px;
  transition: all 0.3s ease;
}

.service-item:hover {
  border-color: #0B1F3B;
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%);
  box-shadow: 0 0 12px rgba(29,99,255,0.12);
  transform: translateY(-2px);
}

.service-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.service-name {
  color: #FFFFFF;
  font-weight: 700;
  font-size: 16px;
}

.service-meta {
  color: rgba(255,206,50,0.7);
  font-size: 12px;
}

.service-price {
  color: #0B1F3B;
  font-weight: 700;
  font-size: 14px;
}

.badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.badge.active {
  background: rgba(255,206,50,0.2);
  color: #FFFFFF;
}

.badge.inactive {
  background: rgba(255,206,50,0.2);
  color: #FFFFFF;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.form-group label {
  display: block;
  color: rgba(255,206,50,0.7);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  background: rgba(29,99,255,0.15);
  border: 1px solid #0B1F3B;
  border-radius: 20px;
  color: #FFFFFF;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #0B1F3B;
  background: rgba(29,99,255,0.25);
  box-shadow: 0 0 12px rgba(29,99,255,0.12);
}

.empty {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255,206,50,0.7);
}

.action-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.toggle-btn {
  background: rgba(29,99,255,0.3);
  border: 1px solid #0B1F3B;
  color: #FFFFFF;
  border-radius: 9999px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  border-color: #0B1F3B;
  background: rgba(29,99,255,0.1);
  box-shadow: 0 0 15px rgba(29,99,255,0.12);
}

@media (max-width: 768px) {
  .mechanic-services {
    padding: 24px 16px;
  }
  
  .services-container {
    max-width: 100%;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .page-subtitle {
    font-size: 13px;
  }
  
  .card {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .card-title {
    font-size: 16px;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  
  .service-item {
    padding: 14px;
  }
  
  .service-name {
    font-size: 15px;
  }
  
  .action-row {
    margin-top: 14px;
  }
}

@media (max-width: 480px) {
  .mechanic-services {
    padding: 16px 12px;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .page-subtitle {
    font-size: 12px;
  }
  
  .card {
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 10px;
  }
  
  .card-title {
    font-size: 15px;
    margin-bottom: 14px;
  }
  
  .form-grid {
    gap: 12px;
  }
  
  .form-group label {
    font-size: 11px;
  }
  
  .form-input {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .grid {
    gap: 12px;
  }
  
  .service-item {
    padding: 12px;
  }
  
  .service-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
  }
  
  .service-name {
    font-size: 14px;
  }
  
  .service-meta {
    font-size: 11px;
  }
  
  .service-price {
    font-size: 13px;
  }
  
  .badge {
    font-size: 10px;
    padding: 3px 8px;
  }
  
  .toggle-btn {
    font-size: 11px;
    padding: 5px 8px;
  }
  
  .action-row {
    display: flex;
    justify-content: stretch;
  }
  
  .action-row button {
    width: 100%;
  }
}

/* ===== PREMIUM THEME WITH HIGHLIGHTS ===== */
.mechanic-services {
  background: linear-gradient(180deg, #0B1F3B 0%, #0B1F3B 100%) !important;
}

.page-title {
  color: #FFFFFF !important;
  text-shadow: 0 2px 8px rgba(29,99,255,0.1);
}

.page-subtitle {
  color: rgba(255,255,255,0.7) !important;
}

.card {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  box-shadow: 0 8px 28px rgba(0,0,0,0.4);
  position: relative;
}

.card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #0B1F3B, #0B1F3B);
  border-radius: 24px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.card:hover::after {
  opacity: 0.15;
}

.card:hover {
  box-shadow: 0 12px 40px rgba(29,99,255,0.12);
}

.card-title {
  color: #FFFFFF !important;
  text-shadow: 0 2px 8px rgba(29,99,255,0.1);
}

.service-item {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  transition: all 0.3s ease;
}

.service-item:hover {
  border-color: #0B1F3B !important;
  box-shadow: 0 4px 16px rgba(29,99,255,0.12);
}

.service-name {
  color: #FFFFFF !important;
}

.service-meta {
  color: rgba(255,255,255,0.7) !important;
}

.service-price {
  color: #FFFFFF !important;
  font-weight: 700;
  font-size: 14px;
}

.badge.active {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(255,206,50,0.3);
}

.badge.inactive {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(255,206,50,0.3);
}

.form-group label {
  color: rgba(255,255,255,0.7) !important;
}

.form-input {
  background: rgba(29,99,255,0.8) !important;
  border: 2px solid #0B1F3B !important;
  color: #FFFFFF !important;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: #0B1F3B !important;
  background: rgba(29,99,255,0.5) !important;
  box-shadow: 0 0 0 4px rgba(29,99,255,0.1);
}

.empty {
  color: rgba(255,255,255,0.7) !important;
}

.toggle-btn {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  border: 2px solid #0B1F3B !important;
  color: #FFFFFF !important;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: linear-gradient(135deg, #0B1F3B 0%, #0B1F3B 100%) !important;
  color: #FFFFFF !important;
  box-shadow: 0 6px 20px rgba(29,99,255,0.22);
}
`

const emptyService = { name: '', category: '', price: '', duration: '', active: true }

export default function MechanicServices() {
  const [mechanic, setMechanic] = useState(() => getMechanic())
  const [form, setForm] = useState(emptyService)

  const services = useMemo(() => mechanic?.services || [], [mechanic])

  const updateMechanic = (next) => {
    setMechanic(next)
    saveMechanic(next)
  }

  const handleAddService = () => {
    if (!form.name.trim() || !form.category.trim()) {
      alert('Please enter service name and category')
      return
    }

    const nextService = {
      id: `SRV-${Date.now()}`,
      name: form.name.trim(),
      category: form.category.trim(),
      price: parseInt(form.price || '0', 10),
      duration: form.duration.trim(),
      active: true
    }

    const next = { ...mechanic, services: [...services, nextService] }
    updateMechanic(next)
    setForm(emptyService)
    showSuccess('Service added')
  }

  const handleToggle = (id) => {
    const next = {
      ...mechanic,
      services: services.map(s => s.id === id ? { ...s, active: !s.active } : s)
    }
    updateMechanic(next)
  }

  const handleRemove = (id) => {
    if (!confirm('Remove this service?')) return
    const next = { ...mechanic, services: services.filter(s => s.id !== id) }
    updateMechanic(next)
    showSuccess('Service removed')
  }

  return (
    <div className="mechanic-services" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <style>{styles}</style>
      <div className="services-container">
        <div className="page-header">
          <div>
            <h1 className="page-title">Services Provided</h1>
            <div className="page-subtitle">Manage the services you offer to customers.</div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Add New Service</div>
          <div className="form-grid">
            <div className="form-group">
              <label>SERVICE NAME</label>
              <input
                className="form-input"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Brake Service"
              />
            </div>
            <div className="form-group">
              <label>CATEGORY</label>
              <input
                className="form-input"
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Repairs"
              />
            </div>
            <div className="form-group">
              <label>PRICE (₹)</label>
              <input
                className="form-input"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>DURATION</label>
              <input
                className="form-input"
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="e.g. 45 mins"
              />
            </div>
          </div>
          <div className="action-row">
            <Button onClick={handleAddService}>Add Service</Button>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Your Services</div>
          {services.length === 0 ? (
            <div className="empty">No services added yet.</div>
          ) : (
            <div className="grid">
              {services.map(service => (
                <div key={service.id} className="service-item">
                  <div className="service-header">
                    <div className="service-name">{service.name}</div>
                    <span className={`badge ${service.active ? 'active' : 'inactive'}`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="service-meta">{service.category} {service.duration ? ` ${service.duration}` : ''}</div>
                  <div style={{marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="service-price">₹ {service.price || 0}</div>
                    <div style={{display: 'flex', gap: 8}}>
                      <button className="toggle-btn" onClick={() => handleToggle(service.id)}>
                        {service.active ? 'Disable' : 'Enable'}
                      </button>
                      <button className="toggle-btn" onClick={() => handleRemove(service.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


