import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../shared/components/Button'
import { getMechanic, saveMechanic } from '../../shared/services/roleData'
import { showSuccess } from '../../shared/services/toast'

const styles = `
.mechanic-services {
  min-height: 100vh;
  background: linear-gradient(135deg, #0b1220 0%, #152239 100%);
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
  color: #ffffff;
  margin: 0;
}

.page-subtitle {
  color: #9aa7bf;
  font-size: 14px;
  margin-top: 6px;
}

.card {
  background: #101a2a;
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  margin-bottom: 24px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.service-item {
  background: rgba(30, 58, 138, 0.12);
  border: 1px solid rgba(30, 58, 138, 0.25);
  border-radius: 10px;
  padding: 16px;
  transition: all 0.2s ease;
}

.service-item:hover {
  border-color: rgba(30, 58, 138, 0.45);
  background: rgba(30, 58, 138, 0.18);
}

.service-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.service-name {
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
}

.service-meta {
  color: #9aa7bf;
  font-size: 12px;
}

.service-price {
  color: #3b82f6;
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
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.badge.inactive {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.form-group label {
  display: block;
  color: #9aa7bf;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  background: rgba(30, 58, 138, 0.15);
  border: 1px solid rgba(30, 58, 138, 0.3);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(30, 58, 138, 0.25);
}

.empty {
  text-align: center;
  padding: 40px 20px;
  color: #9aa7bf;
}

.action-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.toggle-btn {
  background: transparent;
  border: 1px solid rgba(30, 58, 138, 0.3);
  color: #ffffff;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
}

.toggle-btn:hover {
  border-color: rgba(30, 58, 138, 0.5);
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
    <div className="mechanic-services">
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
              <label>PRICE (INR)</label>
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
                  <div className="service-meta">{service.category} {service.duration ? `• ${service.duration}` : ''}</div>
                  <div style={{marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className="service-price">INR {service.price || 0}</div>
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
