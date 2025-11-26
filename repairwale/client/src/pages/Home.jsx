import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import MiniMap from '../components/MiniMap'

export default function Home(){
  return (
    <div>
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">Fast roadside help, wherever you are</h1>
          <p className="hero-sub muted">RepairWale connects vehicle owners to nearby mechanics in real time. Request help, chat, and pay securely — all from your phone or browser.</p>

          <div className="hero-cta">
            <Link to="/map"><Button variant="primary" size="lg">Find Mechanics Now</Button></Link>
            <Link to="/service"><Button variant="ghost" size="lg">Our Services</Button></Link>
          </div>

          <div className="features-grid" aria-hidden>
            <div className="feature card">
              <strong>Live map</strong>
              <div className="muted">See mechanics and availability nearby.</div>
            </div>
            <div className="feature card">
              <strong>In-app chat</strong>
              <div className="muted">Communicate directly with the mechanic.</div>
            </div>
            <div className="feature card">
              <strong>Secure payments</strong>
              <div className="muted">Pay safely after service completion.</div>
            </div>
          </div>
        </div>

        <div className="hero-visual card">
          <MiniMap mechanics={[{id:'m1',name:'Ravi',lat:28.6139,lng:77.2090},{id:'m2',name:'Sai',lat:28.618,lng:77.212}]} />
          <div className="trustRow">
            <div className="stat"><strong>24k+</strong><div className="muted">Requests served</div></div>
            <div className="stat"><strong>4.7★</strong><div className="muted">Average rating</div></div>
            <div className="stat"><strong>99%</strong><div className="muted">Fast response</div></div>
          </div>
        </div>
      </section>

      <section style={{marginTop:28}}>
        <h3>How it works</h3>
        <div className="services-grid">
          <div className="card service-card">
            <div className="service-title">Find nearby mechanics</div>
            <p className="muted">See mechanics on the map and pick one.</p>
          </div>
          <div className="card service-card">
            <div className="service-title">Request service</div>
            <p className="muted">Send job details and share your location.</p>
          </div>
          <div className="card service-card">
            <div className="service-title">Pay securely</div>
            <p className="muted">Use safe online payments (Razorpay).</p>
          </div>
        </div>
      </section>

      <section className="aboutSection" style={{marginTop:36}}>
        <div className="card aboutCard">
          <div className="aboutGrid">
            <div className="aboutText">
              <h3>About RepairWale</h3>
              <p className="muted">RepairWale was created to make roadside assistance faster, fairer and more transparent. We connect drivers with trusted local mechanics, provide in-app chat and simple payments, and focus on fast response times.</p>
              <p className="muted">Our mission is to reduce downtime on the road by matching people to professionals nearby and giving both sides the tools to complete jobs quickly and safely.</p>
              <Link to="/service"><Button variant="primary">See Services</Button></Link>
            </div>
            <div className="aboutVisual">
              <div className="teamShot card">
                <div style={{padding:18}}>
                  <strong>Our team</strong>
                  <div className="muted">A small team of mechanics, builders and support staff focused on roadside rescue.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials" style={{marginTop:28}}>
        <h3>What users say</h3>
        <div className="testGrid">
          <div className="card">
            <div><strong>Excellent response</strong></div>
            <div className="muted">"Mechanic arrived in 15 minutes and fixed my flat tyre. Super helpful." — Asha</div>
          </div>
          <div className="card">
            <div><strong>Very convenient</strong></div>
            <div className="muted">"I could chat and pay within the app. Smooth experience." — Rohit</div>
          </div>
          <div className="card">
            <div><strong>Trusted mechanics</strong></div>
            <div className="muted">"Good ratings and clear pricing. Will use again." — Meera</div>
          </div>
        </div>
      </section>

      <section className="faq" style={{marginTop:28}}>
        <h3>Frequently asked questions</h3>
        <div className="card">
          <strong>How do I request help?</strong>
          <div className="muted">Open the map, allow location access and submit a request with your problem details.</div>
        </div>
        <div className="card">
          <strong>How are mechanics chosen?</strong>
          <div className="muted">We show nearby mechanics; you can choose one or let the system assign based on proximity and rating.</div>
        </div>
      </section>
    </div>
  )
}
