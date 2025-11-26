// Firebase initialization for web client
import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

let app = null
let auth = null
let db = null
let hasFirebase = true

try {
	const missing = !firebaseConfig || Object.values(firebaseConfig || {}).some(v => {
		return typeof v === 'string' && v.toUpperCase().includes('YOUR_')
	})

	if (missing) {
		hasFirebase = false
	} else {
		app = initializeApp(firebaseConfig)
		auth = getAuth(app)
		db = getFirestore(app)
		// Sign in anonymously for prototype convenience
		signInAnonymously(auth).catch(() => {})
	}
} catch (e) {
	console.warn('Firebase init disabled:', e)
	hasFirebase = false
	app = null
	auth = null
	db = null
}

export { app, auth, db, hasFirebase }
