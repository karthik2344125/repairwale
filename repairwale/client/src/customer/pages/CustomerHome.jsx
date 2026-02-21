import React, { useState, useEffect } from 'react'
import { useAuth } from '../../shared/context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CustomerHome() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const heroOffset = Math.min(scrollPosition * 0.5, 100)

  const serviceCategories = [
    {
      id: 'emergency',
      icon: '🚨',
      title: 'Emergency Roadside',
      description: 'Quick fixes for breakdowns',
      color: '#ef4444',
      lightColor: 'rgba(239, 68, 68, 0.1)',
      services: [
        { name: 'Breakdown Quick Fix', price: '₹549', time: '30-60 mins' },
        { name: 'Flat Tyre Assist', price: '₹399', time: '30 mins' },
        { name: 'Battery Jump-Start', price: '₹299', time: '20-30 mins' },
        { name: 'Emergency Fuel Delivery', price: '₹249', time: '40 mins' },
        { name: 'Locked Keys Support', price: '₹749', time: '45-60 mins' },
        { name: 'Winch & Pull-out', price: '₹1,299', time: '60-90 mins' }
      ]
    },
    {
      id: 'maintenance',
      icon: '🔧',
      title: 'Scheduled Maintenance',
      description: 'Keep your vehicle in shape',
      color: '#3b82f6',
      lightColor: 'rgba(59, 130, 246, 0.1)',
      services: [
        { name: 'Basic Service', price: '₹1,299', time: 'Same-day' },
        { name: 'Comprehensive Service', price: '₹2,299', time: 'Same-day' },
        { name: 'Pickup & Drop', price: '₹399', time: 'Next-day' },
        { name: 'Detailing & Wash', price: '₹899', time: 'Same-day' },
        { name: 'AC Service', price: '₹1,499', time: 'Same-day' },
        { name: 'Interior Deep Clean', price: '₹1,699', time: 'Same-day' }
      ]
    },
    {
      id: 'repairs',
      icon: '🛠️',
      title: 'Mechanical & Electrical',
      description: 'Expert diagnostics and repairs',
      color: '#8b5cf6',
      lightColor: 'rgba(139, 92, 246, 0.1)',
      services: [
        { name: 'Engine Tune-up', price: '₹1,799', time: 'Same-day' },
        { name: 'Brake Service', price: '₹999', time: 'Same-day' },
        { name: 'Battery Replacement', price: '₹499', time: '30-60 mins' },
        { name: 'Clutch & Gear Work', price: '₹2,499', time: '1-2 days' },
        { name: 'ECU Scan & Reset', price: '₹599', time: '60 mins' },
        { name: 'Suspension & Steering', price: '₹1,899', time: '1 day' }
      ]
    },
    {
      id: 'tyres',
      icon: '🛞',
      title: 'Tyres & Wheels',
      description: 'Grip, balance, and alignment',
      color: '#f59e0b',
      lightColor: 'rgba(245, 158, 11, 0.1)',
      services: [
        { name: 'Wheel Alignment', price: '₹699', time: '60 mins' },
        { name: 'Wheel Balancing', price: '₹599', time: '60 mins' },
        { name: 'Tyre Replacement', price: '₹1,299', time: '90 mins' },
        { name: 'Alloy Repair', price: '₹1,599', time: 'Same-day' },
        { name: 'Tyre Puncture Repair', price: '₹149', time: '30 mins' },
        { name: 'Wheel Cleaning', price: '₹299', time: '45 mins' }
      ]
    },
    {
      id: 'towing',
      icon: '🚚',
      title: 'Towing & Transport',
      description: 'Safe vehicle transport',
      color: '#06b6d4',
      lightColor: 'rgba(6, 182, 212, 0.1)',
      services: [
        { name: 'City Tow (≤10 km)', price: '₹1,199', time: '45-90 mins' },
        { name: 'Flatbed Tow', price: '₹1,899', time: '60-120 mins' },
        { name: 'Long-Distance (per km)', price: '₹45/km', time: 'Scheduled' },
        { name: 'Bike Towing', price: '₹899', time: '45 mins' },
        { name: 'Premium Car Transport', price: '₹2,299', time: '90 mins' },
        { name: 'Interstate Transport', price: 'Custom', time: 'Scheduled' }
      ]
    },
    {
      id: 'body',
      icon: '🎨',
      title: 'Body & Paint',
      description: 'Restore your car\'s appearance',
      color: '#ec4899',
      lightColor: 'rgba(236, 72, 153, 0.1)',
      services: [
        { name: 'Paint Touch-up', price: '₹1,299', time: '1 day' },
        { name: 'Dent Removal', price: '₹1,899', time: '1-2 days' },
        { name: 'Glass Repair', price: '₹999', time: 'Same-day' },
        { name: 'Scratch Removal', price: '₹599', time: 'Same-day' },
        { name: 'Full Body Polish', price: '₹2,499', time: '1 day' },
        { name: 'Ceramic Coating', price: '₹3,999', time: '1-2 days' }
      ]
    }
  ]

  const features = [
    {
      icon: '⚡',
      title: 'Fast Service',
      description: 'Mechanics arrive within 30-90 minutes'
    },
    {
      icon: '🔒',
      title: 'Verified Mechanics',
      description: 'All mechanics are certified and background checked'
    },
    {
      icon: '📍',
      title: 'Live Tracking',
      description: 'Track your mechanic in real-time on the map'
    },
    {
      icon: '💬',
      title: 'Live Chat Support',
      description: 'Chat directly with your mechanic anytime'
    },
    {
      icon: '💰',
      title: 'Transparent Pricing',
      description: 'No hidden charges, price upfront'
    },
    {
      icon: '🛡️',
      title: 'Quality Guarantee',
      description: '30-day service warranty on all repairs'
    }
  ]

  const testimonials = [
    {
      name: 'Rajesh K.',
      city: 'Delhi',
      text: 'Excellent service! Mechanic arrived on time and fixed my car quickly. Highly recommend!',
      rating: 5
    },
    {
      name: 'Priya S.',
      city: 'Mumbai',
      text: 'Very professional and courteous. The app made it so easy to book and track.',
      rating: 5
    },
    {
      name: 'Amit P.',
      city: 'Bangalore',
      text: 'Best roadside assistance app I\'ve used. The pricing is honest and service is reliable.',
      rating: 4
    }
  ]

  const stats = [
    { number: '50K+', label: 'Vehicles Served' },
    { number: '4.8★', label: 'Average Rating' },
    { number: '24/7', label: 'Emergency Support' },
    { number: '2000+', label: 'Verified Mechanics' }
  ]

  return (
    <div style={{ background: '#0a0e27', minHeight: '100vh', color: '#e5e7eb' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1a2847 0%, #0f1729 100%)',
        padding: '80px 24px 60px',
        borderBottom: '1px solid rgba(96, 165, 250, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: -150 + heroOffset,
          right: -100,
          animation: 'float 3s ease-in-out infinite'
        }}/>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '48px' }}>
            <p style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              fontWeight: '600', 
              color: 'rgba(129, 230, 217, 0.9)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              👋 Welcome back
            </p>
            <h1 style={{
              margin: '0 0 16px 0',
              fontSize: 'clamp(32px, 6vw, 52px)',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.2'
            }}>
              {user?.fullName || 'Customer'}!
            </h1>
            <p style={{ 
              margin: 0, 
              fontSize: '18px',
              color: 'rgba(229,231,235,0.65)', 
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Need a mechanic? Professional roadside assistance and vehicle repair services available 24/7
            </p>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/map')}
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.4)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              🗺️ Find Nearby Mechanics
            </button>
            <button
              onClick={() => navigate('/service')}
              style={{
                padding: '16px 32px',
                background: 'transparent',
                color: '#60a5fa',
                border: '2px solid #3b82f6',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(59, 130, 246, 0.1)'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent'
              }}
            >
              📋 Browse Services
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '32px'
      }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px'
            }}>
              {stat.number}
            </div>
            <div style={{ fontSize: '14px', color: '#9ca3af', fontWeight: '600' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 24px'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '800',
          marginBottom: '48px',
          textAlign: 'center',
          color: '#e5e7eb'
        }}>
          Why Choose RepairWale? ✨
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              border: '1px solid rgba(96, 165, 250, 0.15)',
              borderRadius: '16px',
              padding: '32px 24px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.4)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.15)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.15)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#e5e7eb'
              }}>
                {feature.title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#9ca3af',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Categories */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 24px'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '800',
          marginBottom: '48px',
          color: '#e5e7eb'
        }}>
          Our Services 🛠️
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {serviceCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                border: `2px solid ${selectedCategory === category.id ? category.color : 'rgba(96, 165, 250, 0.15)'}`,
                borderRadius: '16px',
                padding: '32px 24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedCategory === category.id ? `0 12px 40px ${category.color}20` : 'none'
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.15)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>
                {category.icon}
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                marginBottom: '8px',
                color: '#e5e7eb'
              }}>
                {category.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#9ca3af',
                marginBottom: '16px'
              }}>
                {category.description}
              </p>

              {selectedCategory === category.id && (
                <div style={{
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: `1px solid rgba(96, 165, 250, 0.15)`
                }}>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {category.services.map((service, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        background: category.lightColor,
                        borderRadius: '8px',
                        fontSize: '13px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#e5e7eb', fontWeight: '600', marginBottom: '4px' }}>
                            {service.name}
                          </div>
                          <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                            {service.time}
                          </div>
                        </div>
                        <div style={{ color: category.color, fontWeight: '700', marginLeft: '12px' }}>
                          {service.price}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate('/service')
                    }}
                    style={{
                      width: '100%',
                      marginTop: '16px',
                      padding: '12px',
                      background: category.color,
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.opacity = '0.9'
                      e.target.style.transform = 'scale(1.02)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = '1'
                      e.target.style.transform = 'scale(1)'
                    }}
                  >
                    Book Now →
                  </button>
                </div>
              )}

              <div style={{
                marginTop: '16px',
                fontSize: '12px',
                color: '#9ca3af'
              }}>
                {category.services.length} services available
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 24px',
        borderTop: '1px solid rgba(96, 165, 250, 0.15)'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '800',
          marginBottom: '48px',
          textAlign: 'center',
          color: '#e5e7eb'
        }}>
          How It Works 📱
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '32px'
        }}>
          {[
            { step: '1', icon: '📍', title: 'Share Location', desc: 'Tell us your location and problem' },
            { step: '2', icon: '⚡', title: 'Get Matched', desc: 'We find the best nearby mechanic' },
            { step: '3', icon: '💬', title: 'Communicate', desc: 'Chat with your mechanic in real-time' },
            { step: '4', icon: '✅', title: 'Service & Pay', desc: 'Get service and pay securely' }
          ].map((item, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '28px'
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '8px',
                color: '#e5e7eb'
              }}>
                {item.title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#9ca3af'
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 24px',
        borderTop: '1px solid rgba(96, 165, 250, 0.15)'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '800',
          marginBottom: '48px',
          textAlign: 'center',
          color: '#e5e7eb'
        }}>
          What Our Customers Say ⭐
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              border: '1px solid rgba(96, 165, 250, 0.15)',
              borderRadius: '16px',
              padding: '32px',
            }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={{ fontSize: '18px' }}>⭐</span>
                ))}
              </div>
              <p style={{
                fontSize: '15px',
                color: '#d1d5db',
                marginBottom: '16px',
                lineHeight: '1.6'
              }}>
                "{testimonial.text}"
              </p>
              <div style={{ borderTop: '1px solid rgba(96, 165, 250, 0.15)', paddingTop: '16px' }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: '#e5e7eb' }}>
                  {testimonial.name}
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af' }}>
                  {testimonial.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 242, 0.05) 100%)',
        padding: '60px 24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(96, 165, 250, 0.15)'
      }}>
        <h2 style={{
          fontSize: '32px',
          fontWeight: '800',
          marginBottom: '24px',
          color: '#e5e7eb'
        }}>
          Ready to Get Your Vehicle Fixed? 🚗
        </h2>
        <p style={{
          fontSize: '18px',
          color: 'rgba(229,231,235,0.7)',
          marginBottom: '32px',
          maxWidth: '600px',
          margin: '0 auto 32px'
        }}>
          Join thousands of happy customers who trust RepairWale for their vehicle needs
        </p>
        <button
          onClick={() => navigate('/map')}
          style={{
            padding: '16px 48px',
            background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.4)'
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = 'none'
          }}
        >
          Find a Mechanic Now
        </button>
      </div>
    </div>
  )
}
