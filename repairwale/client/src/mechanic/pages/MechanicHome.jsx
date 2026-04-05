import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/context/AuthContext'
import Button from '../../shared/components/Button'
import { IconChat, IconMapPin, IconMoney } from '../../icons'
import { getMechanicRecentReviews, getMechanicWeeklyEarnings } from '../data/mechanicDemoData'

const styles = `
.mechanic-home {
  min-height: 100vh;
  background: #0b1220;
  padding: 40px 20px;
  color: #e2e8f0;
}

.mechanic-container {
  max-width: 1320px;
  margin: 0 auto;
}

.welcome-banner {
  background: linear-gradient(135deg, #111827 0%, #0f172a 100%);
  border: 1px solid #233248;
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 24px;
}

.welcome-content h1 {
  color: #f8fafc;
  font-size: 30px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.welcome-content p {
  color: #94a3b8;
  margin: 0;
  font-size: 15px;
  max-width: 760px;
}

.welcome-actions {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #0f172a;
  border: 1px solid #233248;
  border-radius: 18px;
  padding: 20px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: #334155;
}

.stat-icon {
  font-size: 32px;
  margin-bottom: 12px;
  color: #cbd5e1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 4px;
}

.stat-label {
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
}

.stat-change {
  font-size: 12px;
  margin-top: 8px;
  color: #cbd5e1;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start;
}

.card {
  background: #0f172a;
  border: 1px solid #233248;
  border-radius: 18px;
  padding: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-note {
  color: #94a3b8;
  font-size: 13px;
  margin-top: 4px;
}

.insight-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 18px;
}

.insight-chip {
  border: 1px solid #233248;
  background: #111c30;
  border-radius: 14px;
  padding: 12px;
}

.insight-chip-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #94a3b8;
}

.insight-chip-value {
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
  color: #f8fafc;
}

.earnings-chart {
  background: #111c30;
  border: 1px solid #233248;
  border-radius: 16px;
  padding: 18px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  height: 180px;
  margin-bottom: 12px;
}

.chart-bar-wrap {
  flex: 1;
  display: grid;
  align-items: end;
}

.chart-bar {
  width: 100%;
  background: linear-gradient(to top, #1e40af, #38bdf8);
  border-radius: 9999px 9999px 6px 6px;
  min-height: 14px;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: #94a3b8;
  font-size: 11px;
}

.chart-labels span {
  flex: 1;
  text-align: center;
}

.reviews-list {
  max-height: 420px;
  overflow: hidden;
  position: relative;
}

.reviews-track {
  display: grid;
  gap: 12px;
  animation: reviews-scroll 18s linear infinite;
}

.reviews-list:hover .reviews-track {
  animation-play-state: paused;
}

.review-item {
  background: #111c30;
  border: 1px solid #233248;
  border-radius: 16px;
  padding: 16px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
}

.reviewer-name {
  color: #f8fafc;
  font-weight: 600;
  font-size: 14px;
}

.rating-stars {
  color: #fbbf24;
  font-size: 14px;
}

.review-text {
  color: #cbd5e1;
  font-size: 13px;
  line-height: 1.5;
}

.review-date {
  color: #94a3b8;
  font-size: 11px;
  margin-top: 8px;
}

.summary-strip {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 18px;
}

.summary-card {
  border: 1px solid #233248;
  background: #111c30;
  border-radius: 16px;
  padding: 14px;
}

.summary-card-label {
  color: #94a3b8;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.summary-card-value {
  color: #f8fafc;
  font-size: 18px;
  font-weight: 700;
  margin-top: 6px;
}

.summary-card-subtext {
  color: #cbd5e1;
  font-size: 12px;
  margin-top: 4px;
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .insight-row,
  .summary-strip {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .mechanic-home {
    padding: 24px 16px;
  }

  .welcome-banner {
    padding: 20px;
  }

  .welcome-content h1 {
    font-size: 24px;
  }

  .welcome-content p {
    font-size: 14px;
  }

  .stats-grid {
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
  }

  .stat-value {
    font-size: 24px;
  }

  .card {
    padding: 20px;
  }

  .chart-bars {
    height: 150px;
  }
}

@media (max-width: 480px) {
  .mechanic-home {
    padding: 16px 12px;
  }

  .welcome-content h1 {
    font-size: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 14px;
  }

  .stat-value {
    font-size: 20px;
  }

  .card-title {
    font-size: 16px;
  }

  .chart-bars {
    height: 130px;
  }

  .chart-labels {
    font-size: 10px;
  }
}

@keyframes reviews-scroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
`

export default function MechanicHome() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const weeklyEarnings = getMechanicWeeklyEarnings()
  const recentReviews = getMechanicRecentReviews()
  const weeklyTotal = weeklyEarnings.reduce((sum, entry) => sum + entry.amount, 0)
  const maxEarning = Math.max(...weeklyEarnings.map((entry) => entry.amount), 1)
  const bestDay = weeklyEarnings.reduce((best, entry) => (entry.amount > best.amount ? entry : best), weeklyEarnings[0])
  const reviewAverage = recentReviews.length
    ? (recentReviews.reduce((sum, review) => sum + review.rating, 0) / recentReviews.length).toFixed(1)
    : '0.0'
  const averagePerDay = Math.round(weeklyTotal / Math.max(weeklyEarnings.length, 1))
  const topReview = recentReviews[0]
  const scrollingReviews = [...recentReviews, ...recentReviews]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
  }

  return (
    <div className="mechanic-home">
      <style>{styles}</style>
      <div className="mechanic-container">
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1>Welcome back, {user?.fullName || 'Mechanic'}</h1>
            <p>This dashboard focuses on weekly performance and customer feedback. The live request queue is available on the Orders page.</p>
            <div className="welcome-actions">
              <Button size="sm" onClick={() => navigate('/mechanic/orders')}>Open Orders</Button>
              <Button size="sm" variant="ghost" onClick={() => navigate('/mechanic/order-history')}>Order History</Button>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><IconMoney size={22} /></div>
            <div className="stat-value">{formatCurrency(weeklyTotal)}</div>
            <div className="stat-label">Weekly Earnings</div>
            <div className="stat-change">Across the last 7 days</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><IconMapPin size={22} /></div>
            <div className="stat-value">{bestDay?.day || 'Mon'}</div>
            <div className="stat-label">Best Day</div>
            <div className="stat-change">{formatCurrency(bestDay?.amount || 0)} in a single day</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><IconChat size={22} /></div>
            <div className="stat-value">{recentReviews.length}</div>
            <div className="stat-label">Recent Reviews</div>
            <div className="stat-change">Latest customer feedback</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">★</div>
            <div className="stat-value">{reviewAverage}</div>
            <div className="stat-label">Average Rating</div>
            <div className="stat-change">Based on the current review set</div>
          </div>
        </div>

        <div className="content-grid">
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title icon-row"><IconMoney size={18} /> Weekly Earnings</div>
                <div className="card-note">A compact summary of weekly activity.</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => navigate('/mechanic/orders')}>View Orders</Button>
            </div>

            <div className="insight-row">
              <div className="insight-chip">
                <div className="insight-chip-label">Average per day</div>
                <div className="insight-chip-value">{formatCurrency(averagePerDay)}</div>
              </div>
              <div className="insight-chip">
                <div className="insight-chip-label">Best day</div>
                <div className="insight-chip-value">{bestDay?.day || 'Mon'}</div>
              </div>
              <div className="insight-chip">
                <div className="insight-chip-label">Highest earning day</div>
                <div className="insight-chip-value">{formatCurrency(bestDay?.amount || 0)}</div>
              </div>
            </div>

            <div className="earnings-chart">
              <div className="chart-bars">
                {weeklyEarnings.map((entry) => (
                  <div key={entry.day} className="chart-bar-wrap">
                    <div
                      className="chart-bar"
                      style={{ height: `${(entry.amount / maxEarning) * 100}%` }}
                      title={`${entry.day}: ${formatCurrency(entry.amount)}`}
                    />
                  </div>
                ))}
              </div>
              <div className="chart-labels">
                {weeklyEarnings.map((entry) => (
                  <span key={entry.day}>{entry.day}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title icon-row"><IconChat size={18} /> Recent Reviews</div>
                <div className="card-note">A quick look at recent customer feedback.</div>
              </div>
              <div className="stat-change" style={{ marginTop: 0 }}>{recentReviews.length} reviews</div>
            </div>

            <div className="reviews-list">
              <div className="reviews-track">
                {scrollingReviews.map((review, index) => (
                  <div key={`${review.id}-${index}`} className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">{review.name}</span>
                      <span className="rating-stars">{'★'.repeat(review.rating)}</span>
                    </div>
                    <div className="review-text">{review.text}</div>
                    <div className="review-date">{review.date}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="summary-strip" style={{ marginTop: 18, marginBottom: 0 }}>
              <div className="summary-card">
                <div className="summary-card-label">Top review</div>
                <div className="summary-card-value">{topReview?.name || 'Customer'}</div>
                <div className="summary-card-subtext">{topReview?.text || 'No review available'}</div>
              </div>
              <div className="summary-card">
                <div className="summary-card-label">Average rating</div>
                <div className="summary-card-value">{reviewAverage}</div>
                <div className="summary-card-subtext">Based on the current review set</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}