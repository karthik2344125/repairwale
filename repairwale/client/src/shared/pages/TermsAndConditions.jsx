import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function TermsAndConditions() {
  const navigate = useNavigate()
  const pageStyle = {
    padding: '54px 0 80px',
    background: 'linear-gradient(180deg, #06101d 0%, #0a1629 48%, #10223e 100%)',
    minHeight: '100vh'
  }

  const backButtonStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.82,
    borderColor: 'rgba(228,216,191,0.28)',
    color: '#f0e9da'
  }

  return (
    <div style={pageStyle}>
      <div className="legal-wrapper">
        <div className="legal-hero">
          <Button variant="ghost" onClick={()=> navigate(-1)} style={backButtonStyle}>Back</Button>
          <h1>Terms & Conditions</h1>
          <p className="legal-sub">Please review these terms carefully before using RepairWale. Continued use of the platform signifies acceptance.</p>
          <div className="legal-meta">Last updated: December 2, 2025</div>
        </div>

        <div className="legal-grid">
          
          {/* Introduction */}
          <section className="legal-section">
            <div className="legal-badge">INTRODUCTION</div>
            <h2>Welcome to RepairWale</h2>
            <p>By accessing or using our platform, you agree to be bound by these Terms and Conditions. RepairWale provides a digital platform connecting vehicle owners with certified roadside assistance mechanics and service providers.</p>
            <p>If you do not agree with any part of these terms, please do not use our services.</p>
          </section>

          {/* Service Description */}
          <section className="legal-section">
            <div className="legal-badge">SERVICE DESCRIPTION</div>
            <h2>What We Offer</h2>
            <p>RepairWale operates as an intermediary platform that:</p>
            <ul className="legal-list">
              <li><span className="marker"></span>Connects customers with verified mechanics and service providers</li>
              <li><span className="marker"></span>Facilitates real-time location tracking and communication</li>
              <li><span className="marker"></span>Processes payments securely through integrated payment gateways</li>
              <li><span className="marker"></span>Provides service history and digital invoicing</li>
              <li><span className="marker"></span>Enables emergency roadside assistance requests</li>
            </ul>
            <p>RepairWale does not directly provide mechanical services. All services are performed by independent third-party mechanics registered on our platform.</p>
          </section>

          {/* User Obligations */}
          <section className="legal-section">
            <div className="legal-badge">USER OBLIGATIONS</div>
            <h2>User Responsibilities</h2>
            <p>As a user of RepairWale, you agree to:</p>
            <ul className="legal-list">
              <li><span className="marker"></span>Provide accurate and up-to-date information during registration and service requests</li>
              <li><span className="marker"></span>Use the platform only for lawful purposes</li>
              <li><span className="marker"></span>Not misuse or abuse the services or platform features</li>
              <li><span className="marker"></span>Treat service providers with respect and professionalism</li>
              <li><span className="marker"></span>Pay for services rendered as per the agreed pricing</li>
              <li><span className="marker"></span>Report any issues or disputes promptly through proper channels</li>
              <li><span className="marker"></span>Maintain the confidentiality of your account credentials</li>
            </ul>
          </section>

          {/* Service Provider Requirements */}
          <section className="legal-section">
            <div className="legal-badge">PROVIDER STANDARDS</div>
            <h2>Service Provider Requirements</h2>
            <p>Mechanics and service providers on RepairWale must:</p>
            <ul className="legal-list">
              <li><span className="marker"></span>Possess valid licenses, certifications, and insurance as required by law</li>
              <li><span className="marker"></span>Provide quality services in a professional and timely manner</li>
              <li><span className="marker"></span>Maintain accurate availability status on the platform</li>
              <li><span className="marker"></span>Honor pricing displayed on the platform</li>
              <li><span className="marker"></span>Handle customer data with confidentiality</li>
              <li><span className="marker"></span>Report service completion and issues accurately</li>
            </ul>
          </section>

          {/* Pricing and Payment */}
          <section className="legal-section">
            <div className="legal-badge">PAYMENT TERMS</div>
            <h2>Pricing and Payment</h2>
            <p>All prices displayed on RepairWale are in Indian Rupees (Rs) and are indicative ranges. Final pricing may vary based on:</p>
            <ul className="legal-list">
              <li><span className="marker"></span>Actual diagnostic findings</li>
              <li><span className="marker"></span>Parts and materials required</li>
              <li><span className="marker"></span>Distance traveled by the service provider</li>
              <li><span className="marker"></span>Time of service (emergency surcharges may apply)</li>
            </ul>
            <p>Payment is processed through Razorpay or other integrated payment gateways. RepairWale charges a service fee (deducted from mechanic payments) for platform usage.</p>
          </section>

          {/* Cancellation and Refunds */}
          <section className="legal-section">
            <div className="legal-badge">CANCELLATION & REFUNDS</div>
            <h2>Cancellation and Refunds</h2>
            <p><strong>User Cancellations:</strong></p>
            <ul className="legal-list">
              <li><span className="marker"></span>Free cancellation within 2 minutes of booking</li>
              <li><span className="marker"></span>Cancellations after mechanic dispatch may incur a cancellation fee</li>
              <li><span className="marker"></span>No-shows may result in full charge</li>
            </ul>
            <p><strong>Refund Policy:</strong></p>
            <ul className="legal-list">
              <li><span className="marker"></span>Refunds for service issues are processed within 7-10 business days</li>
              <li><span className="marker"></span>Disputes must be raised within 48 hours of service completion</li>
              <li><span className="marker"></span>Refund amounts are determined on a case-by-case basis</li>
            </ul>
          </section>

          {/* Liability Disclaimer */}
          <section className="legal-section">
            <div className="legal-badge">LIABILITY</div>
            <h2>Liability and Disclaimer</h2>
            <p>RepairWale acts solely as a platform intermediary. We do not:</p>
            <ul className="legal-list">
              <li><span className="marker"></span>Guarantee the quality, safety, or legality of services provided by mechanics</li>
              <li><span className="marker"></span>Assume liability for damages caused during service provision</li>
              <li><span className="marker"></span>Take responsibility for disputes between users and service providers</li>
              <li><span className="marker"></span>Guarantee mechanic availability or response times</li>
            </ul>
            <p>Users engage with service providers at their own risk. RepairWale is not liable for any direct, indirect, incidental, or consequential damages arising from platform use.</p>
          </section>

          {/* Data Privacy */}
          <section className="legal-section">
            <div className="legal-badge">PRIVACY & SECURITY</div>
            <h2>Data Privacy and Security</h2>
            <p>RepairWale collects and processes user data including:</p>
            <ul className="legal-list">
              <li><span className="marker"></span>Personal information (name, phone, email, address)</li>
              <li><span className="marker"></span>Location data for service matching and tracking</li>
              <li><span className="marker"></span>Vehicle information</li>
              <li><span className="marker"></span>Payment details (securely processed through payment gateways)</li>
              <li><span className="marker"></span>Service history and communications</li>
            </ul>
            <p>We use this data to provide services, improve platform quality, and ensure security. Data is stored securely and not shared with third parties except as required for service delivery or by law.</p>
          </section>

          {/* Intellectual Property */}
          <section className="legal-section">
            <div className="legal-badge">INTELLECTUAL PROPERTY</div>
            <h2>Intellectual Property Rights</h2>
            <p>All content on RepairWale including logos, designs, text, graphics, software, and trademarks are owned by RepairWale or licensed to us. Users may not copy, reproduce, distribute, or create derivative works without explicit written permission.</p>
          </section>

          {/* Account Termination */}
          <section className="legal-section">
            <div className="legal-badge">ACCOUNT MANAGEMENT</div>
            <h2>Account Termination</h2>
            <p>RepairWale reserves the right to suspend or terminate user accounts for:</p>
            <ul className="legal-list">
              <li><span className="marker"></span>Violation of these Terms and Conditions</li>
              <li><span className="marker"></span>Fraudulent activity or payment disputes</li>
              <li><span className="marker"></span>Abusive behavior towards service providers or staff</li>
              <li><span className="marker"></span>Misuse of platform features</li>
              <li><span className="marker"></span>Providing false information</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section className="legal-section">
            <div className="legal-badge">LEGAL JURISDICTION</div>
            <h2>Governing Law and Jurisdiction</h2>
            <p>These Terms and Conditions are governed by the laws of India. Any disputes arising from the use of RepairWale shall be subject to the exclusive jurisdiction of courts in [Your City/State], India.</p>
          </section>

          {/* Changes to Terms */}
          <section className="legal-section">
            <div className="legal-badge">AMENDMENTS</div>
            <h2>Changes to Terms</h2>
            <p>RepairWale reserves the right to modify these Terms and Conditions at any time. Users will be notified of significant changes via email or platform notifications. Continued use of the platform after changes constitutes acceptance of updated terms.</p>
          </section>

          {/* Contact */}
          <section className="legal-section">
            <div className="legal-badge">CONTACT</div>
            <h2>Contact Information</h2>
            <p>For questions, concerns, or support regarding these Terms and Conditions, please contact us:</p>
            <ul className="legal-list">
              <li><span className="marker"></span><strong>Email:</strong>&nbsp;support@repairwale.com</li>
              <li><span className="marker"></span><strong>Phone:</strong>&nbsp;+91-XXXX-XXXXXX</li>
              <li><span className="marker"></span><strong>Address:</strong>&nbsp;RepairWale Technologies Pvt. Ltd. [Your Business Address]</li>
            </ul>
          </section>

        </div>
        <div className="legal-accept">
          <div className="tick">OK</div>
          <h3>Acknowledgment & Acceptance</h3>
          <p>By using RepairWale, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
        </div>
      </div>
    </div>
  )
}


