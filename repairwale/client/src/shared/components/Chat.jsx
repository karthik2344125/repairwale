import React, { useEffect, useRef, useState } from 'react'
import { db, hasFirebase } from '../../firebase'
import { collection, addDoc, onSnapshot, query, orderBy, where, limit } from 'firebase/firestore'
import { io } from 'socket.io-client'

// AI Assistant Configuration
const AI_RESPONSES = {
  greeting: [
    "Hello! 👋 I'm RepairWale AI Assistant. How can I help you today?",
    "Hi there! I'm here to assist you with your vehicle service needs. What can I do for you?",
    "Welcome! I'm your AI assistant. Feel free to ask me about our services, pricing, or anything else!"
  ],
  
  pricing: {
    keywords: ['price', 'cost', 'how much', 'charges', 'rate', 'fee', 'expensive', 'cheap'],
    responses: [
      "Our pricing varies by service. For example:\n• Engine Tune-up: ₹1,799\n• Brake Service: ₹999\n• Oil Change: ₹1,299\nCheck the Services page for complete pricing!",
      "We offer competitive pricing! Basic services start at ₹299 (puncture repair) up to premium services like PPF coating at ₹12,999. What specific service are you interested in?"
    ]
  },
  
  services: {
    keywords: ['service', 'repair', 'fix', 'maintenance', 'what do you do', 'what services', 'help with'],
    responses: [
      "We offer comprehensive vehicle services:\n🚨 Emergency Roadside\n🔧 Scheduled Maintenance\n⚙️ Mechanical & Electrical\n🚛 Towing & Transport\n🛞 Tyres & Wheels\n💎 Body & Care\n\nWhat are you looking for?",
      "RepairWale provides everything from emergency breakdown assistance to premium body care! Our mechanics handle oil changes, brake services, AC repair, detailing, and much more. Need help with something specific?"
    ]
  },
  
  emergency: {
    keywords: ['emergency', 'urgent', 'breakdown', 'stuck', 'help now', 'asap', 'immediate', 'quick'],
    responses: [
      "🚨 Emergency assistance available! We offer:\n• Breakdown Quick Fix (30-60 mins) - ₹549\n• Flat Tyre Assist (30 mins) - ₹399\n• Battery Jump-Start (20-30 mins) - ₹299\n\nBook now for immediate dispatch!",
      "Don't worry, we've got you covered! 🚗💨 Our emergency services include roadside repairs, jump-starts, fuel delivery, and towing. Response time: 30-90 minutes. What's your issue?"
    ]
  },
  
  location: {
    keywords: ['where', 'location', 'area', 'come to', 'service area', 'available in', 'nearby'],
    responses: [
      "We serve all major areas! Our mechanics come to your location - home, office, or roadside. Just share your address when booking. 📍",
      "RepairWale operates across the city! We provide doorstep service anywhere within the metro area. No need to visit a workshop - we come to you! 🚗"
    ]
  },
  
  booking: {
    keywords: ['book', 'schedule', 'appointment', 'reserve', 'order', 'how to book', 'process'],
    responses: [
      "Booking is super easy! 📱\n1. Browse services & add to cart\n2. Proceed to checkout\n3. Choose date/time & location\n4. Confirm booking\n\nYou'll get live tracking once assigned!",
      "To book a service:\n✓ Select your needed services\n✓ Add to cart\n✓ Fill in vehicle & location details\n✓ Choose your preferred time slot\n✓ Pay & confirm!\n\nWant me to guide you?"
    ]
  },
  
  payment: {
    keywords: ['payment', 'pay', 'cash', 'card', 'upi', 'online', 'razorpay', 'refund'],
    responses: [
      "We accept multiple payment methods:\n💳 Credit/Debit Cards\n📱 UPI (GPay, PhonePe, Paytm)\n💵 Cash on Service\n🔒 Secure Razorpay gateway\n\nAll transactions are safe & encrypted!",
      "Payment is flexible! You can pay online via UPI/Cards or cash after service completion. We use secure Razorpay for online payments. Full refund available for cancellations! 💰"
    ]
  },
  
  tracking: {
    keywords: ['track', 'status', 'where is', 'eta', 'mechanic location', 'when will', 'arrive'],
    responses: [
      "You can track your service in real-time! 📍\n• Live mechanic location\n• Estimated arrival time\n• Service status updates\n• In-app chat with mechanic\n\nCheck the Tracking page after booking!",
      "Live tracking is included FREE! Once a mechanic is assigned, you'll see their location, ETA, and can chat directly. You'll get notifications at every step! 🚗💨"
    ]
  },
  
  quality: {
    keywords: ['quality', 'guarantee', 'warranty', 'certified', 'trusted', 'genuine', 'oem', 'parts'],
    responses: [
      "We ensure top quality! ✨\n✓ Certified mechanics only\n✓ OEM & branded parts\n✓ Service warranty included\n✓ Quality inspections\n✓ 100% satisfaction guarantee\n\nYour vehicle is in safe hands!",
      "Quality is our priority! All mechanics are verified & trained. We use genuine parts, provide service warranties, and maintain high standards. Check our customer reviews! ⭐⭐⭐⭐⭐"
    ]
  },
  
  help: {
    keywords: ['help', 'support', 'contact', 'talk to', 'human', 'agent', 'customer care'],
    responses: [
      "Need human assistance? 👨‍💼\nOur support team is available:\n📞 Call: 1800-REPAIR-NOW\n✉️ Email: support@repairwale.com\n💬 Live Chat: Available 24/7\n\nHow else can I help you?",
      "I'm here to help! You can also reach our human support team via phone, email, or request a callback. What specific assistance do you need?"
    ]
  },
  
  reviews: {
    keywords: ['review', 'rating', 'feedback', 'testimonial', 'experience', 'trustworthy'],
    responses: [
      "We're proud of our 4.8⭐ rating! Customers love our quick service, transparent pricing, and professional mechanics. Check reviews on our Services page! 🌟",
      "Our customers speak for us! We have 1000+ verified reviews with an average 4.7⭐ rating. Quality service and customer satisfaction are our top priorities! 💯"
    ]
  },
  
  default: [
    "I'm not sure I understand. Could you rephrase that? I can help with services, pricing, bookings, emergency assistance, and more! 🤔",
    "Hmm, I didn't quite get that. Try asking about:\n• Available services\n• Pricing & payment\n• Booking process\n• Emergency help\n• Service tracking\n\nWhat would you like to know?",
    "I'm here to help! Ask me about our services, how to book, pricing, or anything else related to RepairWale. What can I assist you with? 😊"
  ]
}

// AI Helper Function
function getAIResponse(userMessage) {
  const message = userMessage.toLowerCase().trim()
  
  // Check for greetings
  const greetings = ['hi', 'hello', 'hey', 'good morning', 'good evening', 'namaste', 'hola']
  if (greetings.some(g => message === g || message.startsWith(g + ' '))) {
    return AI_RESPONSES.greeting[Math.floor(Math.random() * AI_RESPONSES.greeting.length)]
  }
  
  // Check each category
  for (const [category, config] of Object.entries(AI_RESPONSES)) {
    if (category === 'greeting' || category === 'default') continue
    
    if (config.keywords.some(keyword => message.includes(keyword))) {
      return config.responses[Math.floor(Math.random() * config.responses.length)]
    }
  }
  
  // Default response
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)]
}

export default function Chat({ requestId = null, serviceName = 'Support Chat' }) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('connecting')
  const [userData, setUserData] = useState({ name: '', role: '' })
  const [aiEnabled, setAiEnabled] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)
  const typingTimeoutRef = useRef(null)
  const aiTimeoutRef = useRef(null)
  const room = requestId ? `req:${requestId}` : 'public'

  const quickSuggestions = [
    '💰 Show me pricing',
    '🚨 Emergency help',
    '📅 How to book?',
    '📍 Track my service',
    '⭐ Customer reviews'
  ]

  // Load user data
  useEffect(() => {
    const name = localStorage.getItem('rw_name') || 'Guest'
    const role = localStorage.getItem('rw_role') || 'customer'
    setUserData({ name, role })
    
    // Send welcome message from AI
    if (aiEnabled && messages.length === 0) {
      setTimeout(() => {
        addAIMessage("Hello! 👋 I'm RepairWale AI Assistant. How can I help you today?")
      }, 500)
    }
  }, [])

  // Initialize chat
  useEffect(() => {
    if (hasFirebase && db) {
      let mq
      if (requestId) {
        mq = query(collection(db, 'messages'), where('requestId', '==', requestId), orderBy('ts', 'asc'), limit(50))
      } else {
        mq = query(collection(db, 'messages'), where('requestId', '==', null), orderBy('ts', 'asc'), limit(50))
      }
      
      const unsub = onSnapshot(mq, snap => {
        const msgs = []
        snap.forEach(d => msgs.push({ id: d.id, ...d.data() }))
        setMessages(msgs)
        setConnectionStatus('connected')
      })
      
      return () => unsub()
    }

    // Socket.io fallback
    const socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })
    
    socketRef.current = socket

    socket.on('connect', () => {
      setConnectionStatus('connected')
      socket.emit('join', room)
    })

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected')
    })

    socket.on('message', (payload) => {
      setMessages(prev => [...prev, { 
        id: `${payload.ts}-${Math.random().toString(36).slice(2)}`, 
        ...payload,
        read: false
      }])
    })

    socket.on('user:typing', (data) => {
      if (data.user !== userData.name) {
        setIsTyping(true)
        setTimeout(() => setIsTyping(false), 2000)
      }
    })

    return () => {
      try { socket.emit('leave', room) } catch {}
      socket.disconnect()
    }
  }, [requestId, userData.name])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Add AI message helper
  function addAIMessage(text) {
    const aiMessage = {
      id: `ai-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      from: '🤖 AI Assistant',
      role: 'ai',
      text: text,
      ts: Date.now(),
      avatar: '🤖',
      isAI: true
    }
    setMessages(prev => [...prev, aiMessage])
  }

  // Trigger AI response
  function triggerAIResponse(userMessage) {
    if (!aiEnabled) return
    
    setIsTyping(true)
    
    clearTimeout(aiTimeoutRef.current)
    aiTimeoutRef.current = setTimeout(() => {
      const aiResponse = getAIResponse(userMessage)
      setIsTyping(false)
      addAIMessage(aiResponse)
    }, 1000 + Math.random() * 1000) // Random delay 1-2 seconds for realism
  }

  // Send message
  async function send() {
    if (!text.trim()) return
    
    setIsLoading(true)
    
    try {
      const messageData = {
        from: userData.name,
        role: userData.role,
        text: text.trim(),
        ts: Date.now(),
        requestId: requestId || null,
        read: false,
        avatar: userData.role === 'mechanic' ? '🔧' : '👤'
      }

      if (hasFirebase && db) {
        await addDoc(collection(db, 'messages'), messageData)
      } else if (socketRef.current) {
        socketRef.current.emit('message', { room, ...messageData })
      }
      
      setText('')
      setIsLoading(false)
      
      // Trigger AI response if enabled and not in request-specific chat
      if (aiEnabled && !requestId) {
        triggerAIResponse(text.trim())
      }
    } catch (e) {
      console.error('Message send failed:', e)
      setIsLoading(false)
    }
  }

  // Handle typing indicator
  function handleTyping(value) {
    setText(value)
    
    if (socketRef.current) {
      socketRef.current.emit('typing', { room, user: userData.name })
    }

    clearTimeout(typingTimeoutRef.current)
    typingTimeoutRef.current = setTimeout(() => {
      if (socketRef.current) {
        socketRef.current.emit('stop-typing', { room })
      }
    }, 1000)
  }

  // Format timestamp
  function formatTime(ts) {
    const date = new Date(ts)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  // Get role badge color
  function getRoleColor(role) {
    switch(role) {
      case 'mechanic': return '#f59e0b'
      case 'customer': return '#06b6d4'
      case 'ai': return '#10b981'
      default: return '#6b7280'
    }
  }

  // Get role badge label
  function getRoleLabel(role) {
    switch(role) {
      case 'mechanic': return '🔧 Mechanic'
      case 'customer': return '👤 Customer'
      case 'ai': return '🤖 AI'
      default: return '❓ User'
    }
  }

  // Handle suggestion click
  function handleSuggestionClick(suggestion) {
    setText(suggestion.replace(/^[^\s]+ /, '')) // Remove emoji
    setShowSuggestions(false)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--surface)',
      borderRadius: 16,
      border: '1px solid var(--border)',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        borderBottom: '2px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: 16, fontWeight: 800, color: '#fff' }}>
            💬 {serviceName}
          </h3>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: connectionStatus === 'connected' ? '#10b981' : '#ef4444'
            }} />
            {connectionStatus === 'connected' ? '🟢 Connected' : '🔴 Connecting...'}
            {aiEnabled && <span style={{ marginLeft: 8 }}>• 🤖 AI Enabled</span>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={() => setAiEnabled(!aiEnabled)}
            style={{
              background: aiEnabled ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.2)',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 600,
              color: '#fff',
              border: `1px solid ${aiEnabled ? '#10b981' : 'rgba(255,255,255,0.3)'}`,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            title={aiEnabled ? 'AI Assistant ON' : 'AI Assistant OFF'}
          >
            🤖 AI {aiEnabled ? 'ON' : 'OFF'}
          </button>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            {messages.length} messages
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        scrollBehavior: 'smooth'
      }}>
        {messages.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
            <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 16, color: 'var(--text)' }}>No messages yet</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 24 }}>Start the conversation</div>
            
            {/* Quick Suggestions when empty */}
            {aiEnabled && (
              <div style={{ width: '100%', maxWidth: 400 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-light)', marginBottom: 12 }}>
                  💡 Quick Questions
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                  {quickSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{
                        background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
                        border: '1.5px solid var(--accent)',
                        padding: '8px 16px',
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 600,
                        color: 'var(--accent)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'var(--accent)';
                        e.target.style.color = '#fff';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))';
                        e.target.style.color = 'var(--accent)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isCurrentUser = msg.from === userData.name
            const showAvatar = idx === 0 || messages[idx - 1]?.from !== msg.from
            
            return (
              <div key={msg.id} style={{
                display: 'flex',
                justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                gap: 8,
                animation: 'fadeIn 0.3s ease-in'
              }}>
                {!isCurrentUser && showAvatar && (
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: getRoleColor(msg.role),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0
                  }}>
                    {msg.avatar || '👤'}
                  </div>
                )}
                {!isCurrentUser && !showAvatar && <div style={{ width: 32 }} />}
                
                <div style={{
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4
                }}>
                  {showAvatar && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--text-secondary)'
                    }}>
                      <span>{msg.from}</span>
                      <span style={{
                        background: getRoleColor(msg.role),
                        color: '#fff',
                        padding: '2px 6px',
                        borderRadius: 4,
                        fontSize: 10,
                        fontWeight: 600
                      }}>
                        {getRoleLabel(msg.role).split(' ')[0]}
                      </span>
                      <span>{formatTime(msg.ts)}</span>
                    </div>
                  )}
                  
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: 12,
                    background: msg.role === 'ai' ? '#10b981' : (isCurrentUser ? '#3b82f6' : 'var(--bg)'),
                    color: msg.role === 'ai' ? '#fff' : (isCurrentUser ? '#fff' : 'var(--text)'),
                    border: (isCurrentUser || msg.role === 'ai') ? 'none' : '1px solid var(--border)',
                    wordBreak: 'break-word',
                    lineHeight: 1.4,
                    fontSize: 13,
                    boxShadow: msg.role === 'ai' ? '0 4px 12px rgba(16,185,129,0.3)' : (isCurrentUser ? '0 4px 12px rgba(59,130,246,0.3)' : 'none')
                  }}>
                    {msg.text}
                  </div>
                </div>
              </div>
            )
          })
        )}
        
        {isTyping && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            color: 'var(--text-secondary)',
            fontStyle: 'italic'
          }}>
            <span>💭</span>
            <span>Someone is typing</span>
            <span style={{ animation: 'blink 1.4s infinite' }}>•••</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions Bar - Shown when there are messages and AI enabled */}
      {messages.length > 0 && aiEnabled && (
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-secondary)'
        }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
            {quickSuggestions.slice(0, 3).map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  padding: '6px 12px',
                  borderRadius: 16,
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text-light)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.color = 'var(--text-light)';
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        display: 'flex',
        gap: 10
      }}>
        <input
          value={text}
          onChange={e => handleTyping(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Type your message... (Enter to send)"
          disabled={connectionStatus !== 'connected' || isLoading}
          style={{
            flex: 1,
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text)',
            fontSize: 13,
            fontFamily: 'inherit',
            transition: 'all 0.2s',
            opacity: connectionStatus !== 'connected' ? 0.6 : 1
          }}
          onFocus={e => e.currentTarget.style.borderColor = '#3b82f6'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
        />
        
        <button
          onClick={send}
          disabled={!text.trim() || isLoading || connectionStatus !== 'connected'}
          style={{
            padding: '12px 20px',
            borderRadius: 10,
            border: 'none',
            background: text.trim() && connectionStatus === 'connected' ? '#3b82f6' : '#9ca3af',
            color: '#fff',
            fontWeight: 700,
            cursor: text.trim() && connectionStatus === 'connected' ? 'pointer' : 'not-allowed',
            fontSize: 13,
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
          onMouseEnter={e => {
            if (text.trim() && connectionStatus === 'connected') {
              e.currentTarget.style.background = '#2563eb'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={e => {
            if (text.trim() && connectionStatus === 'connected') {
              e.currentTarget.style.background = '#3b82f6'
              e.currentTarget.style.transform = 'translateY(0)'
            }
          }}
        >
          <span>{isLoading ? '⏳' : '✈️'}</span>
          <span>{isLoading ? 'Sending...' : 'Send'}</span>
        </button>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 20% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
