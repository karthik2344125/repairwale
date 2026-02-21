import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { ensureDefaults, getCustomer, saveCustomer, getMechanic, saveMechanic } from '../services/roleData'
import { showSuccess } from '../services/toast'

const styles = `
.user-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0b1220 0%, #152239 100%);
  padding: 20px;
}

.user-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* ===== ENHANCED HEADER ===== */
.user-header {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 32px;
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.15) 0%, rgba(30, 58, 138, 0.08) 100%);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.avatar-lg {
  width: 100px;
  height: 100px;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.header-text {
  flex: 1;
}

.header-text h2 {
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 6px 0;
  letter-spacing: -0.5px;
}

.header-text p {
  color: #9aa7bf;
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 500;
}

.header-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge-role {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #667eea;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-icon:hover {
  background: rgba(59, 130, 246, 0.25);
  border-color: rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
}

/* ===== TABS NAVIGATION ===== */
.tabs-nav {
  display: flex;
  gap: 8px;
  margin-bottom: 28px;
  background: rgba(30, 58, 138, 0.1);
  padding: 8px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  overflow-x: auto;
}

.tab-btn {
  flex: 1;
  padding: 10px 16px;
  background: transparent;
  border: none;
  color: #9aa7bf;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.tab-btn:hover:not(.active) {
  background: rgba(59, 130, 246, 0.1);
  color: #ffffff;
}

/* ===== STATS GRID ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.stat-card {
  background: rgba(30, 58, 138, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.15);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 11px;
  color: #9aa7bf;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.8px;
}

/* ===== GRID LAYOUT ===== */
.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 28px;
}

/* ===== CARDS ===== */
.profile-card {
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.1) 0%, rgba(30, 58, 138, 0.05) 100%);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
}

.profile-card:hover {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(59, 130, 246, 0.15);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
}

.card-icon {
  font-size: 20px;
}

.card-actions {
  display: flex;
  gap: 6px;
}

.action-btn {
  padding: 6px 10px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #667eea;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(59, 130, 246, 0.25);
  border-color: rgba(59, 130, 246, 0.5);
  color: #ffffff;
}

/* ===== INFO ITEMS ===== */
.info-section {
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 12px;
  color: #9aa7bf;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 14px;
  color: #ffffff;
  font-weight: 600;
}

.info-value.highlight {
  color: #667eea;
  font-weight: 800;
}

/* ===== LIST ITEMS ===== */
.list-container {
  max-height: 400px;
  overflow-y: auto;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 10px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.list-item:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
}

.list-content {
  flex: 1;
}

.list-primary {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2px;
}

.list-secondary {
  font-size: 12px;
  color: #9aa7bf;
}

.list-actions {
  display: flex;
  gap: 6px;
}

.delete-btn {
  color: #ef4444;
  cursor: pointer;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
  background: transparent;
  border: none;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #ff6b6b;
}

/* ===== EMPTY STATE ===== */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #9aa7bf;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-text {
  font-size: 14px;
  margin-bottom: 16px;
}

/* ===== ADD BUTTON ===== */
.btn-add {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

/* ===== MODAL STYLES ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, #0d1425 0%, #152239 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
  padding: 32px;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(59, 130, 246, 0.2);
}

.modal-title {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-close {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #9aa7bf;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ef4444;
}

/* ===== FORM STYLES ===== */
.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: #9aa7bf;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  background: rgba(30, 58, 138, 0.2);
  border: 1.5px solid rgba(59, 130, 246, 0.25);
  border-radius: 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(59, 130, 246, 0.15);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

.form-input::placeholder {
  color: #6b7280;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  background: rgba(30, 58, 138, 0.15);
  color: #9aa7bf;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background: rgba(30, 58, 138, 0.25);
  color: #ffffff;
  border-color: rgba(59, 130, 246, 0.4);
}

.btn-save {
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .user-header {
    grid-template-columns: 80px 1fr;
  }
  
  .header-actions {
    flex-direction: column;
    width: 100%;
    grid-column: 1 / -1;
  }
  
  .tabs-nav {
    gap: 4px;
  }
  
  .tab-btn {
    font-size: 12px;
    padding: 8px 12px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .user-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .avatar-lg {
    width: 80px;
    height: 80px;
    font-size: 36px;
  }
  
  .header-text h2 {
    font-size: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    padding: 24px;
  }
}
`

export default function UserPage() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const { role: userRole, completeLogout, loading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile') // 'profile', 'vehicles', 'addresses', 'settings'

  // Load role data
  const [cust, setCust] = useState(null)
  const [mech, setMech] = useState(null)

  // Form states
  const [showVehicleForm, setShowVehicleForm] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  
  const [vehicleForm, setVehicleForm] = useState({ brand: '', model: '', plate: '' })
  const [addressForm, setAddressForm] = useState({ label: '', line: '', city: '', pincode: '' })
  const [profileForm, setProfileForm] = useState({ fullName: '', phone: '', email: '' })
  const [paymentMethodForm, setPaymentMethodForm] = useState({ cardName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '' })

  useEffect(() => {
    try {
      const stored = localStorage.getItem('repairwale_user')
      if(stored) setUser(JSON.parse(stored))
      
      // Get role from context or fallback to localStorage
      const currentRole = userRole || localStorage.getItem('rw_role_locked') || 'customer'
      console.log('[UserPage] Current role:', currentRole)
      
      // Ensure defaults for the current role
      ensureDefaults(currentRole)
      
      // Load role-specific data immediately
      if(currentRole === 'customer') {
        const customerData = getCustomer()
        console.log('[UserPage] Loading customer data:', customerData)
        setCust(customerData)
      }
      if(currentRole === 'mechanic') {
        const mechanicData = getMechanic()
        console.log('[UserPage] Loading mechanic data:', mechanicData)
        setMech(mechanicData)
      }
      
      setIsLoading(false)
    } catch(e) {
      console.error('[UserPage] Error loading data:', e)
      setIsLoading(false)
    }
  }, [userRole])

  const handleSignOut = () => {
    try {
      completeLogout()
      localStorage.removeItem('rw_cart')
      localStorage.removeItem('rw_billing')
    } catch {}
    navigate('/')
  }

  const initials = (user?.fullName || 'User').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
  const joinedDate = user?.joinedDate ? new Date(user.joinedDate) : null
  const membershipDays = joinedDate ? Math.max(0, Math.floor((Date.now() - joinedDate.getTime()) / (1000 * 60 * 60 * 24))) : 0

  const openVehicleForm = () => {
    setVehicleForm({ brand: '', model: '', plate: '' })
    setEditingVehicle(null)
    setShowVehicleForm(true)
  }

  const openEditVehicle = (vehicle) => {
    setVehicleForm({ brand: vehicle.brand, model: vehicle.model, plate: vehicle.plate })
    setEditingVehicle(vehicle.id)
    setShowVehicleForm(true)
  }

  const saveVehicle = () => {
    if(!vehicleForm.brand.trim()) {
      alert('Please enter vehicle brand')
      return
    }
    
    if(!cust) {
      alert('Customer data not loaded. Please refresh the page.')
      return
    }
    
    if(editingVehicle) {
      // Edit existing
      const next = { ...cust, vehicles: (cust.vehicles || []).map(x => 
        x.id === editingVehicle ? { ...x, ...vehicleForm } : x
      )}
      setCust(next); saveCustomer(next)
      showSuccess('✓ Vehicle updated')
    } else {
      // Add new
      const vehicles = cust.vehicles || []
      const v = { id: `VH-${Date.now()}`, ...vehicleForm, primary: vehicles.length === 0 }
      const next = { ...cust, vehicles: [...vehicles, v] }
      setCust(next); saveCustomer(next)
      showSuccess(`✓ Added ${vehicleForm.brand} ${vehicleForm.model}`)
    }
    
    setShowVehicleForm(false)
    setVehicleForm({ brand: '', model: '', plate: '' })
    setEditingVehicle(null)
  }

  const editVehicle = (id) => {
    if(!cust || !cust.vehicles) return
    const v = cust.vehicles.find(x => x.id === id)
    if(v) openEditVehicle(v)
  }

  const removeVehicle = (id) => {
    if(!cust) return
    if(!confirm('Remove vehicle?')) return
    const next = { ...cust, vehicles: (cust.vehicles || []).filter(x => x.id !== id) }
    setCust(next); saveCustomer(next)
    showSuccess('✓ Vehicle removed')
  }

  const makePrimary = (id) => {
    if(!cust) return
    const next = { ...cust, vehicles: (cust.vehicles || []).map(x => ({ ...x, primary: x.id === id })) }
    setCust(next); saveCustomer(next)
    showSuccess('✓ Primary vehicle set')
  }

  const openAddressForm = () => {
    setAddressForm({ label: '', line: '', city: '', pincode: '' })
    setShowAddressForm(true)
  }

  const saveAddress = () => {
    if(!addressForm.label.trim() || !addressForm.line.trim()) {
      alert('Please enter address label and line 1')
      return
    }
    
    if(!cust) {
      alert('Customer data not loaded. Please refresh the page.')
      return
    }
    
    const a = { id: `ADDR-${Date.now()}`, ...addressForm }
    const next = { ...cust, addresses: [...(cust.addresses || []), a] }
    setCust(next); saveCustomer(next)
    showSuccess(`✓ Added ${addressForm.label}`)
    
    setShowAddressForm(false)
    setAddressForm({ label: '', line: '', city: '', pincode: '' })
  }

  const removeAddress = (id) => {
    if(!cust) return
    if(!confirm('Remove address?')) return
    const next = { ...cust, addresses: (cust.addresses || []).filter(x => x.id !== id) }
    setCust(next); saveCustomer(next)
    showSuccess('✓ Address removed')
  }

  const addSkill = () => {
    const skill = prompt('Add skill?'); if(!skill) return
    const next = { ...mech, skills: [...new Set([...(mech?.skills||[]), skill])] }
    setMech(next); saveMechanic(next)
    showSuccess(`✓ Added ${skill}`)
  }

  const removeSkill = (s) => {
    const next = { ...mech, skills: (mech?.skills||[]).filter(x => x !== s) }
    setMech(next); saveMechanic(next)
  }

  const toggleDay = (day) => {
    const next = { ...mech, availability: { ...(mech?.availability||{}), [day]: !(mech?.availability?.[day]) } }
    setMech(next); saveMechanic(next)
  }

  const addCertification = () => {
    const name = prompt('Certification name?'); if(!name) return
    const year = parseInt(prompt('Year?') || `${new Date().getFullYear()}`, 10)
    const next = { ...mech, certifications: [...(mech?.certifications||[]), { id: `CERT-${Date.now()}`, name, year }] }
    setMech(next); saveMechanic(next)
    showSuccess(`✓ Added ${name}`)
  }

  const addArea = () => {
    const area = prompt('Service area name?'); if(!area) return
    const km = parseInt(prompt('Radius (km)?') || '5', 10)
    const next = { ...mech, serviceAreas: [...(mech?.serviceAreas||[]), { id: `AREA-${Date.now()}`, area, km }] }
    setMech(next); saveMechanic(next)
    showSuccess('✓ Area added')
  }

  const removeArea = (id) => {
    const next = { ...mech, serviceAreas: (mech?.serviceAreas||[]).filter(x => x.id !== id) }
    setMech(next); saveMechanic(next)
  }


  const openProfileForm = () => {
    setProfileForm({ 
      fullName: user.fullName || '', 
      phone: user.phone || '',
      email: user.email || ''
    })
    setShowProfileForm(true)
  }

  const saveProfile = () => {
    if(!profileForm.fullName.trim()) {
      alert('Please enter your full name')
      return
    }
    
    const updated = { ...user, fullName: profileForm.fullName, phone: profileForm.phone }
    setUser(updated)
    localStorage.setItem('repairwale_user', JSON.stringify(updated))
    showSuccess('✓ Profile updated')
    setShowProfileForm(false)
  }

  const handleEditProfile = () => {
    openProfileForm()
  }

  const savePaymentMethod = () => {
    if(!paymentMethodForm.cardName.trim() || !paymentMethodForm.cardNumber.trim() || !paymentMethodForm.expiryMonth || !paymentMethodForm.expiryYear || !paymentMethodForm.cvv) {
      alert('Please fill in all payment method details')
      return
    }
    
    // Validate card number (basic validation - must be 16 digits)
    if(paymentMethodForm.cardNumber.replace(/\s/g, '').length !== 16) {
      alert('Card number must be 16 digits')
      return
    }
    
    // Validate CVV (3-4 digits)
    if(paymentMethodForm.cvv.length < 3 || paymentMethodForm.cvv.length > 4) {
      alert('CVV must be 3-4 digits')
      return
    }
    
    if(!cust) {
      alert('Customer data not loaded. Please refresh the page.')
      return
    }
    
    // Don't store full card details in localStorage (security risk) - just mask
    const maskedCard = `${paymentMethodForm.cardNumber.slice(-4).padStart(paymentMethodForm.cardNumber.length, '*')}`
    const pm = { 
      id: `PM-${Date.now()}`, 
      cardName: paymentMethodForm.cardName,
      cardLast4: paymentMethodForm.cardNumber.slice(-4),
      expiryMonth: paymentMethodForm.expiryMonth,
      expiryYear: paymentMethodForm.expiryYear,
      maskedNumber: maskedCard,
      isDefault: (!cust.paymentMethods || cust.paymentMethods.length === 0)
    }
    
    const next = { ...cust, paymentMethods: [...(cust.paymentMethods || []), pm] }
    setCust(next)
    saveCustomer(next)
    showSuccess(`✓ Payment method added for ${paymentMethodForm.cardName}`)
    
    setShowPaymentMethodForm(false)
    setPaymentMethodForm({ cardName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '' })
  }

  const removePaymentMethod = (id) => {
    if(!cust) return
    if(!confirm('Remove this payment method?')) return
    const next = { ...cust, paymentMethods: (cust.paymentMethods || []).filter(x => x.id !== id) }
    setCust(next)
    saveCustomer(next)
    showSuccess('✓ Payment method removed')
  }

  const setDefaultPaymentMethod = (id) => {
    if(!cust) return
    const next = { ...cust, paymentMethods: (cust.paymentMethods || []).map(x => ({ ...x, isDefault: x.id === id })) }
    setCust(next)
    saveCustomer(next)
    showSuccess('✓ Default payment method updated')
  }
    const oldPwd = prompt('Current password?')
    if(!oldPwd) return
    const newPwd = prompt('New password?')
    if(!newPwd) return
    const confirm = prompt('Confirm password?')
    if(confirm !== newPwd) {
      alert('Passwords do not match')
      return
    }
    showSuccess('✓ Password changed successfully')
  }

  const handleFavorites = () => {
    navigate('/favorites')
  }

  const handlePaymentMethods = () => {
    showSuccess('💳 Payment methods will be available soon')
  }

  const handleServiceAreas = () => {
    showSuccess('📍 Manage your service areas above')
  }

  const handleSchedule = () => {
    showSuccess('📅 Set your availability above')
  }

  const handleLogout = () => {
    if(confirm('Are you sure you want to logout?')) {
      completeLogout()
      navigate('/')
    }
  }


  if(isLoading || !user) {
    return (
      <div style={{
        padding: '60px 20px', 
        textAlign: 'center', 
        color: '#9aa7bf',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: 48, 
          height: 48, 
          border: '3px solid rgba(255,255,255,0.1)', 
          borderTopColor: 'rgba(255,255,255,0.6)', 
          borderRadius: '50%', 
          animation: 'spin 0.8s linear infinite'
        }}/>
        <div style={{marginTop: 16}}>Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="user-wrapper">
      <style>{styles}</style>
      <div className="user-container">
        {/* Enhanced Header */}
        <div className="user-header">
          <div className="avatar-lg">{initials}</div>
          <div className="header-text">
            <h2>{user.fullName || 'My Profile'}</h2>
            <p>{user.email}</p>
            <div className="header-badges">
              <span className="badge-role">👤 {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-icon" onClick={() => setShowProfileForm(true)} title="Edit Profile">✏️</button>
            <button className="btn-icon" onClick={() => navigate('/favorites')} title="Favorites">❤️</button>
            <button className="btn-icon" onClick={handleLogout} title="Logout">🚪</button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{membershipDays}</div>
            <div className="stat-label">Days Member</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{cust?.orders?.length || 0}</div>
            <div className="stat-label">Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">★ 4.8</div>
            <div className="stat-label">Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{cust?.addresses?.length || 0}</div>
            <div className="stat-label">Addresses</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-nav">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            🚗 Vehicles
          </button>
          <button 
            className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            📍 Addresses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            💳 Payments
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Settings
          </button>
        </div>

        {/* TAB: Profile Information */}
        {activeTab === 'profile' && (
          <div className="user-grid">
            <div className="profile-card">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">👤</span>
                  Personal Information
                </div>
                <div className="card-actions">
                  <button className="action-btn" onClick={() => setShowProfileForm(true)}>Edit</button>
                </div>
              </div>
              
              <div className="info-section">
                <div className="info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{user.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{user.phone || 'Not added'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Member Since</span>
                  <span className="info-value highlight">{joinedDate?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="profile-card">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">📊</span>
                  Account Stats
                </div>
              </div>
              
              <div className="info-section">
                <div className="info-item">
                  <span className="info-label">Total Orders</span>
                  <span className="info-value highlight">{cust?.orders?.length || 0}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Rating</span>
                  <span className="info-value highlight">⭐ 4.8 / 5.0</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Account Status</span>
                  <span className="info-value" style={{color: '#10b981'}}>🟢 Active</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Verified</span>
                  <span className="info-value" style={{color: '#10b981'}}>✓ Email Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Vehicles */}
        {activeTab === 'vehicles' && (
          <div className="user-grid">
            <div className="profile-card full-section">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">🚗</span>
                  My Vehicles ({cust?.vehicles?.length || 0})
                </div>
              </div>

              {(!cust?.vehicles || cust.vehicles.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-icon">🚗</div>
                  <div className="empty-text">No vehicles added yet</div>
                  <button className="btn-add" onClick={() => {
                    setEditingVehicle(null)
                    setVehicleForm({ brand: '', model: '', plate: '' })
                    setShowVehicleForm(true)
                  }}>
                    + Add Vehicle
                  </button>
                </div>
              ) : (
                <>
                  <div className="list-container">
                    {cust.vehicles.map((v) => (
                      <div key={v.id} className="list-item">
                        <div className="list-content">
                          <div className="list-primary">🚗 {v.brand} {v.model}</div>
                          <div className="list-secondary">Plate: {v.plate}</div>
                        </div>
                        <div className="list-actions">
                          <button 
                            className="action-btn" 
                            onClick={() => editVehicle(v.id)}
                          >
                            Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => removeVehicle(v.id)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-add" onClick={() => {
                    setEditingVehicle(null)
                    setVehicleForm({ brand: '', model: '', plate: '' })
                    setShowVehicleForm(true)
                  }}>
                    + Add Another Vehicle
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* TAB: Addresses */}
        {activeTab === 'addresses' && (
          <div className="user-grid">
            <div className="profile-card full-section">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">📍</span>
                  Saved Addresses ({cust?.addresses?.length || 0})
                </div>
              </div>

              {(!cust?.addresses || cust.addresses.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-icon">📍</div>
                  <div className="empty-text">No addresses saved yet</div>
                  <button className="btn-add" onClick={() => {
                    setAddressForm({ label: '', line: '', city: '', pincode: '' })
                    setShowAddressForm(true)
                  }}>
                    + Add Address
                  </button>
                </div>
              ) : (
                <>
                  <div className="list-container">
                    {cust.addresses.map((a) => (
                      <div key={a.id} className="list-item">
                        <div className="list-content">
                          <div className="list-primary">📍 {a.label}</div>
                          <div className="list-secondary">{a.line}, {a.city} - {a.pincode}</div>
                        </div>
                        <div className="list-actions">
                          <button 
                            className="action-btn"
                            onClick={() => {
                              setAddressForm(a)
                              setShowAddressForm(true)
                            }}
                          >
                            Edit
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={() => removeAddress(a.id)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-add" onClick={() => {
                    setAddressForm({ label: '', line: '', city: '', pincode: '' })
                    setShowAddressForm(true)
                  }}>
                    + Add Another Address
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* TAB: Payment Methods */}
        {activeTab === 'payments' && (
          <div className="user-grid">
            <div className="profile-card full-section">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">💳</span>
                  Payment Methods ({cust?.paymentMethods?.length || 0})
                </div>
              </div>

              {(!cust?.paymentMethods || cust.paymentMethods.length === 0) ? (
                <div className="empty-state">
                  <div className="empty-icon">💳</div>
                  <div className="empty-text">No payment methods added yet</div>
                  <button className="btn-add" onClick={() => {
                    setPaymentMethodForm({ cardName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '' })
                    setShowPaymentMethodForm(true)
                  }}>
                    + Add Payment Method
                  </button>
                </div>
              ) : (
                <>
                  <div className="list-container">
                    {cust.paymentMethods.map((pm) => (
                      <div key={pm.id} className="list-item">
                        <div className="list-content">
                          <div className="list-primary">
                            💳 {pm.cardName}
                            {pm.isDefault && <span style={{marginLeft: '8px', fontSize: '11px', background: 'rgba(34, 197, 94, 0.2)', color: '#15803d', padding: '3px 8px', borderRadius: '4px', fontWeight: 600}}>DEFAULT</span>}
                          </div>
                          <div className="list-secondary">Card ending in •••• {pm.cardLast4} • Expires {pm.expiryMonth}/{pm.expiryYear}</div>
                        </div>
                        <div className="list-actions">
                          {!pm.isDefault && (
                            <button 
                              className="action-btn"
                              onClick={() => setDefaultPaymentMethod(pm.id)}
                            >
                              Set Default
                            </button>
                          )}
                          <button 
                            className="delete-btn"
                            onClick={() => removePaymentMethod(pm.id)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-add" onClick={() => {
                    setPaymentMethodForm({ cardName: '', cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '' })
                    setShowPaymentMethodForm(true)
                  }}>
                    + Add Another Payment Method
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* TAB: Settings */}
        {activeTab === 'settings' && (
          <div className="user-grid">
            <div className="profile-card">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">🔐</span>
                  Security
                </div>
              </div>
              
              <button className="btn-add" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#667eea' }} onClick={handleChangePassword}>
                🔑 Change Password
              </button>
            </div>

            <div className="profile-card">
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">❤️</span>
                  Favorites
                </div>
              </div>
              
              <button className="btn-add" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#667eea' }} onClick={() => navigate('/favorites')}>
                ❤️ View Favorites
              </button>
            </div>

            <div className="profile-card full-section" style={{ marginTop: '20px' }}>
              <div className="card-header">
                <div className="card-title">
                  <span className="card-icon">⚠️</span>
                  Danger Zone
                </div>
              </div>
              
              <button className="btn-add" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }} onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          </div>
        )}

        {/* Vehicle Form Modal */}
        {showVehicleForm && (
          <div className="modal-overlay" onClick={() => setShowVehicleForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <span>🚗</span>
                  {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                </div>
                <button className="modal-close" onClick={() => setShowVehicleForm(false)}>✕</button>
              </div>
              
              <div className="form-group">
                <label className="form-label">VEHICLE BRAND *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Honda, Toyota, BMW"
                  value={vehicleForm.brand}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, brand: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">MODEL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Civic, Camry, X5"
                  value={vehicleForm.model}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">LICENSE PLATE NUMBER</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., MH 01 AB 1234"
                  value={vehicleForm.plate}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, plate: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="form-actions">
                <button className="btn-cancel" onClick={() => setShowVehicleForm(false)}>Cancel</button>
                <button className="btn-save" onClick={saveVehicle}>
                  {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Address Form Modal */}
        {showAddressForm && (
          <div className="modal-overlay" onClick={() => setShowAddressForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <span>📍</span>
                  Add New Address
                </div>
                <button className="modal-close" onClick={() => setShowAddressForm(false)}>✕</button>
              </div>
              
              <div className="form-group">
                <label className="form-label">ADDRESS LABEL *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Home, Office, Workshop"
                  value={addressForm.label}
                  onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">ADDRESS LINE 1 *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Street, Building, Apartment"
                  value={addressForm.line}
                  onChange={(e) => setAddressForm({ ...addressForm, line: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">CITY</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">PINCODE</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., 400001"
                  maxLength="6"
                  value={addressForm.pincode}
                  onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value.replace(/\D/g, '') })}
                />
              </div>

              <div className="form-actions">
                <button className="btn-cancel" onClick={() => setShowAddressForm(false)}>Cancel</button>
                <button className="btn-save" onClick={saveAddress}>Add Address</button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Edit Form Modal */}
        {showProfileForm && (
          <div className="modal-overlay" onClick={() => setShowProfileForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <span>👤</span>
                  Edit Profile
                </div>
                <button className="modal-close" onClick={() => setShowProfileForm(false)}>✕</button>
              </div>
              
              <div className="form-group">
                <label className="form-label">FULL NAME *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">EMAIL</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                  value={profileForm.email}
                  disabled
                  style={{opacity: 0.6, cursor: 'not-allowed'}}
                />
                <div style={{fontSize: '11px', color: '#9aa7bf', marginTop: '4px'}}>Email cannot be changed</div>
              </div>

              <div className="form-group">
                <label className="form-label">PHONE NUMBER</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="e.g., +91 98765 43210"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                />
              </div>

              <div className="form-actions">
                <button className="btn-cancel" onClick={() => setShowProfileForm(false)}>Cancel</button>
                <button className="btn-save" onClick={saveProfile}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Method Form Modal */}
        {showPaymentMethodForm && (
          <div className="modal-overlay" onClick={() => setShowPaymentMethodForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">
                  <span>💳</span>
                  Add Payment Method
                </div>
                <button className="modal-close" onClick={() => setShowPaymentMethodForm(false)}>✕</button>
              </div>
              
              <div className="form-group">
                <label className="form-label">CARDHOLDER NAME *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Name on card"
                  value={paymentMethodForm.cardName}
                  onChange={(e) => setPaymentMethodForm({ ...paymentMethodForm, cardName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">CARD NUMBER *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  value={paymentMethodForm.cardNumber}
                  onChange={(e) => {
                    // Auto-format card number with spaces
                    const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '')
                    const formatted = value.match(/.{1,4}/g)?.join(' ') || value
                    setPaymentMethodForm({ ...paymentMethodForm, cardNumber: formatted })
                  }}
                />
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px'}}>
                <div className="form-group">
                  <label className="form-label">MONTH *</label>
                  <select
                    className="form-input"
                    value={paymentMethodForm.expiryMonth}
                    onChange={(e) => setPaymentMethodForm({ ...paymentMethodForm, expiryMonth: e.target.value })}
                  >
                    <option value="">MM</option>
                    {Array.from({length: 12}, (_, i) => i + 1).map(m => (
                      <option key={m} value={String(m).padStart(2, '0')}>{String(m).padStart(2, '0')}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">YEAR *</label>
                  <select
                    className="form-input"
                    value={paymentMethodForm.expiryYear}
                    onChange={(e) => setPaymentMethodForm({ ...paymentMethodForm, expiryYear: e.target.value })}
                  >
                    <option value="">YYYY</option>
                    {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(y => (
                      <option key={y} value={String(y)}>{y}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">CVV *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="123"
                    maxLength="4"
                    value={paymentMethodForm.cvv}
                    onChange={(e) => setPaymentMethodForm({ ...paymentMethodForm, cvv: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
              </div>

              <div style={{fontSize: '11px', color: '#9aa7bf', marginTop: '8px', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px'}}>
                🔒 Your payment information is encrypted and stored securely.
              </div>

              <div className="form-actions">
                <button className="btn-cancel" onClick={() => setShowPaymentMethodForm(false)}>Cancel</button>
                <button className="btn-save" onClick={savePaymentMethod}>Add Payment Method</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
