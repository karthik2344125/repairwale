import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: -100,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}/>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 20px',
                borderRadius: 100,
                background: 'var(--surface)',
                border: '1px solid var(--border-subtle)',
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 32,
                color: 'var(--text-secondary)',
                letterSpacing: '0.5px'
              }}>
                <span style={{ fontSize: 18 }}>🚗</span>
                PREMIUM ROADSIDE ASSISTANCE
              </div>
              
              <h1 style={{
                margin: 0,
                fontSize: 56,
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 24,
                letterSpacing: '-1.5px'
              }}>
                Fast Roadside Help,<br/>
                <span style={{ color: 'var(--text-secondary)' }}>Wherever You Are</span>
              </h1>
              
              <p style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: 36,
                maxWidth: 520
              }}>
                Connect with certified mechanics in real-time. Track arrival, chat securely, and pay with confidence — all in one elegant platform.
              </p>
              
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 56 }}>
                <Button variant="primary" size="lg" onClick={() => navigate('/map')}>
                  Find Mechanics Now
                </Button>
                <Button variant="ghost" size="lg" onClick={() => navigate('/service')}>
                  View Services
                </Button>
              </div>

              {/* Trust Indicators */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 32,
                paddingTop: 32,
                borderTop: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 6 }}>24k+</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.5px', fontWeight: 600 }}>
                    SERVICE REQUESTS
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 6 }}>4.8★</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.5px', fontWeight: 600 }}>
                    AVERAGE RATING
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 6 }}>&lt;15min</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.5px', fontWeight: 600 }}>
                    AVG RESPONSE
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: 40,
              position: 'relative',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ textAlign: 'center', padding: 32, marginBottom: 24 }}>
                <div style={{ fontSize: 72, marginBottom: 20 }}>🔧</div>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                  24/7 Available
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
                  Certified mechanics ready to assist you anytime, anywhere
                </p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 12
              }}>
                {[
                  { icon: '🗺️', label: 'Live Tracking' },
                  { icon: '💬', label: 'In-App Chat' },
                  { icon: '💳', label: 'Secure Payment' },
                  { icon: '⭐', label: 'Rated Service' }
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: 20,
                    background: 'var(--bg-secondary)',
                    borderRadius: 12,
                    textAlign: 'center',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2>How RepairWale Works</h2>
          <p style={{ marginTop: 16, fontSize: 17, color: 'var(--text-secondary)', maxWidth: 600, margin: '16px auto 0' }}>
            Get professional help in three simple steps — from request to resolution
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {[
            { icon: '📍', step: '01', title: 'Request Service', desc: 'Select your service, share your location, and describe the issue — takes less than a minute' },
            { icon: '🔍', step: '02', title: 'Match & Track', desc: 'We connect you with the nearest certified mechanic. Track their arrival in real-time on the map' },
            { icon: '✅', step: '03', title: 'Service & Pay', desc: 'Get your vehicle fixed on-site. Review service quality and pay securely through the app' }
          ].map((item, i) => (
            <div key={i} style={{
              padding: 40,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                fontSize: 48,
                fontWeight: 900,
                color: 'var(--bg-tertiary)',
                lineHeight: 1
              }}>
                {item.step}
              </div>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-light) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                marginBottom: 24,
                boxShadow: 'var(--shadow-sm)'
              }}>
                {item.icon}
              </div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: 22 }}>{item.title}</h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: 15 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2>Premium Features</h2>
          <p style={{ marginTop: 16, fontSize: 17, color: 'var(--text-secondary)', maxWidth: 600, margin: '16px auto 0' }}>
            Everything you need for a seamless roadside assistance experience
          </p>
        </div>

        <div className="features-grid">
          {[
            { icon: '⚡', title: 'Emergency Response', desc: 'Instant connections for breakdown, flat tyre, or battery issues' },
            { icon: '🛠️', title: 'Full Maintenance', desc: 'Comprehensive vehicle servicing at your doorstep' },
            { icon: '🚚', title: 'Towing Services', desc: 'Flatbed and regular towing available city-wide' },
            { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden fees — see exact costs before booking' },
            { icon: '🔒', title: 'Secure Payments', desc: 'Multiple payment options with bank-level encryption' },
            { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock customer service and assistance' }
          ].map((item, i) => (
            <div key={i} className="feature">
              <div style={{
                fontSize: 36,
                marginBottom: 16,
                display: 'inline-block',
                padding: 12,
                background: 'var(--bg-secondary)',
                borderRadius: 12
              }}>
                {item.icon}
              </div>
              <h4 style={{ margin: '0 0 10px 0' }}>{item.title}</h4>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '100px 0', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2>What Our Customers Say</h2>
          <p style={{ marginTop: 16, fontSize: 17, color: 'var(--text-secondary)' }}>
            Trusted by thousands of satisfied customers
          </p>
        </div>

        <style>{`
          @keyframes scrollTestimonials {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .testimonials-track {
            display: flex;
            gap: 24px;
            animation: scrollTestimonials 40s linear infinite;
            width: max-content;
          }
          .testimonials-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div className="testimonials-track">
            {[
              { name: 'Rajesh Kumar', role: 'Business Owner', rating: 5, text: 'Saved me on the highway! Quick response, professional mechanic, and fair pricing. Highly recommended.' },
              { name: 'Priya Sharma', role: 'Marketing Manager', rating: 5, text: 'The live tracking feature is brilliant. I knew exactly when help would arrive. Very reassuring experience.' },
              { name: 'Amit Patel', role: 'Software Engineer', rating: 5, text: 'Best roadside assistance app! Clean interface, reliable service, and the chat feature is super helpful.' },
              { name: 'Neha Reddy', role: 'Teacher', rating: 5, text: 'Got a flat tire late at night and RepairWale connected me with help within 10 minutes. Lifesaver!' },
              { name: 'Vikram Singh', role: 'Delivery Executive', rating: 4, text: 'Reliable and affordable. The mechanics are well-trained and the service quality is consistent.' },
              { name: 'Anjali Gupta', role: 'Consultant', rating: 5, text: 'The transparency in pricing is amazing. No surprises, no hidden charges. Professional service every time.' },
              { name: 'Rohan Mehta', role: 'Photographer', rating: 5, text: 'Used it multiple times during my road trips. The 24/7 availability gives me peace of mind on long drives.' },
              { name: 'Sonia Das', role: 'Entrepreneur', rating: 5, text: 'Fast, efficient, and trustworthy. The in-app chat feature made communication so much easier.' },
              // Duplicate for seamless loop
              { name: 'Rajesh Kumar', role: 'Business Owner', rating: 5, text: 'Saved me on the highway! Quick response, professional mechanic, and fair pricing. Highly recommended.' },
              { name: 'Priya Sharma', role: 'Marketing Manager', rating: 5, text: 'The live tracking feature is brilliant. I knew exactly when help would arrive. Very reassuring experience.' },
              { name: 'Amit Patel', role: 'Software Engineer', rating: 5, text: 'Best roadside assistance app! Clean interface, reliable service, and the chat feature is super helpful.' },
              { name: 'Neha Reddy', role: 'Teacher', rating: 5, text: 'Got a flat tire late at night and RepairWale connected me with help within 10 minutes. Lifesaver!' },
              { name: 'Vikram Singh', role: 'Delivery Executive', rating: 4, text: 'Reliable and affordable. The mechanics are well-trained and the service quality is consistent.' },
              { name: 'Anjali Gupta', role: 'Consultant', rating: 5, text: 'The transparency in pricing is amazing. No surprises, no hidden charges. Professional service every time.' },
              { name: 'Rohan Mehta', role: 'Photographer', rating: 5, text: 'Used it multiple times during my road trips. The 24/7 availability gives me peace of mind on long drives.' },
              { name: 'Sonia Das', role: 'Entrepreneur', rating: 5, text: 'Fast, efficient, and trustworthy. The in-app chat feature made communication so much easier.' }
            ].map((item, i) => (
              <div key={i} style={{
                padding: 32,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                boxShadow: 'var(--shadow-md)',
                minWidth: 340,
                maxWidth: 340,
                flex: '0 0 auto'
              }}>
                <div style={{ color: '#FFD700', fontSize: 18, marginBottom: 16 }}>
                  {'★'.repeat(item.rating)}
                </div>
                <p style={{ margin: '0 0 24px 0', fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)', minHeight: 80 }}>
                  "{item.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-dark), var(--surface))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 700
                  }}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garage Tie-Ups */}
      <section style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2>Our Garage Tie‑Ups</h2>
          <p style={{ marginTop: 16, fontSize: 17, color: 'var(--text-secondary)', maxWidth: 720, margin: '16px auto 0' }}>
            We partner with vetted garages to ensure consistent quality, faster response, and fair pricing. Below are a few of our preferred partners.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { name: 'Prime Auto Works', area: 'Koramangala', rating: 4.8, perks: ['Priority dispatch','OEM parts'], tag: 'Preferred Partner' },
            { name: 'Metro Motors Pro', area: 'Indiranagar', rating: 4.7, perks: ['Extended hours','Quick turnaround'], tag: 'Preferred Partner' },
            { name: 'Reliable Motors HQ', area: 'Whitefield', rating: 4.6, perks: ['Warranty support','Diagnostic tools'], tag: 'Preferred Partner' },
            { name: 'GearUp Garage', area: 'HSR Layout', rating: 4.5, perks: ['Battery swap','Tyre services'] },
            { name: 'Street Mechanics+', area: 'BTM', rating: 4.5, perks: ['On-site repair','Towing'] }
          ].map((g, i) => (
            <div key={i} className="card" style={{ border: '1px solid var(--border)', borderRadius: 14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0 }}>{g.name}</h3>
                {g.tag ? (
                  <span style={{ fontSize: 12, padding: '6px 10px', borderRadius: 100, background: 'var(--surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                    {g.tag}
                  </span>
                ) : null}
              </div>
              <div className="muted" style={{ marginBottom: 12 }}>{g.area} • {g.rating}★</div>
              <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
                {g.perks.map((p, idx) => (
                  <span key={idx} style={{ fontSize: 12, padding: '6px 10px', borderRadius: 100, background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Selection Criteria</div>
              <div className="muted">Certified technicians, SLA adherence, parts quality, and customer feedback.</div>
            </div>
            <div>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Incentives & Payouts</div>
              <div className="muted">Preferred partners receive higher payouts for sustained quality and rapid response.</div>
            </div>
            <div>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Coverage & Availability</div>
              <div className="muted">City‑wide coverage with extended hours and emergency support.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 0', textAlign: 'center' }}>
        <div style={{
          maxWidth: 700,
          margin: '0 auto',
          padding: 60,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h2 style={{ margin: '0 0 20px 0' }}>Ready to Get Started?</h2>
          <p style={{ margin: '0 0 32px 0', fontSize: 17, color: 'var(--text-secondary)' }}>
            Join thousands of satisfied customers experiencing premium roadside assistance
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" onClick={() => navigate('/service')}>
              Book a Service
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate('/map')}>
              Find Mechanics
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
