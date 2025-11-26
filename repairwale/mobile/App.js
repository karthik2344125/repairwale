import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import io from 'socket.io-client';
import firebaseConfig from './firebaseConfig';
import { SERVER_URL } from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [problem, setProblem] = useState('Flat tire');
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    // Anonymous sign-in
    signInAnonymously(auth).catch(err => console.warn(err));
    const unsubAuth = onAuthStateChanged(auth, u => setUser(u));

    // Connect socket.io to backend for real-time chat/notifications
    try {
      socketRef.current = io(SERVER_URL);
      socketRef.current.on('connect', () => console.log('socket connected', socketRef.current.id));
      socketRef.current.on('new_request', (r) => {
        Alert.alert('New Request Broadcast', `${r.customerName}: ${r.problem}`);
      });
    } catch (e) {
      console.warn('Socket connection failed', e);
    }

    // Load mechanics from backend
    fetch(`${SERVER_URL}/api/mechanics`).then(r => r.json()).then(setMechanics).catch(e => console.warn(e));

    // Subscribe to requests collection in Firestore
    const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setRequests(arr);
    });

    // Subscribe to public messages (simple chat)
    const mq = query(collection(db, 'messages'), orderBy('ts', 'asc'));
    const unsubMsg = onSnapshot(mq, snap => {
      const msgs = [];
      snap.forEach(d => msgs.push({ id: d.id, ...d.data() }));
      setMessages(msgs);
    });

    return () => {
      unsub();
      unsubMsg();
      unsubAuth();
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  async function createRequest() {
    if (!user) return Alert.alert('Auth', 'Not signed in yet');
    const payload = {
      customerId: user.uid,
      customerName: user.uid,
      problem,
      lat: 28.6139,
      lng: 77.2090,
      status: 'searching',
      createdAt: Date.now()
    };

    try {
      // Add to Firestore
      await addDoc(collection(db, 'requests'), payload);

      // Post to backend to broadcast via Socket.io (optional)
      fetch(`${SERVER_URL}/api/request`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ customerName: 'MobileUser', lat: payload.lat, lng: payload.lng, problem })
      }).catch(e => console.warn('Backend notify failed', e));

      // Optionally join the request-based socket room
      // socketRef.current && socketRef.current.emit('join', `request_${new Date().getTime()}`);

      Alert.alert('Request created', 'Your service request was created.');
    } catch (e) {
      console.warn(e);
      Alert.alert('Error', 'Could not create request');
    }
  }

  async function sendMessage() {
    if (!messageText) return;
    try {
      await addDoc(collection(db, 'messages'), { from: user ? user.uid : 'guest', text: messageText, ts: Date.now() });
      setMessageText('');
    } catch (e) { console.warn(e); }
  }

  async function payForRequest(requestId, amount = 100) {
    try {
      // Call backend to create order (mock)
      const res = await fetch(`${SERVER_URL}/api/create-order`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ amount }) });
      const data = await res.json();
      if (!data.ok) return Alert.alert('Payment', 'Could not create order');

      // In production you'd open Razorpay checkout here. For prototype we simulate success.
      const mockPaymentId = `pay_mock_${Date.now()}`;

      // Verify payment (mock)
      await fetch(`${SERVER_URL}/api/verify-payment`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ order_id: data.order.id, payment_id: mockPaymentId }) });

      // Update request status in Firestore
      const reqDoc = doc(db, 'requests', requestId);
      await updateDoc(reqDoc, { status: 'paid', paidAt: serverTimestamp() });

      Alert.alert('Payment', 'Payment simulated and request marked as paid.');
    } catch (e) {
      console.warn(e);
      Alert.alert('Payment error', 'Could not complete payment');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>RepairWale (Mobile Prototype)</Text></View>

      <MapView style={styles.map} initialRegion={{ latitude: 28.6139, longitude: 77.2090, latitudeDelta: 0.05, longitudeDelta: 0.05 }}>
        {mechanics.map(m => (
          <Marker key={m.id} coordinate={{ latitude: m.lat, longitude: m.lng }} title={m.name} description={`${m.rating} ★`} />
        ))}
      </MapView>

      <View style={styles.controls}>
        <Text style={{ marginBottom: 6 }}>Signed in: {user ? user.uid : '... signing in'}</Text>
        <TextInput style={styles.input} value={problem} onChangeText={setProblem} placeholder="Problem description" />
        <Button title="Request Service" onPress={createRequest} />

        <Text style={{ marginTop: 10, fontWeight: '600' }}>Recent Requests</Text>
        <FlatList data={requests} keyExtractor={i => i.id} renderItem={({ item }) => (
          <View style={styles.reqItem}>
            <Text>{item.customerName} — {item.problem} [{item.status || 'unknown'}]</Text>
            <View style={{ flexDirection: 'row', marginTop: 6 }}>
              <TouchableOpacity style={{ marginRight: 8 }} onPress={() => payForRequest(item.id, 100)}>
                <View style={{ padding: 8, backgroundColor: '#0b5', borderRadius: 4 }}><Text>Pay ₹100</Text></View>
              </TouchableOpacity>
            </View>
          </View>
        )} />

        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: '600' }}>Public Chat</Text>
          <FlatList data={messages} keyExtractor={m => m.id} style={{ maxHeight: 150 }} renderItem={({ item }) => (
            <View style={{ padding: 6, borderBottomWidth: 1, borderColor: '#eee' }}><Text>{item.from}: {item.text}</Text></View>
          )} />
          <TextInput style={styles.input} value={messageText} onChangeText={setMessageText} placeholder="Message" />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 12, backgroundColor: '#0b5' },
  title: { fontSize: 18, fontWeight: '700' },
  map: { flex: 1 },
  controls: { padding: 12, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, marginBottom: 8 },
  reqItem: { padding: 8, borderBottomWidth: 1, borderColor: '#eee' }
});
