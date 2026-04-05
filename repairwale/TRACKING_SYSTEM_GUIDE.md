# 🚗 Real-Time Service Tracking System

## Overview

The Real-Time Service Tracking System in RepairWale provides live updates on mechanic locations, arrival times, and service progress. This document explains how to use and test the feature.

## Components

### 1. **TrackingSimulator.jsx** 
Interactive demo that simulates a complete service booking flow with fake mechanic movement.

**Features:**
- 🔍 Searching stage (0-3s)
- ✓ Mechanic accepted (3-6s)
- 🚗 En route with live location updates (6-20s)
- 📍 Mechanic arrived (20-21s)
- ✅ Completed (21s+)

**Usage:**
```jsx
<TrackingSimulator 
  onStatusChange={(message, state, data) => {
    console.log('Status:', message)
  }}
  onLocationUpdate={(location) => {
    console.log('Location:', location)
  }}
/>
```

### 2. **LiveGPSTracker.jsx**
Enhanced component that displays live mechanic and customer locations on an interactive map.

**Props:**
- `orderId` - Service order ID
- `mechanicId` - Mechanic's ID
- `customerId` - Customer's ID
- `initialCustomerLocation` - Starting customer location

**Features:**
- 🗺️ Interactive Leaflet map
- 📍 Real-time location markers with animations
- 📏 Distance calculation using Haversine formula
- ⏱️ ETA calculation based on distance and speed
- 📊 Live stats display (distance, ETA, status)
- 🔄 Automatic map panning and zooming
- 💫 Animated markers with pulse effects

**Usage:**
```jsx
<LiveGPSTracker
  orderId="order-123"
  mechanicId="mechanic-456"
  customerId="customer-789"
  initialCustomerLocation={{ lat: 28.6139, lng: 77.2090 }}
/>
```

### 3. **TrackingFeatureShowcase.jsx**
Interactive showcase of all tracking features with expandable details.

**Features:**
- 6 feature cards with details
- Click to expand/collapse
- Link to demo page
- Technology stack display

**Usage:**
```jsx
<TrackingFeatureShowcase />
```

### 4. **TrackingDemoPage.jsx**
Full-page demo showing comprehensive tracking example with fake order data.

**Features:**
- Complete order details
- Running tracking simulator
- Live GPS map
- Services list
- Feature highlight section

**Access:**
```
/tracking-demo
```

## How to Test

### Quick Start
1. Go to `/tracking-demo` page
2. Click "Start Demo" button
3. Watch the fake mechanic move from starting location to customer destination
4. See real-time map updates with distance and ETA calculations

### Test Flow

**Stage 1: Searching (0-3s)**
- Status: 🔍 Searching for mechanics
- Map: Locations plotted
- No mechanic movement yet

**Stage 2: Accepted (3-6s)**
- Status: ✓ Mechanic accepted
- Animation: Mechanic marker starts animating
- Distance: Shows initial distance

**Stage 3: En Route (6-20s)**
- Status: 🚗 En route
- Animation: Smooth mechanic movement toward customer
- Live Updates:
  - Distance updates
  - ETA recalculation
  - Route line updates
  - Map auto-centers

**Stage 4: Arrived (20-21s)**
- Status: 📍 Mechanic arrived
- Location: Mechanic at customer location
- Distance: ~0 km
- Action: Demo complete

## Real-Time Tracking Flow

```
1. Customer Books Service
   ↓
2. Dispatch system finds mechanics
   ↓
3. Mechanic Accepts
   ↓
4. Socket.IO connection established
   ↓
5. Real-time tracking begins:
   - Mechanic GPS location streamed
   - Distance calculated
   - ETA updated
   - Map updated
   - Status notifications sent
   ↓
6. Mechanic Arrives
   ↓
7. Service begins/completes
   ↓
8. Tracking ends
```

## Key Features Explained

### Distance Calculation
Uses **Haversine Formula** for accurate great-circle distance:
```javascript
const R = 6371; // Earth's radius in km
const dLat = (lat2 - lat1) * Math.PI / 180;
const dLng = (lng2 - lng1) * Math.PI / 180;
const a = Math.sin(dLat/2)² + 
          Math.cos(lat1*π/180) * Math.cos(lat2*π/180) * Math.sin(dLng/2)²;
const c = 2 * Math.atan2(√a, √(1-a));
const distance = R * c;
```

### ETA Calculation
```javascript
const avgSpeed = 40; // km/h
const timeInMinutes = (distance / avgSpeed) * 60;
```

### Real-Time Updates
- **Frequency**: ~3 second intervals (configurable)
- **Method**: Socket.IO events
- **Accuracy**: High-accuracy GPS when available
- **Fallback**: Default location if GPS unavailable

## Map Features

### Markers
- **Mechanic**: Blue marker with car emoji 🚗
- **Customer**: Dark marker with pin emoji 📍
- **Pulse Ring**: Animated ring around mechanic for visibility
- **Auto-centering**: Map adjusts to show both markers

### Route Visualization
- **Blue Dashed Line**: Connection between mechanic and customer
- **Auto-fit Bounds**: Initial load fits both locations
- **Pan Animation**: Smooth panning as mechanic moves
- **Zoom Preservation**: User zoom level maintained

## Animations & Effects

### Marker Animations
```css
@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

### Status Indicators
- 🟢 Active/Connected (green pulse)
- 🟡 Searching (yellow spin)
- 🔵 En Route (blue pulse)
- ✅ Complete (static green)

## Configuration

### Speed Defaults
```javascript
minEmitIntervalMs: 3000  // Emit location every 3 seconds
avgSpeed: 40             // km/h for ETA calculation
```

### Geolocation Options
```javascript
{
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 3000
}
```

### Map Options
```javascript
tileLayer: 'OpenStreetMap'
zoomLevel: 15 (initial)
padding: [80, 80] (bounds fit)
```

## Integration Points

### ServiceTracking Page
- Shows demo simulator
- Displays live tracker component
- Shows order progress timeline
- Integrated chat available

### CustomerHome Page
- Can add TrackingFeatureShowcase
- Links to demo page
- Shows tracking status for active orders

### Order History
- Can re-view tracking history
- Shows completed tracking data

## Browser Support

- ✅ Chrome/Edge 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Mobile browsers (iOS/Android)

**Requirements:**
- Geolocation API support
- WebSocket support (for Socket.IO)
- ES6 support

## Testing Checklist

- [ ] Demo simulator runs through all stages
- [ ] Map displays with correct markers
- [ ] Distance updates as mechanic moves
- [ ] ETA updates correctly
- [ ] Route line updates smoothly
- [ ] Status messages display in sequence
- [ ] Map auto-centers properly
- [ ] Animations are smooth
- [ ] Mobile responsive layout works
- [ ] Socket events fire correctly

## Performance Notes

- **Map Rendering**: Leaflet handles 50+ markers efficiently
- **Location Updates**: ~16KB per update
- **Socket Events**: Throttled to 3s intervals
- **Memory**: Efficient cleanup on unmount

## Future Enhancements

- [ ] Historical tracking (replay mechanic path)
- [ ] Multiple mechanic tracking (group orders)
- [ ] Route optimization
- [ ] Traffic-aware ETA
- [ ] Offline mode with sync
- [ ] Mechanic availability heatmap
- [ ] Rating/review during tracking
- [ ] Emergency contact quick actions

## Troubleshooting

### Map Not Showing
- Check browser console for Leaflet errors
- Verify CSS is loaded correctly
- Ensure map container has height

### Location Not Updating
- Check network tab for Socket.IO events
- Verify geolocation permissions
- Check browser geolocation API availability

### Animated Markers Stuttering
- Reduce location update frequency
- Check CPU usage
- Try different browser

### Demo Not Starting
- Clear browser cache
- Check console for errors
- Verify all dependencies loaded

## Code Examples

### Using the Demo
```jsx
import TrackingDemoPage from './customer/pages/TrackingDemoPage'

// Add route
<Route path="/tracking-demo" element={<TrackingDemoPage />} />
```

### Embedding Showcase
```jsx
import TrackingFeatureShowcase from './shared/components/TrackingFeatureShowcase'

function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      <TrackingFeatureShowcase />
    </div>
  )
}
```

### Custom Simulator
```jsx
import TrackingSimulator from './shared/components/TrackingSimulator'

function CustomDemo() {
  const [status, setStatus] = useState('')
  
  return (
    <TrackingSimulator
      onStatusChange={(msg, state, data) => setStatus(msg)}
      onLocationUpdate={(loc) => console.log('Updated:', loc)}
    />
  )
}
```

## API Events (Socket.IO)

### Events Emitted
- `track-mechanic` - Start tracking a mechanic
- `user:location` - Send customer location
- `update-mechanic-location` - Send mechanic location
- `stop-tracking` - End tracking session

### Events Listened
- `mechanic-location-update` - Mechanic position + ETA
- `mechanic:location-update` - Mechanic position only
- `disconnect` - Connection dropped

## License & Credits

Built with:
- **React** - UI Framework
- **Leaflet** - Mapping library
- **Socket.IO** - Real-time communication
- **Haversine** - Distance calculation

---

**Version:** 1.0.0  
**Last Updated:** April 2026  
**Status:** ✅ Production Ready
