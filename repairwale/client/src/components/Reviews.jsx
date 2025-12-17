import React, { useState, useEffect } from 'react'

export default function Reviews({ serviceId, serviceName }) {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadReviews()
  }, [serviceId])

  const loadReviews = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('rw_reviews') || '{}')
      setReviews(stored[serviceId] || [])
    } catch {}
  }

  const saveReview = () => {
    if (!newReview.comment.trim()) return
    
    setLoading(true)
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('rw_reviews') || '{}')
        const serviceReviews = stored[serviceId] || []
        const review = {
          id: `REV-${Date.now()}`,
          rating: newReview.rating,
          comment: newReview.comment,
          author: 'Customer',
          date: new Date().toLocaleDateString(),
          verified: true
        }
        serviceReviews.unshift(review)
        stored[serviceId] = serviceReviews
        localStorage.setItem('rw_reviews', JSON.stringify(stored))
        setReviews(serviceReviews)
        setNewReview({ rating: 5, comment: '' })
        setShowForm(false)
      } catch {}
      setLoading(false)
    }, 500)
  }

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0

  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  }

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden' }}>
      {/* Rating Summary */}
      <div style={{ 
        padding: 20, 
        background: 'rgba(96,165,250,0.08)', 
        border: '1px solid rgba(96,165,250,0.2)',
        marginBottom: 16
      }}>
        <h4 style={{ margin: '0 0 16px 0' }}>⭐ Customer Reviews</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 16 }}>
          {/* Rating Circle */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#60a5fa' }}>
              {avgRating}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </div>
            <div style={{ fontSize: 12, color: '#fbbf24', marginTop: 8 }}>
              {'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}
            </div>
          </div>

          {/* Rating Distribution */}
          <div>
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, marginBottom: 6 }}>
                <span style={{ minWidth: 20 }}>{stars}★</span>
                <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    background: '#fbbf24',
                    width: `${reviews.length ? (ratingDistribution[stars] / reviews.length) * 100 : 0}%`,
                    transition: 'width 0.3s'
                  }} />
                </div>
                <span style={{ minWidth: 30, textAlign: 'right', color: 'var(--text-secondary)' }}>
                  {ratingDistribution[stars]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 8,
              border: 'none',
              background: '#60a5fa',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 14,
              transition: 'all 0.2s'
            }}
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Write Review Form */}
      {showForm && (
        <div style={{
          padding: 20,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          marginBottom: 16
        }}>
          <h4 style={{ margin: '0 0 16px 0' }}>Share Your Experience</h4>
          
          {/* Rating Selector */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 8 }}>
              Rating
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  style={{
                    fontSize: 28,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    opacity: star <= newReview.rating ? 1 : 0.3,
                    transition: 'opacity 0.2s'
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 8 }}>
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Share your experience with this service..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.12)',
                background: '#101010',
                color: '#fff',
                fontSize: 13,
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: 80
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={saveReview}
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 8,
                border: 'none',
                background: '#10b981',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 13,
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Posting...' : 'Post Review'}
            </button>
            <button
              onClick={() => {
                setShowForm(false)
                setNewReview({ rating: 5, comment: '' })
              }}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div style={{ display: 'grid', gap: 12 }}>
        {reviews.length === 0 ? (
          <div style={{
            padding: 24,
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: 14
          }}>
            No reviews yet. Be the first to review!
          </div>
        ) : (
          reviews.map(review => (
            <div
              key={review.id}
              style={{
                padding: 16,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>
                    {review.author}
                    {review.verified && <span style={{ fontSize: 11, color: '#10b981', marginLeft: 8 }}>✓ Verified</span>}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                    {review.date}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#fbbf24' }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
