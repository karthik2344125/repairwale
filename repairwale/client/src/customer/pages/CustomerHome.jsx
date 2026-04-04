import React, { useState, useEffect } from 'react'
import { useAuth } from '../../shared/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IconCard, IconChat, IconMapPin, IconMoney, IconShield, IconSpark, IconTruck, IconUser, IconWrench, IconStar } from '../../icons'

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

  const luxury = {
    pageBg: 'linear-gradient(180deg, #050a14 0%, #0a1628 50%, #0d1f38 100%)',
    sectionBg: 'linear-gradient(145deg, rgba(10,23,43,0.8) 0%, rgba(7,16,31,0.85) 100%)',
    cardBg: 'linear-gradient(145deg, rgba(13,28,50,0.92) 0%, rgba(8,18,35,0.94) 100%)',
    border: '1px solid rgba(143,181,232,0.2)',
    softShadow: '0 10px 30px rgba(0,0,0,0.4)',
    mediumShadow: '0 15px 40px rgba(0,0,0,0.45)',
    deepShadow: '0 20px 50px rgba(0,0,0,0.5)',
    gold: '#8FB5E8',
    textPrimary: '#F5F1E8',
    textSecondary: 'rgba(245,241,232,0.75)',
    textMuted: 'rgba(205,221,244,0.7)'
  }

  const sectionShell = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '56px 24px',
    background: luxury.sectionBg,
    border: luxury.border,
    borderRadius: '24px',
    boxShadow: luxury.mediumShadow
  }

  const quickActions = [
    { id: 'map', label: 'Nearby Mechanics', sub: 'Find help now', icon: IconMapPin, route: '/map' },
    { id: 'service', label: 'Book Service', sub: 'Schedule instantly', icon: IconWrench, route: '/service' },
    { id: 'history', label: 'Order History', sub: 'Track previous jobs', icon: IconCard, route: '/orders' },
    { id: 'profile', label: 'Profile', sub: 'Manage account', icon: IconUser, route: '/customer/profile' }
  ]

  const serviceCategories = [
    {
      id: 'emergency',
      icon: IconTruck,
      title: 'Emergency Roadside',
      description: 'Quick fixes for breakdowns',
      color: '#FFFFFF',
      lightColor: 'rgba(96,165,250,0.1)',
      services: [
        { name: 'Breakdown Quick Fix', price: '549', time: '30-60 mins' },
        { name: 'Flat Tyre Assist', price: '399', time: '30 mins' },
        { name: 'Battery Jump-Start', price: '299', time: '20-30 mins' },
        { name: 'Emergency Fuel Delivery', price: '249', time: '40 mins' },
        { name: 'Locked Keys Support', price: '749', time: '45-60 mins' },
        { name: 'Winch & Pull-out', price: '1,299', time: '60-90 mins' }
      ]
    },
    {
      id: 'maintenance',
      icon: IconWrench,
      title: 'Scheduled Maintenance',
      description: 'Keep your vehicle in shape',
      color: '#0B1F3B',
      lightColor: 'rgba(29,78,216,0.1)',
      services: [
        { name: 'Basic Service', price: '1,299', time: 'Same-day' },
        { name: 'Comprehensive Service', price: '2,299', time: 'Same-day' },
        { name: 'Pickup & Drop', price: '399', time: 'Next-day' },
        { name: 'Detailing & Wash', price: '899', time: 'Same-day' },
        { name: 'AC Service', price: '1,499', time: 'Same-day' },
        { name: 'Interior Deep Clean', price: '1,699', time: 'Same-day' }
      ]
    },
    {
      id: 'repairs',
      icon: IconShield,
      title: 'Mechanical & Electrical',
      description: 'Expert diagnostics and repairs',
      color: '#0B1F3B',
      lightColor: 'rgba(29,78,216,0.1)',
      services: [
        { name: 'Engine Tune-up', price: '1,799', time: 'Same-day' },
        { name: 'Brake Service', price: '999', time: 'Same-day' },
        { name: 'Battery Replacement', price: '499', time: '30-60 mins' },
        { name: 'Clutch & Gear Work', price: '2,499', time: '1-2 days' },
        { name: 'ECU Scan & Reset', price: '599', time: '60 mins' },
        { name: 'Suspension & Steering', price: '1,899', time: '1 day' }
      ]
    },
    {
      id: 'tyres',
      icon: IconSpark,
      title: 'Tyres & Wheels',
      description: 'Grip, balance, and alignment',
      color: '#FFFFFF',
      lightColor: 'rgba(134,183,255,0.1)',
      services: [
        { name: 'Wheel Alignment', price: '699', time: '60 mins' },
        { name: 'Wheel Balancing', price: '599', time: '60 mins' },
        { name: 'Tyre Replacement', price: '1,299', time: '90 mins' },
        { name: 'Alloy Repair', price: '1,599', time: 'Same-day' },
        { name: 'Tyre Puncture Repair', price: '149', time: '30 mins' },
        { name: 'Wheel Cleaning', price: '299', time: '45 mins' }
      ]
    },
    {
      id: 'towing',
      icon: IconTruck,
      title: 'Towing & Transport',
      description: 'Safe vehicle transport',
      color: '#0B1F3B',
      lightColor: 'rgba(29,78,216,0.1)',
      services: [
        { name: 'City Tow (10 km)', price: '1,199', time: '45-90 mins' },
        { name: 'Flatbed Tow', price: '1,899', time: '60-120 mins' },
        { name: 'Long-Distance (per km)', price: '45/km', time: 'Scheduled' },
        { name: 'Bike Towing', price: '899', time: '45 mins' },
        { name: 'Premium Car Transport', price: '2,299', time: '90 mins' },
        { name: 'Interstate Transport', price: 'Custom', time: 'Scheduled' }
      ]
    },
    {
      id: 'body',
      icon: IconCard,
      title: 'Body & Paint',
      description: 'Restore your car\'s appearance',
      color: '#FFFFFF',
      lightColor: 'rgba(134,183,255,0.1)',
      services: [
        { name: 'Paint Touch-up', price: '1,299', time: '1 day' },
        { name: 'Dent Removal', price: '1,899', time: '1-2 days' },
        { name: 'Glass Repair', price: '999', time: 'Same-day' },
        { name: 'Scratch Removal', price: '599', time: 'Same-day' },
        { name: 'Full Body Polish', price: '2,499', time: '1 day' },
        { name: 'Ceramic Coating', price: '3,999', time: '1-2 days' }
      ]
    }
  ]

  const features = [
    {
      icon: IconSpark,
      title: 'Fast Service',
      description: 'Mechanics arrive within 30-90 minutes'
    },
    {
      icon: IconShield,
      title: 'Verified Mechanics',
      description: 'All mechanics are certified and background checked'
    },
    {
      icon: IconMapPin,
      title: 'Live Tracking',
      description: 'Track your mechanic in real-time on the map'
    },
    {
      icon: IconChat,
      title: 'Live Chat Support',
      description: 'Chat directly with your mechanic anytime'
    },
    {
      icon: IconMoney,
      title: 'Transparent Pricing',
      description: 'No hidden charges, price upfront'
    },
    {
      icon: IconShield,
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
    },
    {
      name: 'Neha R.',
      city: 'Pune',
      text: 'Flat tyre at midnight and help reached in under 35 minutes. Super smooth experience.',
      rating: 5
    },
    {
      name: 'Siddharth M.',
      city: 'Hyderabad',
      text: 'Loved the transparent pricing. The mechanic explained everything before starting work.',
      rating: 5
    },
    {
      name: 'Farhan A.',
      city: 'Chennai',
      text: 'Battery replacement was done at my office parking. Saved me a lot of time.',
      rating: 4
    },
    {
      name: 'Kavya N.',
      city: 'Ahmedabad',
      text: 'Live tracking is accurate and support team was responsive. Felt very safe using it.',
      rating: 5
    },
    {
      name: 'Manoj T.',
      city: 'Kolkata',
      text: 'Booked towing for my sedan and the handling was very professional from start to finish.',
      rating: 4
    }
  ]

  const marqueeTestimonials = [...testimonials, ...testimonials]

  const stats = [
    { number: '50K+', label: 'Vehicles Served' },
    { number: '4.8', label: 'Average Rating' },
    { number: '24/7', label: 'Emergency Support' },
    { number: '2000+', label: 'Verified Mechanics' }
  ]

  return (
    <div className="customer-home-root" style={{ background: luxury.pageBg, minHeight: '100vh', color: '#F8F3E7' }}>
      <style>{`
        .customer-home-root .rw-quick-action:hover {
          transform: translateY(-4px);
          border-color: rgba(224,191,122,0.45);
          box-shadow: 0 18px 40px rgba(0,0,0,0.38);
        }

        /* Center text in all panel/grid blocks */
        .customer-home-root .rw-quick-action,
        .customer-home-root .rw-section-shell .rw-feature-card,
        .customer-home-root .rw-section-shell .rw-service-card,
        .customer-home-root .rw-testimonial-card,
        .customer-home-root .rw-stat-block,
        .customer-home-root .rw-step-block {
          text-align: center !important;
        }

        .customer-home-root .rw-quick-action .rw-quick-top {
          justify-content: center !important;
          gap: 12px;
        }

        .customer-home-root .rw-service-row {
          display: grid !important;
          gap: 6px;
          justify-items: center;
          text-align: center !important;
        }

        .customer-home-root .rw-service-row .rw-service-main,
        .customer-home-root .rw-service-row .rw-service-price {
          width: 100%;
          text-align: center !important;
          margin-left: 0 !important;
        }

        .customer-home-root .rw-section-shell {
          display: flex;
          flex-direction: column;
          gap: 26px;
          margin-bottom: 36px !important;
        }

        .customer-home-root .rw-section-shell .rw-section-title {
          margin-bottom: 0 !important;
        }

        .customer-home-root .rw-panel-grid {
          display: grid;
          gap: 24px;
          align-items: stretch;
          row-gap: 24px;
        }

        .customer-home-root .rw-quick-grid,
        .customer-home-root .rw-stats-grid,
        .customer-home-root .rw-feature-grid,
        .customer-home-root .rw-service-grid,
        .customer-home-root .rw-steps-grid {
          gap: 24px !important;
        }

        .customer-home-root .rw-quick-action,
        .customer-home-root .rw-stat-block,
        .customer-home-root .rw-feature-card,
        .customer-home-root .rw-service-card,
        .customer-home-root .rw-step-block,
        .customer-home-root .rw-testimonial-card {
          height: 100%;
        }

        .customer-home-root .rw-testimonial-marquee {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }

        .customer-home-root .rw-testimonial-track {
          display: flex;
          width: max-content;
          gap: 24px;
          animation: rw-scroll-rtl 42s linear infinite;
          will-change: transform;
          align-items: stretch;
        }

        .customer-home-root .rw-testimonial-card {
          width: 360px;
          flex: 0 0 auto;
          min-height: 300px;
          max-height: 300px;
          display: grid;
          grid-template-rows: auto 1fr auto;
          align-content: start;
        }

        .customer-home-root .rw-review-text {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 102px;
          max-height: 102px;
        }

        .customer-home-root .rw-review-meta {
          min-height: 54px;
        }

        .customer-home-root .rw-review-grid .rw-testimonial-card {
          width: 100%;
          flex: 1 1 auto;
        }

        .customer-home-root .rw-testimonial-card > div:first-child {
          justify-content: center !important;
        }

        .customer-home-root .rw-testimonial-marquee:hover .rw-testimonial-track {
          animation-play-state: paused;
        }

        @keyframes rw-scroll-rtl {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .customer-home-root .rw-section-title {
          text-wrap: balance;
          margin-bottom: 0 !important;
        }

        /* Line spacing normalization */
        .customer-home-root h1,
        .customer-home-root h2,
        .customer-home-root h3,
        .customer-home-root p,
        .customer-home-root span,
        .customer-home-root button,
        .customer-home-root li,
        .customer-home-root .rw-service-main,
        .customer-home-root .rw-service-price {
          line-height: 1.5;
        }

        .customer-home-root .rw-quick-grid .rw-quick-action {
          min-height: 170px;
        }

        .customer-home-root .rw-stats-grid .rw-stat-block {
          min-height: 170px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .customer-home-root .rw-feature-grid .rw-feature-card {
          min-height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .customer-home-root .rw-service-grid .rw-service-card {
          min-height: 370px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .customer-home-root .rw-service-card .rw-service-expanded {
          max-height: 250px;
          overflow: auto;
        }

        .customer-home-root .rw-steps-grid .rw-step-block {
          min-height: 230px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        .customer-home-root .rw-testimonial-card {
          min-height: 280px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 768px) {
          .customer-home-root .rw-hero-cta {
            width: 100%;
          }

          .customer-home-root .rw-section-shell {
            border-radius: 14px;
            padding: 24px 16px;
          }

          .customer-home-root .rw-grid-compact {
            gap: 16px !important;
          }

          .customer-home-root .rw-feature-grid .rw-feature-card,
          .customer-home-root .rw-service-grid .rw-service-card,
          .customer-home-root .rw-testimonial-card {
            min-height: 260px;
          }

          .customer-home-root .rw-testimonial-card {
            width: 300px;
            min-height: 280px;
            max-height: 280px;
          }

          .customer-home-root .rw-review-text {
            min-height: 88px;
            max-height: 88px;
            -webkit-line-clamp: 4;
          }

          .customer-home-root .rw-steps-grid .rw-step-block,
          .customer-home-root .rw-stats-grid .rw-stat-block,
          .customer-home-root .rw-quick-grid .rw-quick-action {
            min-height: 200px;
          }
        }
      `}</style>
      {/* Hero Section */}
      <div style={{
        background: luxury.pageBg,
        padding: '120px 24px 80px',
        borderBottom: `1px solid rgba(143,181,232,0.2)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Accent */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, rgba(143,181,232,0.08), transparent)`,
          borderRadius: '50%'
        }} />
        
        <div className="rw-hero-content" style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '760px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '800',
            color: luxury.textPrimary,
            marginBottom: '24px',
            lineHeight: '1.12',
            letterSpacing: '-1px'
          }}>
            Your Trusted Mechanic,
            <br />
            <span style={{ color: luxury.gold, fontWeight: '800' }}>Just One Tap Away</span>
          </h1>
          
          <p style={{
            fontSize: '18px',
            color: luxury.textSecondary,
            marginBottom: '48px',
            lineHeight: '1.7',
            fontWeight: '400',
            maxWidth: '620px'
          }}>
            Professional repairs, transparent pricing, and real-time tracking—all in your pocket
          </p>

          {/* CTA Buttons */}
          <div className="rw-hero-cta-wrap" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
            <button
              onClick={() => navigate('/map')}
              className="rw-hero-cta"
              style={{
                padding: '14px 36px',
                background: `linear-gradient(135deg, ${luxury.gold}, #C4922D)`,
                color: '#0a1628',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: `0 12px 32px rgba(0,0,0,0.3)`
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4)`
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = `0 12px 32px rgba(0,0,0,0.3)`
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}><IconMapPin size={18} /> Find Mechanics</span>
            </button>
            <button
              onClick={() => navigate('/service')}
              className="rw-hero-cta"
              style={{
                padding: '14px 36px',
                background: 'transparent',
                color: luxury.textPrimary,
                border: `2px solid rgba(143,181,232,0.35)`,
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = `rgba(143,181,232,0.12)`
                e.target.style.borderColor = `rgba(143,181,232,0.5)`
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.borderColor = `rgba(143,181,232,0.35)`
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}><IconWrench size={18} /> Browse Services</span>
            </button>
          </div>

          {/* Trust Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 18px',
            borderRadius: '999px',
            background: `rgba(143,181,232,0.14)`,
            border: `1px solid rgba(143,181,232,0.3)`,
            color: luxury.textSecondary,
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '0.3px',
            textTransform: 'uppercase'
          }}>
            <IconShield size={14} /> Trusted by 50,000+ drivers
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '-28px auto 0', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <div className="rw-grid-compact rw-quick-grid rw-panel-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px'
        }}>
          {quickActions.map((action) => {
            const ActionIcon = action.icon
            return (
              <button
                key={action.id}
                className="rw-quick-action"
                onClick={() => navigate(action.route)}
                style={{
                  border: luxury.border,
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'left',
                  background: luxury.cardBg,
                  color: luxury.textPrimary,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: luxury.softShadow
                }}
              >
                <div className="rw-quick-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontWeight: '700', fontSize: '16px' }}>{action.label}</span>
                  <span style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `rgba(143,181,232,0.14)`,
                    color: luxury.textSecondary
                  }}>
                    <ActionIcon size={20} />
                  </span>
                </div>
                <div style={{ color: luxury.textSecondary, fontSize: '14px' }}>{action.sub}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div style={{
        ...sectionShell,
        marginTop: '28px',
        marginBottom: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '32px'
      }} className="rw-section-shell rw-grid-compact rw-stats-grid rw-panel-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="rw-stat-block" style={{ textAlign: 'center', padding: '28px 24px', background: luxury.cardBg, borderRadius: '16px', border: luxury.border, boxShadow: luxury.softShadow }}>
            <div style={{
              fontSize: '36px',
              fontWeight: '900',
              color: luxury.gold,
              marginBottom: '12px',
              letterSpacing: '-0.5px'
            }}>
              {stat.number}
            </div>
            <div style={{ fontSize: '15px', color: luxury.textSecondary, fontWeight: '600', letterSpacing: '0.3px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        ...sectionShell,
        marginBottom: '32px'
      }} className="rw-section-shell">
        <h2 style={{
          fontSize: '36px',
          fontWeight: '800',
          marginBottom: '56px',
          textAlign: 'center',
          color: luxury.textPrimary,
          lineHeight: '1.3'
        }} className="rw-section-title">
          Why Choose <span style={{ color: luxury.gold }}>RepairWale</span>?
        </h2>
        <div className="rw-feature-grid rw-panel-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px'
        }}>
          {features.map((feature, idx) => {
            const FeatureIcon = feature.icon
            return (
              <div key={idx} className="rw-feature-card" style={{
                background: luxury.cardBg,
                border: luxury.border,
                borderRadius: '18px',
                padding: '36px 28px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: luxury.softShadow
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.borderColor = `rgba(220,210,190,0.4)`
                e.currentTarget.style.boxShadow = luxury.mediumShadow
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = luxury.border.split('1px solid ')[1]
                e.currentTarget.style.boxShadow = luxury.softShadow
              }}>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `rgba(212,175,55,0.12)`,
                    color: luxury.textSecondary
                  }}>
                    <FeatureIcon size={28} />
                  </div>
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '14px',
                  color: luxury.textPrimary,
                  lineHeight: '1.3'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '15px',
                  color: luxury.textSecondary,
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Services Categories */}
      <div style={{
        ...sectionShell,
        marginBottom: '32px'
      }} className="rw-section-shell">
        <h2 style={{
          fontSize: '36px',
          fontWeight: '800',
          marginBottom: '56px',
          color: luxury.textPrimary,
          textAlign: 'center',
          lineHeight: '1.3'
        }} className="rw-section-title">
          Our <span style={{ color: luxury.gold }}>Services</span>
        </h2>

        <div className="rw-service-grid rw-panel-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '28px'
        }}>
          {serviceCategories.map((category) => {
            const CategoryIcon = category.icon
            return (
              <div
                key={category.id}
                className="rw-service-card"
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                style={{
                  background: luxury.cardBg,
                border: `2px solid ${selectedCategory === category.id ? 'rgba(143,181,232,0.5)' : luxury.border.split('1px solid ')[1]}`,
                  borderRadius: '18px',
                  padding: '36px 28px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedCategory === category.id ? luxury.mediumShadow : luxury.softShadow
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.borderColor = `rgba(143,181,232,0.5)`
                    e.currentTarget.style.transform = 'translateY(-6px)'
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.borderColor = luxury.border.split('1px solid ')[1]
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `rgba(143,181,232,0.14)`,
                    color: luxury.textSecondary
                  }}>
                    <CategoryIcon size={32} />
                  </div>
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '10px',
                  color: luxury.textPrimary
                }}>
                  {category.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: luxury.textSecondary,
                  marginBottom: '20px'
                }}>
                  {category.description}
                </p>

                {selectedCategory === category.id && (
                  <div className="rw-service-expanded" style={{
                    marginTop: '24px',
                    paddingTop: '24px',
                    borderTop: `1px solid rgba(143,181,232,0.25)`,
                  }}>
                    <div style={{ display: 'grid', gap: '14px' }}>
                      {category.services.map((service, idx) => (
                        <div key={idx} className="rw-service-row" style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '14px 16px',
                          background: `rgba(143,181,232,0.1)`,
                          borderRadius: '10px',
                          fontSize: '14px',
                          border: `1px solid rgba(143,181,232,0.22)`
                        }}>
                          <div className="rw-service-main" style={{ flex: 1 }}>
                            <div style={{ color: luxury.textPrimary, fontWeight: '600', marginBottom: '4px' }}>
                              {service.name}
                            </div>
                            <div style={{ color: luxury.textSecondary, fontSize: '13px' }}>
                              {service.time}
                            </div>
                          </div>
                          <div className="rw-service-price" style={{ color: luxury.textPrimary, fontWeight: '700', marginLeft: '16px' }}>
                            {service.price === 'Custom' || service.price.includes('/km') ? service.price : `₹ ${service.price}`}
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
                        marginTop: '20px',
                        padding: '14px 16px',
                        background: `linear-gradient(135deg, ${luxury.gold}, #C4922D)`,
                        color: '#0a1628',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '15px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: `0 10px 26px rgba(0,0,0,0.25)`
                      }}
                      onMouseOver={(e) => {
                        e.target.style.opacity = '0.95'
                        e.target.style.transform = 'translateY(-2px)'
                      }}
                      onMouseOut={(e) => {
                        e.target.style.opacity = '1'
                        e.target.style.transform = 'translateY(0)'
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                )}

                <div style={{
                  marginTop: '18px',
                  fontSize: '13px',
                  color: luxury.textSecondary,
                  fontWeight: '500'
                }}>
                  {category.services.length} services available
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* How It Works */}
      <div style={{
        ...sectionShell,
        marginBottom: '32px',
        borderTop: `1px solid ${luxury.gold}1a`
      }} className="rw-section-shell">
        <h2 style={{
          fontSize: '36px',
          fontWeight: '800',
          marginBottom: '56px',
          textAlign: 'center',
          color: luxury.textPrimary,
          lineHeight: '1.3'
        }} className="rw-section-title">
          How <span style={{ color: luxury.gold }}>It Works</span>
        </h2>

        <div className="rw-steps-grid rw-panel-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '36px'
        }}>
          {[
            { icon: IconMapPin, title: 'Share Location', desc: 'Tell us your location and problem' },
            { icon: IconWrench, title: 'Get Matched', desc: 'We find the best nearby mechanic' },
            { icon: IconChat, title: 'Communicate', desc: 'Chat with your mechanic in real-time' },
            { icon: IconMoney, title: 'Service & Pay', desc: 'Get service and pay securely' }
          ].map((item, idx) => {
            const StepIcon = item.icon
            return (
              <div key={idx} className="rw-step-block" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: `linear-gradient(135deg, ${luxury.gold}, #C4922D)`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: `0 12px 32px rgba(0,0,0,0.3)`,
                  color: '#0a1628'
                }}>
                  <StepIcon size={28} />
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '10px',
                  color: luxury.textPrimary
                }}>
                  {item.title}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '15px',
                  color: luxury.textSecondary,
                  lineHeight: '1.6'
                }}>
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{
        ...sectionShell,
        marginBottom: '32px',
        borderTop: `1px solid ${luxury.gold}1a`
      }} className="rw-section-shell">
        <h2 style={{
          fontSize: '36px',
          fontWeight: '800',
          marginBottom: '56px',
          textAlign: 'center',
          color: luxury.textPrimary,
          lineHeight: '1.3'
        }} className="rw-section-title">
          What Our <span style={{ color: luxury.gold }}>Customers Say</span>
        </h2>

        <div className="rw-testimonial-marquee">
          <div className="rw-testimonial-track">
            {marqueeTestimonials.map((testimonial, idx) => (
            <div key={`${testimonial.name}-${idx}`} className="rw-testimonial-card" style={{
              background: luxury.cardBg,
              border: luxury.border,
              borderRadius: '18px',
              padding: '36px 28px',
              boxShadow: luxury.softShadow
            }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={{ fontSize: '18px', color: '#FFD700' }}><IconStar size={18} /></span>
                ))}
              </div>
              <p style={{
                fontSize: '15px',
                color: luxury.textSecondary,
                marginBottom: '20px',
                lineHeight: '1.7'
              }} className="rw-review-text">
                "{testimonial.text}"
              </p>
              <div className="rw-review-meta" style={{ borderTop: `1px solid rgba(220,210,190,0.2)`, paddingTop: '18px' }}>
                <p style={{ margin: '0 0 6px 0', fontWeight: '700', color: luxury.textPrimary }}>
                  {testimonial.name}
                </p>
                <p style={{ margin: 0, fontSize: '14px', color: luxury.textSecondary }}>
                  {testimonial.city}
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      <div style={{
        background: `linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.04) 100%)`,
        padding: '80px 24px',
        textAlign: 'center',
        borderTop: `1px solid rgba(220,210,190,0.2)`,
        boxShadow: `inset 0 14px 40px rgba(0,0,0,0.25)`
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '800',
          marginBottom: '20px',
          color: luxury.textPrimary,
          lineHeight: '1.2'
        }}>
          Ready to Get Your Vehicle <span style={{ color: luxury.gold }}>Fixed?</span>
        </h2>
        <p style={{
          fontSize: '18px',
          color: luxury.textSecondary,
          marginBottom: '0px',
          maxWidth: '640px',
          margin: '0 auto 40px',
          lineHeight: '1.7'
        }}>
          Join thousands of happy customers who trust RepairWale for their vehicle maintenance and repairs
        </p>
        <button
          onClick={() => navigate('/map')}
          style={{
            padding: '16px 52px',
            background: `linear-gradient(135deg, ${luxury.gold}, #C4922D)`,
            color: '#0a1628',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: `0 14px 36px rgba(0,0,0,0.3)`
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = `0 18px 48px rgba(0,0,0,0.4)`
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = `0 14px 36px rgba(0,0,0,0.3)`
          }}
        >
          Find a Mechanic Now
        </button>
      </div>
    </div>
  )
}


