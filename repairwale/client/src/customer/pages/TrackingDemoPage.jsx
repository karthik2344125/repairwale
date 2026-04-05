import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LiveGPSTracker from '../components/LiveGPSTracker'
import TrackingSimulator from '../../shared/components/TrackingSimulator'

/**
 * TrackingDemoPage - Full showcase of real-time tracking feature
 * Demonstrates how the service tracking works with fake data and simulator
 */
export default function TrackingDemoPage() {
  const navigate = useNavigate()
  const [simulatedOrder, setSimulatedOrder] = useState(null)
  const [demoStarted, setDemoStarted] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('Ready to start demo')

  // Create a fake order when component mounts
  useEffect(() => {
    const fakeOrder = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerId: 'demo-customer',
      mechanicId: 'demo-mechanic-001',
      mechanicName: 'Raj Kumar',
      status: 'in_progress',
      totalAmount: 2500,
      date: new Date().toISOString(),
      location: 'Delhi, India',
      customerLocation: { lat: 28.6139, lng: 77.2090 },
      services: [
        { id: 1, name: 'Engine Oil Change', qty: 1, price: 500 },
        { id: 2, name: 'Air Filter Replacement', qty: 1, price: 800 },
        { id: 3, name: 'Battery Check', qty: 1, price: 1200 }
      ]
    }
    setSimulatedOrder(fakeOrder)
  }, [])

  const handleStartDemo = () => {
    setDemoStarted(true)
    setCurrentMessage('Searching for mechanics in your area...')
  }

  const handleResetDemo = () => {
    setDemoStarted(false)
    setCurrentMessage('Demo reset. Click Start to begin.')
  }

  if (!simulatedOrder) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>⏳</div>
        <p>Loading demo...</p>
      </div>
    )
  }

  return (
    <div style={{
      background: 'var(--bg)',
      minHeight: '100vh',
      paddingBottom: 40
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
        color: '#ffffff',
        padding: '28px 20px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#ffffff',
            padding: '8px 16px',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 12,
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.15)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.1)'
          }}
        >
          ← Back
        </button>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, letterSpacing: '-0.8px' }}>
          🚗 Real-Time Service Tracking Demo
        </h1>
        <p style={{ margin: '8px 0 0 0', fontSize: 14, opacity: 0.85 }}>
          See how RepairWale tracks your mechanic in real-time
        </p>
      </div>

      {/* Content Container */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
        {/* Demo Info Section */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 24
        }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>
            📋 Demo Details
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order ID</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>{simulatedOrder.id}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mechanic</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>{simulatedOrder.mechanicName}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>Delhi, India</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#10b981' }}>₹{simulatedOrder.totalAmount}</div>
            </div>
          </div>
        </div>

        {/* Tracking Simulator Section */}
        <div style={{ marginBottom: 24 }}>
          <TrackingSimulator 
            onStatusChange={(message, state, data) => {
              setCurrentMessage(message)
            }}
            onLocationUpdate={() => {}}
          />
        </div>

        {/* Live Tracker Section - for demo purposes */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 24
        }}>
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 100%)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{ fontSize: 20 }}>📍</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Live Map Preview</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>When you run the demo, this would show the live map with real-time tracking</div>
            </div>
          </div>
          <LiveGPSTracker
            orderId={simulatedOrder.id}
            mechanicId={simulatedOrder.mechanicId}
            customerId={simulatedOrder.customerId}
            initialCustomerLocation={simulatedOrder.customerLocation}
          />
        </div>

        {/* Services Section */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 24,
          marginBottom: 24
        }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>
            🔧 Services
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            {simulatedOrder.services.map((service, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 14px',
                  background: 'var(--bg)',
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  fontSize: 13
                }}
              >
                <div>
                  <span style={{ fontWeight: 700, color: 'var(--text)' }}>{service.name}</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>×{service.qty}</span>
                </div>
                <div style={{ fontWeight: 800, color: '#10b981' }}>₹{(service.price * service.qty).toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 24
        }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>
            ✨ Features Demonstrated
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16
          }}>
            {[
              { icon: '🗺️', title: 'Live GPS Map', desc: 'Real-time mechanic location on interactive map' },
              { icon: '⏱️', title: 'ETA Tracking', desc: 'Accurate arrival time estimates' },
              { icon: '📊', title: 'Distance Metric', desc: 'Live distance calculation between mechanic and you' },
              { icon: '🔄', title: 'Real-time Updates', desc: 'Socket.io powered live status updates' },
              { icon: '📍', title: 'Geolocation', desc: 'Accurate customer and mechanic positioning' },
              { icon: '💬', title: 'Real-time Chat', desc: 'Communicate with mechanic while tracking' }
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: 16,
                  background: 'var(--bg)',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{feature.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{feature.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{feature.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        :root {
          --bg: #f5f7fa;
          --surface: #ffffff;
          --border: #e5e7eb;
          --text: #0f172a;
          --text-muted: #6b7280;
          --text-secondary: #9ca3af;
          --accent-light: #60a5fa;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #0f172a;
            --surface: #1e293b;
            --border: #334155;
            --text: #ffffff;
            --text-muted: #94a3b8;
            --text-secondary: #64748b;
            --accent-light: #60a5fa;
          }
        }
      `}</style>
    </div>
  )
}
