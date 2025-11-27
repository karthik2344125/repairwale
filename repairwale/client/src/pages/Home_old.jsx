import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: '80px 0 100px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: -100,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}/>
        
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                borderRadius: 100,
                background: 'var(--surface)',
                border: '1px solid var(--border-subtle)',
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 32,
                color: 'var(--text-secondary)',
                letterSpacing: '0.3px'
              }}>
                <span style={{ fontSize: 16 }}>🚗</span>
                PREMIUM ROADSIDE ASSISTANCE
              </div>
              
              <h1 style={{
                margin: 0,
                fontSize: 56,
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 24,
                color: 'var(--text-primary)',
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
                  <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 6 }}>24k+</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.3px' }}>SERVICE REQUESTS</div>
                </div>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 6 }}>4.8★</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.3px' }}>AVERAGE RATING</div>
                </div>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 6 }}>&lt;15min</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.3px' }}>AVG RESPONSE</div>
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
              <div style={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)'
              }} />
              
              <div style={{ textAlign: 'center', padding: 32, position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 72, marginBottom: 20 }}>🔧</div>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
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
                <div style={{
                  padding: 20,
                  background: 'var(--bg-secondary)',
                  borderRadius: 12,
                  textAlign: 'center',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🗺️</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Live Tracking</div>
                </div>
                <div style={{
                  padding: 20,
                  background: 'var(--bg-secondary)',
                  borderRadius: 12,
                  textAlign: 'center',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>💬</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>In-App Chat</div>
                </div>
                <div style={{
                  padding: 20,
                  background: 'var(--bg-secondary)',
                  borderRadius: 12,
                  textAlign: 'center',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>💳</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Secure Payment</div>
                </div>
                <div style={{
                  padding: 20,
                  background: 'var(--bg-secondary)',
                  borderRadius: 12,
                  textAlign: 'center',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>⭐</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Rated Service</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ margin: 0, fontSize: 42, fontWeight: 900, letterSpacing: '-1px' }}>
              How RepairWale Works
            </h2>
            <p style={{ marginTop: 16, fontSize: 17, color: 'var(--text-secondary)', maxWidth: 600, margin: '16px auto 0' }}>
              Get professional help in three simple steps — from request to resolution
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            <div style={{
              padding: 36,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              position: 'relative',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-light) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              fontSize: 24,
              fontWeight: 900,
              color: '#fff',
              marginBottom: 20
            }}>1</div>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Find Nearby Mechanics</h3>
            <p style={{ marginTop: 12, fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              View mechanics on a live map. Filter by rating, distance, and availability. Choose the best match for your needs.
            </p>
          </div>

          <div style={{
            padding: 32,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            position: 'relative'
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'linear-gradient(135deg, var(--accent), #1e5128)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 900,
              color: '#fff',
              marginBottom: 20
            }}>2</div>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Request & Track Service</h3>
            <p style={{ marginTop: 12, fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              Share your problem and location. Track mechanic arrival in real-time. Chat directly for updates.
            </p>
          </div>

          <div style={{
            padding: 32,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            position: 'relative'
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'linear-gradient(135deg, var(--accent), #1e5128)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 900,
              color: '#fff',
              marginBottom: 20
            }}>3</div>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Pay Securely</h3>
            <p style={{ marginTop: 12, fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              Complete payment after service is done. Secure, cashless transactions powered by Razorpay. Rate your experience.
            </p>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div style={{
              padding: 28,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🗺️</div>
              <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Real-Time Map</h4>
              <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                See live mechanic locations and availability near you
              </p>
            </div>

            <div style={{
              padding: 28,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>💬</div>
              <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Direct Chat</h4>
              <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                Communicate directly with mechanics before and during service
              </p>
            </div>

            <div style={{
              padding: 28,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⭐</div>
              <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Verified Ratings</h4>
              <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                Choose mechanics based on real customer reviews and ratings
              </p>
            </div>

            <div style={{
              padding: 28,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>💳</div>
              <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Cashless Payment</h4>
              <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                Secure online payments with transparent pricing
              </p>
            </div>

            <div style={{
              padding: 28,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📍</div>
              <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>GPS Tracking</h4>
              <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                Track mechanic arrival with live GPS updates
              </p>
            </div>

            <div style={{
              padding: 28,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
              <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Secure & Private</h4>
              <p style={{ marginTop: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                Your data and transactions are protected end-to-end
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ margin: 0, fontSize: 36, fontWeight: 800 }}>What Our Users Say</h2>
          <p style={{ marginTop: 12, fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>
            Real experiences from thousands of satisfied customers
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          <div style={{
            padding: 32,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16
          }}>
            <div style={{ color: '#ffc107', fontSize: 20, marginBottom: 12 }}>★★★★★</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
              "Mechanic arrived in 15 minutes and fixed my flat tyre on the spot. Super helpful and professional service!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#fff'
              }}>A</div>
              <div>
                <div style={{ fontWeight: 600 }}>Asha K.</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Delhi</div>
              </div>
            </div>
          </div>

          <div style={{
            padding: 32,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16
          }}>
            <div style={{ color: '#ffc107', fontSize: 20, marginBottom: 12 }}>★★★★★</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
              "I could track everything in real-time and chat with the mechanic. Payment was smooth too. Excellent experience!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#fff'
              }}>R</div>
              <div>
                <div style={{ fontWeight: 600 }}>Rohit M.</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Mumbai</div>
              </div>
            </div>
          </div>

          <div style={{
            padding: 32,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16
          }}>
            <div style={{ color: '#ffc107', fontSize: 20, marginBottom: 12 }}>★★★★★</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
              "Transparent pricing and verified mechanics. I felt safe using this service. Highly recommended!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#fff'
              }}>M</div>
              <div>
                <div style={{ fontWeight: 600 }}>Meera S.</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Bangalore</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, rgba(46,213,115,0.1) 0%, rgba(0,0,0,0.2) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ margin: 0, fontSize: 40, fontWeight: 900 }}>
            Need Help Right Now?
          </h2>
          <p style={{ marginTop: 16, fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            Connect with verified mechanics in your area within minutes. Fast, reliable, and secure assistance whenever you need it.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" onClick={() => navigate('/map')}>
              Find Mechanics Now
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate('/signin')}>
              Create Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
