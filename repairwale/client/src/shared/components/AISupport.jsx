import React, { useState, useRef, useEffect } from 'react'

export default function AISupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Hello! 👋 I\'m RepairWale Support AI. How can I help you today?', timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
      @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes pulse { 0%, 100% { box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4); } 50% { box-shadow: 0 8px 24px rgba(16, 185, 129, 0.8); } }
      .ai-support-button { animation: pulse 2s infinite; }
      .ai-support-modal { animation: slideUp 0.3s ease-out; }
      .ai-message { animation: fadeIn 0.3s ease-in; }
    `
    document.head.appendChild(styleSheet)
    return () => document.head.removeChild(styleSheet)
  }, [])

  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()
    if (['price', 'cost', 'how much', 'charges', 'rate', 'fee'].some(k => msg.includes(k))) {
      return "💰 Pricing:\n• Emergency: ₹299-549\n• Oil Change: ₹1,299\n• Brake: ₹999\n• Tyres: ₹499-2,999\n• AC: ₹1,999"
    }
    if (['service', 'repair', 'fix', 'maintenance'].some(k => msg.includes(k))) {
      return "🔧 Services:\n✓ Emergency Roadside\n✓ Maintenance\n✓ Repairs\n✓ Tyres & Wheels\n✓ Body Care\n✓ Towing"
    }
    if (['emergency', 'urgent', 'breakdown', 'stuck', 'help now'].some(k => msg.includes(k))) {
      return "🚨 Emergency Available!\n• Quick Fix: ₹549\n• Flat Tyre: ₹399\n• Jump Start: ₹299\n📞 1800-REPAIR-NOW"
    }
    if (['book', 'schedule', 'appointment', 'reserve'].some(k => msg.includes(k))) {
      return "📋 How to Book:\n1. Select Service\n2. Add to Cart\n3. Checkout\n4. Choose Time\n5. Confirm & Pay\n✨ Live Tracking included!"
    }
    if (['track', 'status', 'where is', 'eta'].some(k => msg.includes(k))) {
      return "📍 Real-Time Tracking:\n• Live Location\n• ETA\n• Status Updates\n• Chat with Mechanic"
    }
    if (['payment', 'pay', 'cash', 'card', 'upi'].some(k => msg.includes(k))) {
      return "💳 Payment:\n✓ Cards\n✓ UPI\n✓ Wallets\n✓ Cash on Service\n✓ 100% Secure"
    }
    if (['contact', 'support', 'help', 'talk'].some(k => msg.includes(k))) {
      return "📞 Contact:\n☎️ 1800-REPAIR-NOW\n📧 support@repairwale.com\n💬 24/7 Chat"
    }
    if (['hi', 'hello', 'hey'].some(k => msg.includes(k))) {
      return "👋 Hi! I can help with:\n💰 Pricing\n🔧 Services\n📋 Booking\n🚨 Emergency\n📞 Support"
    }
    return "🤖 I'm your AI assistant!\nAsk about Services, Pricing, Booking, Tracking, or Emergency Help!"
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = { id: messages.length + 1, role: 'user', text: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    const aiResponse = getAIResponse(input)
    const aiMsg = { id: messages.length + 2, role: 'ai', text: aiResponse, timestamp: new Date() }
    setMessages(prev => [...prev, aiMsg])
    setIsLoading(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="ai-support-button"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
          zIndex: 9999,
          outline: 'none',
          padding: 0
        }}
        title="AI Support Chat"
      >
        💬
      </button>
    )
  }

  return (
    <div className="ai-support-modal" style={{
      position: 'fixed',
      bottom: '110px',
      right: '24px',
      width: '420px',
      height: '600px',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      borderRadius: '16px',
      border: '2px solid rgba(16, 185, 129, 0.3)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 9999,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
          <span style={{ fontSize: '24px' }}>🤖</span>
          <div>
            <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '700' }}>Support AI</h3>
            <p style={{ margin: '0', fontSize: '12px', opacity: 0.9 }}>Always here to help</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            outline: 'none'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        backgroundColor: 'rgba(15, 23, 42, 0.5)'
      }}>
        {messages.map(msg => (
          <div key={msg.id} className="ai-message" style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              maxWidth: '85%',
              padding: '12px 16px',
              borderRadius: '12px',
              background: msg.role === 'user' ? '#3b82f6' : 'rgba(16, 185, 129, 0.15)',
              border: `1px solid ${msg.role === 'user' ? '#3b82f6' : 'rgba(16, 185, 129, 0.3)'}`,
              color: msg.role === 'user' ? '#fff' : '#e5e7eb',
              fontSize: '13px',
              lineHeight: '1.5',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && <div style={{ color: '#10b981', fontSize: '12px' }}>Thinking •••</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid rgba(96, 165, 250, 0.1)',
        display: 'flex',
        gap: '8px',
        background: 'rgba(0,0,0,0.3)',
        flexShrink: 0
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          placeholder="Type your question..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid rgba(96, 165, 250, 0.2)',
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#e5e7eb',
            fontSize: '13px',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(96, 165, 250, 0.2)'}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          style={{
            padding: '10px 14px',
            background: (input.trim() && !isLoading) ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(107, 114, 128, 0.5)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            cursor: (input.trim() && !isLoading) ? 'pointer' : 'not-allowed',
            fontWeight: '600',
            fontSize: '14px',
            outline: 'none'
          }}
          onMouseEnter={(e) => { if (input.trim() && !isLoading) e.target.style.transform = 'translateY(-2px)' }}
          onMouseLeave={(e) => { if (input.trim() && !isLoading) e.target.style.transform = 'translateY(0)' }}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
