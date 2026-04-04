import { io } from 'socket.io-client'
import { getAPIBase } from './apiConfig'

function uniq(values) {
  return values.filter((v, i) => v && values.indexOf(v) === i)
}

export function getRealtimeCandidates() {
  const apiBase = getAPIBase()
  const fromApi = apiBase ? apiBase.replace(/\/api\/?$/, '') : ''
  const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost'

  return uniq([
    fromApi,
    `http://${host}:3000`,
    `http://${host}:3001`,
    `http://${host}:3002`,
    `http://${host}:3003`
  ])
}

export function connectRealtimeWithFallback({ onConnect, onError, options = {} } = {}) {
  const candidates = getRealtimeCandidates()
  let index = 0
  let activeSocket = null

  const connectNext = () => {
    if (index >= candidates.length) {
      if (onError) onError(new Error('Unable to connect to realtime server on known ports'))
      return null
    }

    const url = candidates[index]
    index += 1

    const socket = io(url, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 4,
      reconnectionDelay: 900,
      timeout: 3500,
      ...options
    })

    socket.on('connect', () => {
      activeSocket = socket
      localStorage.setItem('rw_realtime_server', url)
      if (onConnect) onConnect(socket, url)
    })

    socket.on('connect_error', () => {
      if (activeSocket) return
      try { socket.disconnect() } catch {}
      connectNext()
    })

    return socket
  }

  const socket = connectNext()

  return {
    get socket() {
      return activeSocket || socket
    },
    disconnect: () => {
      try {
        if (activeSocket) activeSocket.disconnect()
        else if (socket) socket.disconnect()
      } catch {}
    }
  }
}


