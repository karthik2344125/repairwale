import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * TrackingFeatureShowcase - Interactive showcase of real-time tracking capabilities
 * Displays all features and allows quick access to demo
 */
export default function TrackingFeatureShowcase() {
  const navigate = useNavigate()
  const [expandedFeature, setExpandedFeature] = useState(null)

  const features = [
    {
      id: 'gps',
      icon: '🗺️',
      title: 'Live GPS Tracking',
      description: 'Track your mechanic\'s real-time location on an interactive map',
      details: [
        '✓ Real-time mechanic position updates',
        '✓ Interactive OpenStreetMap integration',
        '✓ Visual markers for mechanic and customer',
        '✓ Route visualization between points',
        '✓ Smooth marker animations'
      ]
    },
    {
      id: 'eta',
      icon: '⏱️',
      title: 'ETA Calculation',
      description: 'Get accurate estimated time of arrival based on distance and speed',
      details: [
        '✓ Haversine formula for accurate distance',
        '✓ Dynamic ETA based on real metrics',
        '✓ Live update as mechanic moves',
        '✓ Speed-aware calculations',
        '✓ Minute-level precision'
      ]
    },
    {
      id: 'realtimeChat',
      icon: '💬',
      title: 'Real-Time Chat',
      description: 'Communicate with your mechanic instantly while tracking',
      details: [
        '✓ Socket.IO powered messaging',
        '✓ Instant message delivery',
        '✓ Typing indicators',
        '✓ Read status tracking',
        '✓ Integrated with tracking view'
      ]
    },
    {
      id: 'updates',
      icon: '🔔',
      title: 'Live Status Updates',
      description: 'Receive real-time notifications as service progresses',
      details: [
        '✓ Searching for mechanics',
        '✓ Mechanic accepted notification',
        '✓ En route status updates',
        '✓ Arrival notification',
        '✓ Service completion alert'
      ]
    },
    {
      id: 'distance',
      icon: '📏',
      title: 'Distance Tracking',
      description: 'Monitor the distance between you and your mechanic',
      details: [
        '✓ Real-time distance calculation',
        '✓ Kilometer precision',
        '✓ Distance graph (planned)',
        '✓ Speed calculation',
        '✓ Historical distance tracking'
      ]
    },
    {
      id: 'geolocation',
      icon: '📍',
      title: 'Geolocation Services',
      description: 'Accurate location services for both customers and mechanics',
      details: [
        '✓ High-accuracy GPS',
        '✓ Battery-aware optimization',
        '✓ Location caching',
        '✓ Fallback to default locations',
        '✓ Privacy-respecting design'
      ]
    }
  ]

  return (
    <div style={{
      background: 'var(--bg)',
      borderRadius: 16,
      border: '1px solid var(--border)',
      overflow: 'hidden',
      marginBottom: 24
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '24px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px' }}>
          🚀 Real-Time Tracking System
        </h2>
        <p style={{ margin: 0, fontSize: 13, opacity: 0.9 }}>
          Advanced features for live service tracking and communication
        </p>
      </div>

      {/* Features Grid */}
      <div style={{ padding: '24px 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16,
          marginBottom: 24
        }}>
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 20,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: expandedFeature === feature.id ? 'scale(1.02)' : 'scale(1)',
                boxShadow: expandedFeature === feature.id ? '0 8px 24px rgba(59,130,246,0.15)' : 'none'
              }}
              onMouseEnter={(e) => !expandedFeature && (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)')}
              onMouseLeave={(e) => !expandedFeature && (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{feature.icon}</div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>
                {feature.title}
              </h3>
              <p style={{ margin: '0 0 12px 0', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {feature.description}
              </p>

              {/* Expanded details */}
              {expandedFeature === feature.id && (
                <div style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTop: '1px solid var(--border)',
                  animation: 'slideDown 0.3s ease-out'
                }}>
                  {feature.details.map((detail, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        marginBottom: idx < feature.details.length - 1 ? 8 : 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      <span style={{ color: '#10b981', fontWeight: 600 }}>•</span>
                      {detail.replace('✓ ', '')}
                    </div>
                  ))}
                </div>
              )}

              <div style={{ fontSize: 11, marginTop: 12, color: 'var(--text-muted)' }}>
                Click to {expandedFeature === feature.id ? 'collapse' : 'expand'}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 100%)',
          border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: 12,
          padding: 24,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>
            Ready to See It in Action?
          </h3>
          <p style={{ margin: '0 0 20px 0', fontSize: 13, color: 'var(--text-muted)' }}>
            Start a demo to experience how real-time tracking works when you book a service
          </p>
          <button
            onClick={() => navigate('/tracking-demo')}
            style={{
              padding: '12px 28px',
              borderRadius: 10,
              border: 'none',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 16px rgba(59,130,246,0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(59,130,246,0.4)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 16px rgba(59,130,246,0.3)'
            }}
          >
            Start Live Tracking Demo 🚀
          </button>
        </div>

        {/* Tech Stack */}
        <div style={{
          marginTop: 24,
          padding: 16,
          background: 'var(--bg)',
          borderRadius: 10,
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Technology Stack
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8
          }}>
            {[
              { icon: '📡', label: 'Socket.IO' },
              { icon: '🗺️', label: 'Leaflet.js' },
              { icon: '📍', label: 'Geolocation API' },
              { icon: '⚛️', label: 'React Hooks' },
              { icon: '🔄', label: 'Real-time Sync' },
              { icon: '🎯', label: 'Haversine Formula' }
            ].map((tech, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 12px',
                  background: 'var(--surface)',
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <span>{tech.icon}</span>
                {tech.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
