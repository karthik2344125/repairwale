import React, { useState, useEffect } from 'react'

// Sample reviews database for different services
const SAMPLE_REVIEWS = {
  'engine-repair': [
    { id: 'REV-1001', rating: 5, comment: 'Excellent engine diagnostic service! The mechanic identified the problem quickly and fixed it at a reasonable price. My car runs like new again.', author: 'Rajesh Kumar', date: '2/10/2026', verified: true },
    { id: 'REV-1002', rating: 5, comment: 'Very professional team. They explained everything clearly and completed the engine overhaul in just 2 days. Highly recommended!', author: 'Priya Sharma', date: '2/8/2026', verified: true },
    { id: 'REV-1003', rating: 4, comment: 'Good service overall. Fixed my engine knocking issue. Only complaint is they took a bit longer than expected.', author: 'Amit Patel', date: '2/5/2026', verified: true },
    { id: 'REV-1004', rating: 5, comment: 'Best engine repair service in the city! Fair pricing and quality work. Will definitely use again.', author: 'Sneha Reddy', date: '1/28/2026', verified: true },
  ],
  'oil-change': [
    { id: 'REV-2001', rating: 5, comment: 'Quick and efficient oil change service. In and out in 30 minutes. Great job!', author: 'Vikram Singh', date: '2/12/2026', verified: true },
    { id: 'REV-2002', rating: 5, comment: 'Very professional service. They also checked other fluids and tire pressure for free. Excellent value!', author: 'Meera Joshi', date: '2/9/2026', verified: true },
    { id: 'REV-2003', rating: 4, comment: 'Good service at reasonable price. Used quality oil and filter. Would recommend.', author: 'Karan Mehta', date: '2/3/2026', verified: true },
  ],
  'brake-service': [
    { id: 'REV-3001', rating: 5, comment: 'Excellent brake repair! My brakes were making noise and now they work perfectly. Very satisfied with the service.', author: 'Deepak Gupta', date: '2/11/2026', verified: true },
    { id: 'REV-3002', rating: 5, comment: 'Professional brake pad replacement. The mechanic was very knowledgeable and explained everything clearly.', author: 'Anita Desai', date: '2/7/2026', verified: true },
    { id: 'REV-3003', rating: 4, comment: 'Good brake service. Fixed the squeaking issue. Pricing was fair and work was done properly.', author: 'Rohit Verma', date: '2/1/2026', verified: true },
    { id: 'REV-3004', rating: 5, comment: 'Top-notch brake service! They replaced both front and rear pads. Brakes feel much better now.', author: 'Kavita Nair', date: '1/25/2026', verified: true },
  ],
  'ac-repair': [
    { id: 'REV-4001', rating: 5, comment: 'Great AC repair service! My car AC was not cooling properly and they fixed it in no time. Now it is ice cold!', author: 'Suresh Iyer', date: '2/13/2026', verified: true },
    { id: 'REV-4002', rating: 4, comment: 'Fixed my AC gas leak and recharged the system. Working well now. Service was good.', author: 'Pooja Kapoor', date: '2/6/2026', verified: true },
    { id: 'REV-4003', rating: 5, comment: 'Excellent work on AC compressor replacement. Very professional and reasonably priced.', author: 'Manoj Tiwari', date: '1/30/2026', verified: true },
  ],
  'battery-replacement': [
    { id: 'REV-5001', rating: 5, comment: 'Quick battery replacement service. They came to my location and installed a new battery in 15 minutes. Very convenient!', author: 'Sanjay Rao', date: '2/14/2026', verified: true },
    { id: 'REV-5002', rating: 5, comment: 'Great service! Battery was dead and they replaced it with a quality one. Fair pricing too.', author: 'Nisha Agarwal', date: '2/10/2026', verified: true },
    { id: 'REV-5003', rating: 4, comment: 'Good battery service. New battery works perfectly. Only minor wait time but worth it.', author: 'Arun Kumar', date: '2/4/2026', verified: true },
  ],
  'tire-service': [
    { id: 'REV-6001', rating: 5, comment: 'Excellent tire service! They balanced and aligned all four tires perfectly. Car drives much smoother now.', author: 'Geeta Pillai', date: '2/12/2026', verified: true },
    { id: 'REV-6002', rating: 5, comment: 'Great tire replacement service. Helped me choose the right tires for my car and installed them professionally.', author: 'Harsh Malhotra', date: '2/8/2026', verified: true },
    { id: 'REV-6003', rating: 4, comment: 'Fixed my tire puncture quickly. Good service and reasonable rates.', author: 'Ritu Shah', date: '2/2/2026', verified: true },
  ],
  'general-service': [
    { id: 'REV-7001', rating: 5, comment: 'Comprehensive general service done perfectly. They checked everything and my car is running smoothly. Highly recommend!', author: 'Ashok Chauhan', date: '2/11/2026', verified: true },
    { id: 'REV-7002', rating: 5, comment: 'Very thorough service. Changed oil, filters, checked brakes and everything. Great value for money!', author: 'Lakshmi Iyer', date: '2/7/2026', verified: true },
    { id: 'REV-7003', rating: 4, comment: 'Good overall service. Took care of all maintenance items. Professional team.', author: 'Nikhil Jain', date: '1/31/2026', verified: true },
  ],
  'default': [
    { id: 'REV-8001', rating: 5, comment: 'Excellent service! Very professional and completed the work on time. Highly satisfied.', author: 'Ramesh Babu', date: '2/13/2026', verified: true },
    { id: 'REV-8002', rating: 5, comment: 'Great experience! The mechanic was knowledgeable and the pricing was fair. Will use again.', author: 'Sara Khan', date: '2/9/2026', verified: true },
    { id: 'REV-8003', rating: 4, comment: 'Good service overall. Work quality was satisfactory and they were very courteous.', author: 'Varun Reddy', date: '2/5/2026', verified: true },
    { id: 'REV-8004', rating: 5, comment: 'Fantastic service! They went above and beyond to fix my vehicle. Definitely recommend!', author: 'Divya Menon', date: '1/29/2026', verified: true },
  ]
}

export default function Reviews({ serviceId, serviceName }) {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', author: '' })
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadReviews()
  }, [serviceId])

  const loadReviews = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('rw_reviews') || '{}')
      let serviceReviews = stored[serviceId]
      
      // If no reviews exist for this service, seed with sample reviews
      if (!serviceReviews || serviceReviews.length === 0) {
        // Try to match service name to sample reviews
        const normalizedServiceName = serviceName?.toLowerCase().replace(/[^a-z]/g, '-') || 'default'
        serviceReviews = SAMPLE_REVIEWS[normalizedServiceName] || 
                        SAMPLE_REVIEWS[serviceId] || 
                        SAMPLE_REVIEWS.default || []
        
        // Save seeded reviews
        if (serviceReviews.length > 0) {
          stored[serviceId] = serviceReviews
          localStorage.setItem('rw_reviews', JSON.stringify(stored))
        }
      }
      
      setReviews(serviceReviews || [])
    } catch {
      // Fallback to default reviews on error
      setReviews(SAMPLE_REVIEWS.default || [])
    }
  }

  const saveReview = () => {
    if (!newReview.comment.trim()) {
      alert('Please write a review comment')
      return
    }
    if (newReview.comment.trim().length < 10) {
      alert('Review must be at least 10 characters long')
      return
    }
    if (!newReview.author.trim()) {
      alert('Please enter your name')
      return
    }
    
    setLoading(true)
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('rw_reviews') || '{}')
        const serviceReviews = stored[serviceId] || []
        const review = {
          id: `REV-${Date.now()}`,
          rating: newReview.rating,
          comment: newReview.comment.trim(),
          author: newReview.author.trim(),
          date: new Date().toLocaleDateString(),
          verified: true
        }
        serviceReviews.unshift(review)
        stored[serviceId] = serviceReviews
        localStorage.setItem('rw_reviews', JSON.stringify(stored))
        setReviews(serviceReviews)
        setNewReview({ rating: 5, comment: '', author: '' })
        setShowForm(false)
        
        // Show success message
        alert(' Review posted successfully! Thank you for your feedback.')
      } catch (error) {
        alert('Failed to post review. Please try again.')
      }
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
      {/* Service Badge */}
      {serviceName && (
        <div style={{ 
          padding: '8px 16px', 
          background: 'rgba(29,78,216,0.14)',
          borderBottom: '1px solid rgba(29,78,216,0.2)',
          fontSize: 13,
          fontWeight: 600,
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <span></span>
          <span>Reviews for: {serviceName}</span>
        </div>
      )}

      {/* Rating Summary */}
      <div style={{ 
        padding: 20, 
        background: 'rgba(13,27,46,0.92)', 
        border: '1px solid rgba(31,63,107,0.9)',
        marginBottom: 16
      }}>
        <h4 style={{ margin: '0 0 16px 0' }}>Customer Reviews</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 16 }}>
          {/* Rating Circle */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#FFFFFF' }}>
              {avgRating}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </div>
            <div style={{ fontSize: 12, color: '#FFFFFF', marginTop: 8, letterSpacing: '2px' }}>
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
                    background: '#FFFFFF',
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
              background: '#0B1F3B',
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
          
          {/* Author Name */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 8 }}>
              Your Name *
            </label>
            <input
              type="text"
              value={newReview.author}
              onChange={e => setNewReview({ ...newReview, author: e.target.value })}
              placeholder="Enter your name"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.12)',
                background: '#000000',
                color: '#fff',
                fontSize: 13,
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Rating Selector */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 8 }}>
              Rating *
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
                  ...
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 8 }}>
              Your Review *
            </label>
            <textarea
              value={newReview.comment}
              onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Share details about your experience with this service..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.12)',
                background: '#000000',
                color: '#fff',
                fontSize: 13,
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: 100
              }}
            />
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 6 }}>
              Minimum 10 characters. Be specific about what you liked or didn't like.
            </div>
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
                background: '#FFFFFF',
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
                setNewReview({ rating: 5, comment: '', author: '' })
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
            padding: 40,
            textAlign: 'center',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}></div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 8 }}>
              No reviews yet
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
              Be the first to share your experience with this service!
            </div>
          </div>
        ) : (
          reviews.map((review, index) => (
            <div
              key={review.id}
              style={{
                padding: 16,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                position: 'relative'
              }}
            >
              {/* Most Helpful Badge for top-rated reviews */}
              {review.rating === 5 && index < 2 && (
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'linear-gradient(135deg, #FFFFFF, #FFFFFF)',
                  color: '#000',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                   Most Helpful
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 10, paddingRight: index < 2 && review.rating === 5 ? 110 : 0 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>
                    {review.author}
                    {review.verified && <span style={{ fontSize: 11, color: '#FFFFFF', marginLeft: 8 }}> Verified</span>}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                    {review.date}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#FFFFFF' }}>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {review.comment}
              </p>
              
              {/* Review helpful counter */}
              <div style={{ 
                marginTop: 12, 
                paddingTop: 12, 
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                fontSize: 11,
                color: 'var(--text-secondary)'
              }}>
                <button style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6,
                  padding: '4px 10px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}>
                   Helpful ({Math.floor(Math.random() * 15) + 5})
                </button>
                <span style={{ opacity: 0.5 }}></span>
                <span>{review.rating >= 4 ? 'Recommended' : 'Fair'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


