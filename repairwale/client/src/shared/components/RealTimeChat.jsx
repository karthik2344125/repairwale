import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { connectRealtimeWithFallback } from '../services/realtime'

export default function RealTimeChat({ orderId, userRole = 'customer', mechanicName = 'Mechanic' }) {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)
  const typingTimeoutRef = useRef(null)
  const currentUser = JSON.parse(localStorage.getItem('repairwale_user') || '{}')
  const userName = currentUser.fullName || (userRole === 'customer' ? 'Customer' : mechanicName)

  useEffect(() => {
    const { socket, disconnect } = connectRealtimeWithFallback({
      options: {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      }
    })
    
    socketRef.current = socket

    socket.on('connect', () => {
      console.log('... Chat connected')
      setIsConnected(true)
      socket.emit('join-chat', { orderId, userRole, userName })
    })

    socket.on('disconnect', () => {
      console.log(' Chat disconnected')
      setIsConnected(false)
    })

    socket.on('chat-message', (msg) => {
      setMessages(prev => [...prev, msg])
      if (isMinimized && msg.userName !== userName) {
        setUnreadCount(prev => prev + 1)
      }
      scrollToBottom()
    })

    socket.on('user-typing', ({ userName: typingUser }) => {
      if (typingUser !== userName) {
        setIsTyping(true)
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000)
      }
    })

    socket.on('chat-history', (history) => {
      setMessages(history)
      scrollToBottom()
    })

    return () => {
      try { socket.emit('leave-chat', { orderId }) } catch {}
      disconnect()
      clearTimeout(typingTimeoutRef.current)
    }
  }, [orderId])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSend = () => {
    if (!inputText.trim() || !isConnected) return

    const message = {
      orderId,
      text: inputText.trim(),
      userName,
      userRole,
      timestamp: Date.now()
    }

    socketRef.current.emit('send-message', message)
    setInputText('')
  }

  const handleTyping = (e) => {
    setInputText(e.target.value)
    if (socketRef.current && e.target.value) {
      socketRef.current.emit('typing', { orderId, userName })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
    if (isMinimized) {
      setUnreadCount(0)
      scrollToBottom()
    }
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      width: isMinimized ? 320 : 380,
      maxHeight: isMinimized ? 60 : 600,
      background: 'var(--surface)',
      border: '2px solid var(--border)',
      borderRadius: 16,
      boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #0f172a 0%, #0B1F3B 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        userSelect: 'none'
      }} onClick={toggleMinimize}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: isConnected ? '#FFFFFF' : '#1f3f6b',
            boxShadow: `0 0 8px ${isConnected ? '#FFFFFF' : '#1f3f6b'}`,
            animation: isConnected ? 'pulse 2s infinite' : 'none'
          }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}> Live Chat</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>
              {isConnected ? `with ${userRole === 'customer' ? mechanicName : 'Customer'}` : 'Connecting...'}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {unreadCount > 0 && !isMinimized && (
            <div style={{
              background: '#FFFFFF',
              color: '#fff',
              fontSize: 11,
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: 12,
              minWidth: 20,
              textAlign: 'center'
            }}>
              {unreadCount}
            </div>
          )}
          <div style={{ fontSize: 20 }}>{isMinimized ? '-' : '-'}</div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            background: 'var(--bg)',
            minHeight: 300,
            maxHeight: 400
          }}>
            {messages.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: 'var(--text-muted)',
                fontSize: 14
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}></div>
                <div>No messages yet</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Start the conversation!</div>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isOwn = msg.userName === userName
                return (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isOwn ? 'flex-end' : 'flex-start',
                    gap: 4
                  }}>
                    {!isOwn && (
                      <div style={{
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        paddingLeft: 8
                      }}>
                        {msg.userName}
                      </div>
                    )}
                    <div style={{
                      background: isOwn 
                        ? 'linear-gradient(135deg, #0B1F3B 0%, #FFFFFF 100%)'
                        : 'var(--surface)',
                      color: isOwn ? '#ffffff' : 'var(--text)',
                      padding: '10px 14px',
                      borderRadius: isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      maxWidth: '75%',
                      wordBreak: 'break-word',
                      border: isOwn ? 'none' : '1px solid var(--border)',
                      boxShadow: isOwn ? '0 2px 8px rgba(29,99,255,0.3)' : 'none'
                    }}>
                      <div style={{ fontSize: 14, lineHeight: 1.5 }}>{msg.text}</div>
                      <div style={{
                        fontSize: 10,
                        marginTop: 4,
                        opacity: 0.7,
                        textAlign: 'right'
                      }}>
                        {new Date(msg.timestamp).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
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
                gap: 8,
                paddingLeft: 8,
                color: 'var(--text-muted)',
                fontSize: 13
              }}>
                <div style={{
                  display: 'flex',
                  gap: 3,
                  padding: '8px 12px',
                  background: 'var(--surface)',
                  borderRadius: 16,
                  border: '1px solid var(--border)'
                }}>
                  <span style={{ animation: 'bounce 1.4s infinite' }}>.</span>
                  <span style={{ animation: 'bounce 1.4s infinite 0.2s' }}>.</span>
                  <span style={{ animation: 'bounce 1.4s infinite 0.4s' }}>.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: 16,
            borderTop: '1px solid var(--border)',
            background: 'var(--surface)'
          }}>
            {!isConnected && (
              <div style={{
                padding: '8px 12px',
                background: 'rgba(255,206,50,0.1)',
                border: '1px solid rgba(255,206,50,0.3)',
                borderRadius: 8,
                fontSize: 12,
                color: '#FFFFFF',
                marginBottom: 12,
                textAlign: 'center'
              }}>
                Connecting to chat server...
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
              <textarea
                value={inputText}
                onChange={handleTyping}
                onKeyPress={handleKeyPress}
                placeholder={isConnected ? "Type a message..." : "Connecting..."}
                disabled={!isConnected}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  fontSize: 14,
                  resize: 'none',
                  minHeight: 40,
                  maxHeight: 80,
                  fontFamily: 'inherit'
                }}
                rows={1}
              />
              <Button
                variant="primary"
                onClick={handleSend}
                disabled={!inputText.trim() || !isConnected}
                style={{
                  padding: '10px 16px',
                  minWidth: 60,
                  height: 40
                }}
              >
                Send
              </Button>
            </div>
            <div style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              marginTop: 8,
              textAlign: 'center'
            }}>
              Press Enter to send  Shift+Enter for new line
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(1); opacity: 0.5; }
          40% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}


