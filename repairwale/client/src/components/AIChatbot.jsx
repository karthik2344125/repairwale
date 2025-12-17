import React, { useState, useEffect, useRef } from 'react'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: '👋 Hi! I\'m your RepairWale AI Assistant. I can help you with:\n\n• Service recommendations\n• Booking assistance\n• Troubleshooting issues\n• Pricing information\n• General questions\n\nHow can I help you today?', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const getAIResponse = (query) => {
    const q = query.toLowerCase()
    
    // Emergency keywords
    if (q.includes('emergency') || q.includes('urgent') || q.includes('breakdown') || q.includes('stuck')) {
      return '🚨 For immediate emergency assistance:\n\n1. Go to the Map page to find nearby mechanics\n2. Call our 24/7 helpline: 1800-REPAIR\n3. Or click "Emergency Roadside" in Services\n\nAvg response time: 15-30 mins'
    }
    
    // Pricing
    if (q.includes('price') || q.includes('cost') || q.includes('charge') || q.includes('fee')) {
      return '💰 Our pricing is transparent with no hidden fees:\n\n• Emergency services: ₹299-₹1,299\n• Maintenance: ₹899-₹2,299\n• Towing: ₹1,199+ (based on distance)\n\nView full pricing in the Services page. All quotes include labor + materials upfront!'
    }
    
    // Services
    if (q.includes('service') || q.includes('offer') || q.includes('provide')) {
      return '🛠️ We offer:\n\n• Emergency roadside (flat tire, battery, fuel)\n• Scheduled maintenance (oil, filters, AC)\n• Mechanical repairs (brakes, engine, clutch)\n• Towing & transport\n• Tyres & wheels\n• Body care & detailing\n\nCheck the Services page for the complete catalog!'
    }
    
    // Battery
    if (q.includes('battery') || q.includes('jump') || q.includes('dead')) {
      return '🔋 Battery issues? We can help!\n\n• Jump-start: ₹299 (20-30 mins)\n• Battery replacement: ₹499 + battery cost\n• Free diagnostics included\n\nBook "Battery Jump-Start" or "Battery Replacement" from Emergency Roadside services.'
    }
    
    // Tyre/Tire
    if (q.includes('tyre') || q.includes('tire') || q.includes('puncture') || q.includes('flat')) {
      return '🚗 Tyre services available:\n\n• Flat tyre assist: ₹399 (30 mins)\n• Tyre replacement: ₹1,299+\n• Wheel alignment: ₹699\n• Wheel balancing: ₹599\n\nFind these in Emergency or Tyres & Wheels sections!'
    }
    
    // Booking
    if (q.includes('book') || q.includes('schedule') || q.includes('appointment')) {
      return '📅 To book a service:\n\n1. Browse services on the Services page\n2. Add items to cart\n3. Proceed to checkout\n4. Enter your details & location\n5. Confirm & pay\n\nYou\'ll get live tracking once a mechanic is assigned!'
    }
    
    // Payment
    if (q.includes('payment') || q.includes('pay') || q.includes('card') || q.includes('upi')) {
      return '💳 We accept:\n\n• Credit/Debit cards\n• UPI (GPay, PhonePe, Paytm)\n• Net banking\n• Wallets\n\nAll payments are secured with bank-grade encryption. You can pay after service completion!'
    }
    
    // Tracking
    if (q.includes('track') || q.includes('location') || q.includes('eta')) {
      return '🗺️ Live tracking features:\n\n• Real-time mechanic location on map\n• Accurate ETA updates\n• Direct in-app chat\n• Service status notifications\n\nOnce your booking is confirmed, you\'ll see live updates on the Map page!'
    }
    
    // Hours/Availability
    if (q.includes('hour') || q.includes('available') || q.includes('open') || q.includes('24/7') || q.includes('time')) {
      return '⏰ We\'re available 24/7!\n\n• Emergency services: Round-the-clock\n• Scheduled services: 6 AM - 10 PM\n• Customer support: Always available\n\nYou can book anytime through the app!'
    }
    
    // Error/Problem
    if (q.includes('error') || q.includes('problem') || q.includes('issue') || q.includes('not working') || q.includes('broken')) {
      return '⚠️ Having technical issues?\n\nPlease describe:\n• What you were trying to do\n• Error message (if any)\n• Which page you\'re on\n\nOr contact support:\n📧 support@repairwale.com\n📞 1800-REPAIR'
    }
    
    // Default response
    return '🤔 I\'m not sure I understand. I can help with:\n\n• Service information\n• Booking & scheduling\n• Pricing & payments\n• Emergency assistance\n• Technical support\n\nCould you rephrase your question or choose a topic above?'
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getAIResponse(input),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 800 + Math.random() * 600)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <style>{`
        .ai-chat-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .ai-chat-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border: none;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .ai-chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.5);
        }
        
        .ai-chat-button.open {
          transform: rotate(180deg);
        }
        
        .ai-chat-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0; }
        }
        
        .ai-chat-window {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 380px;
          height: 580px;
          background: #0f0f0f;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .ai-chat-header {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          padding: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .ai-chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        
        .ai-chat-info {
          flex: 1;
        }
        
        .ai-chat-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }
        
        .ai-chat-status {
          font-size: 12px;
          color: #94a3b8;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .ai-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          animation: blink 2s ease-in-out infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        .ai-chat-close {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.2s;
        }
        
        .ai-chat-close:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        
        .ai-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .ai-chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        
        .ai-chat-messages::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        
        .ai-message {
          display: flex;
          gap: 8px;
          animation: messageSlide 0.3s ease-out;
        }
        
        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .ai-message.user {
          flex-direction: row-reverse;
        }
        
        .ai-message-bubble {
          max-width: 75%;
          padding: 12px 14px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        
        .ai-message.bot .ai-message-bubble {
          background: rgba(255, 255, 255, 0.08);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom-left-radius: 4px;
        }
        
        .ai-message.user .ai-message-bubble {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        
        .ai-message-time {
          font-size: 10px;
          color: #64748b;
          margin-top: 4px;
          padding: 0 4px;
        }
        
        .ai-typing {
          display: flex;
          gap: 4px;
          padding: 12px 14px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          border-bottom-left-radius: 4px;
          width: fit-content;
        }
        
        .ai-typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #64748b;
          animation: typingBounce 1.4s ease-in-out infinite;
        }
        
        .ai-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .ai-typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }
        
        .ai-chat-input-area {
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: #0a0a0a;
        }
        
        .ai-chat-input-wrapper {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        
        .ai-chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 12px 14px;
          color: #fff;
          font-size: 14px;
          resize: none;
          max-height: 100px;
          font-family: inherit;
        }
        
        .ai-chat-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: rgba(255, 255, 255, 0.08);
        }
        
        .ai-chat-input::placeholder {
          color: #64748b;
        }
        
        .ai-chat-send {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border: none;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        
        .ai-chat-send:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        
        .ai-chat-send:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }
        
        @media (max-width: 480px) {
          .ai-chat-window {
            width: calc(100vw - 32px);
            height: calc(100vh - 120px);
            bottom: 76px;
            right: 16px;
            left: 16px;
          }
          
          .ai-chat-widget {
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>

      <div className="ai-chat-widget">
        {!isOpen && (
          <button 
            className="ai-chat-button" 
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant"
          >
            <div className="ai-chat-pulse" />
            🤖
          </button>
        )}

        {isOpen && (
          <div className="ai-chat-window">
            <div className="ai-chat-header">
              <div className="ai-chat-avatar">🤖</div>
              <div className="ai-chat-info">
                <h3 className="ai-chat-title">AI Assistant</h3>
                <p className="ai-chat-status">
                  <span className="ai-status-dot" />
                  Online • Responds instantly
                </p>
              </div>
              <button 
                className="ai-chat-close" 
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="ai-chat-messages">
              {messages.map(msg => (
                <div key={msg.id} className={`ai-message ${msg.sender}`}>
                  <div>
                    <div className="ai-message-bubble">{msg.text}</div>
                    <div className="ai-message-time">{msg.time}</div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="ai-message bot">
                  <div className="ai-typing">
                    <div className="ai-typing-dot" />
                    <div className="ai-typing-dot" />
                    <div className="ai-typing-dot" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="ai-chat-input-area">
              <div className="ai-chat-input-wrapper">
                <textarea
                  className="ai-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  rows={1}
                  disabled={isTyping}
                />
                <button 
                  className="ai-chat-send" 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                >
                  ➤
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
