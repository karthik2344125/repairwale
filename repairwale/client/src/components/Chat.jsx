import React, { useEffect, useRef, useState } from 'react'
import { db, hasFirebase } from '../firebase'
import { collection, addDoc, onSnapshot, query, orderBy, where } from 'firebase/firestore'
import { io } from 'socket.io-client'

export default function Chat({ requestId = null }){
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const socketRef = useRef(null)
  const room = requestId ? `req:${requestId}` : 'public'

  useEffect(() => {
    if (hasFirebase && db) {
      let mq
      if (requestId) {
        mq = query(collection(db, 'messages'), where('requestId', '==', requestId), orderBy('ts', 'asc'))
      } else {
        mq = query(collection(db, 'messages'), where('requestId', '==', null), orderBy('ts', 'asc'))
      }
      const unsub = onSnapshot(mq, snap => {
        const msgs = []
        snap.forEach(d => msgs.push({ id: d.id, ...d.data() }))
        setMessages(msgs)
      })
      return () => unsub()
    }

    // Fallback: Socket.io-based simple chat
    const socket = io()
    socketRef.current = socket
    socket.emit('join', room)
    const handler = (payload) => {
      setMessages(prev => [...prev, { id: `${payload.ts}-${Math.random().toString(36).slice(2)}`, ...payload }])
    }
    socket.on('message', handler)
    return () => {
      try { socket.emit('leave', room) } catch {}
      socket.off('message', handler)
      socket.disconnect()
    }
  }, [requestId])

  async function send(){
    if (!text) return
    const from = localStorage.getItem('rw_name') || 'Guest'
    try {
      if (hasFirebase && db) {
        await addDoc(collection(db, 'messages'), { from, text, ts: Date.now(), requestId: requestId || null })
      } else if (socketRef.current) {
        socketRef.current.emit('message', { room, from, text })
      }
      setText('')
    } catch (e) { console.warn(e) }
  }

  return (
    <div className="chatBox">
      <h3 style={{ marginTop: 0 }}>{requestId ? 'Request Chat' : 'Public Chat'}</h3>
      <div className="messages">
        {messages.map((m) => <div key={m.id} style={{ padding:6, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{m.from}: {m.text}</div>)}
      </div>
      <div style={{ marginTop:8 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Message" />
        <button onClick={send}>Send</button>
      </div>
    </div>
  )
}
