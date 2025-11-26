// RepairWale prototype frontend
const socket = io();

const map = L.map('map').setView([28.6139, 77.2090], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

let markers = {};
const mechanicListEl = document.getElementById('mechanic-list');
const chatEl = document.getElementById('chat');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

function addMechanicMarker(m) {
  const marker = L.marker([m.lat, m.lng]).addTo(map).bindPopup(`<b>${m.name}</b><br/>${m.rating} ★`);
  markers[m.id] = marker;
}

function loadMechanics() {
  fetch('/api/mechanics').then(r => r.json()).then(list => {
    mechanicListEl.innerHTML = '';
    list.forEach(m => {
      addMechanicMarker(m);
      const li = document.createElement('li');
      li.textContent = `${m.name} — ${m.rating} ★`;
      li.onclick = () => {
        map.panTo([m.lat, m.lng]);
      };
      mechanicListEl.appendChild(li);
    });
  });
}

// Simple auth mock
const nameInput = document.getElementById('name');
const userDiv = document.getElementById('user');
const storedName = localStorage.getItem('rw_name');
if (storedName) {
  nameInput.value = storedName;
  userDiv.textContent = `Signed in as ${storedName}`;
}

document.getElementById('request-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const problem = document.getElementById('problem').value.trim();
  if (!name || !problem) return alert('Please enter name and problem');
  localStorage.setItem('rw_name', name);
  userDiv.textContent = `Signed in as ${name}`;

  const center = map.getCenter();
  const payload = { customerName: name, lat: center.lat, lng: center.lng, problem };
  const res = await fetch('/api/request', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify(payload) });
  const data = await res.json();
  if (data.ok) {
    alert('Request created — waiting for mechanic responses (prototype)');
    // Join chat room for this request
    const room = `request_${data.request.id}`;
    socket.emit('join', room);
    appendChatSystem(`Created request ${data.request.id}. Joined room.`);
  }
});

function appendChatSystem(text) {
  const div = document.createElement('div');
  div.className = 'msg';
  div.style.opacity = 0.9;
  div.textContent = text;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

socket.on('connect', () => {
  appendChatSystem('Connected to chat server');
});

socket.on('new_request', (req) => {
  appendChatSystem(`New request broadcast: ${req.customerName} — ${req.problem}`);
});

socket.on('message', (m) => {
  const div = document.createElement('div');
  div.className = 'msg';
  div.textContent = `${m.from}: ${m.text}`;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  const from = localStorage.getItem('rw_name') || 'Guest';
  // For prototype we send to a default demo room
  const room = 'public_chat';
  socket.emit('message', { room, from, text });
  chatInput.value = '';
});

// Join public chat by default
socket.emit('join', 'public_chat');

loadMechanics();

// Placeholder Firebase & Razorpay notes (for integration):
/*
  Firebase:
    - Add Firebase SDK in production
    - Use Firebase Auth for login, Firestore for storing requests and locations

  Razorpay:
    - Use Razorpay checkout script and server-side order creation
    - For testing, use test keys and simulate payment success in prototype
*/
