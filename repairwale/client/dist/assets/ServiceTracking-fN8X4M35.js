import{r,j as e,b as A,u as L}from"./index-BgBzfigI.js";import{l as R,L as N}from"./index-BtGou90v.js";import{B as O}from"./Button-D_miSh7Z.js";function M({orderId:c,userRole:u="customer",mechanicName:n="Mechanic"}){const[w,t]=r.useState([]),[v,y]=r.useState(""),[T,f]=r.useState(!1),[d,x]=r.useState(!1),[l,C]=r.useState(0),[h,z]=r.useState(!1),o=r.useRef(null),j=r.useRef(null),k=r.useRef(null),a=JSON.parse(localStorage.getItem("repairwale_user")||"{}").fullName||(u==="customer"?"Customer":n);r.useEffect(()=>{const i=R("http://localhost:3000",{transports:["websocket","polling"],reconnectionAttempts:5,reconnectionDelay:1e3});return o.current=i,i.on("connect",()=>{console.log("✅ Chat connected"),x(!0),i.emit("join-chat",{orderId:c,userRole:u,userName:a})}),i.on("disconnect",()=>{console.log("❌ Chat disconnected"),x(!1)}),i.on("chat-message",S=>{t(b=>[...b,S]),h&&S.userName!==a&&C(b=>b+1),m()}),i.on("user-typing",({userName:S})=>{S!==a&&(f(!0),clearTimeout(k.current),k.current=setTimeout(()=>f(!1),3e3))}),i.on("chat-history",S=>{t(S),m()}),()=>{i.emit("leave-chat",{orderId:c}),i.disconnect(),clearTimeout(k.current)}},[c]);const m=()=>{setTimeout(()=>{var i;(i=j.current)==null||i.scrollIntoView({behavior:"smooth"})},100)},g=()=>{if(!v.trim()||!d)return;const i={orderId:c,text:v.trim(),userName:a,userRole:u,timestamp:Date.now()};o.current.emit("send-message",i),y("")},p=i=>{y(i.target.value),o.current&&i.target.value&&o.current.emit("typing",{orderId:c,userName:a})},I=i=>{i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),g())},E=()=>{z(!h),h&&(C(0),m())};return e.jsxs("div",{style:{position:"fixed",bottom:20,right:20,width:h?320:380,maxHeight:h?60:600,background:"var(--surface)",border:"2px solid var(--border)",borderRadius:16,boxShadow:"0 12px 48px rgba(0,0,0,0.6)",display:"flex",flexDirection:"column",zIndex:1e3,transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",overflow:"hidden"},children:[e.jsxs("div",{style:{padding:"16px 20px",background:"linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",color:"#ffffff",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",userSelect:"none"},onClick:E,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:"50%",background:d?"#10b981":"#ef4444",boxShadow:`0 0 8px ${d?"#10b981":"#ef4444"}`,animation:d?"pulse 2s infinite":"none"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:15,fontWeight:700},children:"💬 Live Chat"}),e.jsx("div",{style:{fontSize:11,opacity:.8},children:d?`with ${u==="customer"?n:"Customer"}`:"Connecting..."})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[l>0&&!h&&e.jsx("div",{style:{background:"#ef4444",color:"#fff",fontSize:11,fontWeight:800,padding:"3px 8px",borderRadius:12,minWidth:20,textAlign:"center"},children:l}),e.jsx("div",{style:{fontSize:20},children:h?"▲":"▼"})]})]}),!h&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:12,background:"var(--bg)",minHeight:300,maxHeight:400},children:[w.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"40px 20px",color:"var(--text-muted)",fontSize:14},children:[e.jsx("div",{style:{fontSize:32,marginBottom:12},children:"💬"}),e.jsx("div",{children:"No messages yet"}),e.jsx("div",{style:{fontSize:12,marginTop:4},children:"Start the conversation!"})]}):w.map((i,S)=>{const b=i.userName===a;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:b?"flex-end":"flex-start",gap:4},children:[!b&&e.jsx("div",{style:{fontSize:11,color:"var(--text-muted)",fontWeight:600,paddingLeft:8},children:i.userName}),e.jsxs("div",{style:{background:b?"linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)":"var(--surface)",color:b?"#ffffff":"var(--text)",padding:"10px 14px",borderRadius:b?"16px 16px 4px 16px":"16px 16px 16px 4px",maxWidth:"75%",wordBreak:"break-word",border:b?"none":"1px solid var(--border)",boxShadow:b?"0 2px 8px rgba(30,58,138,0.3)":"none"},children:[e.jsx("div",{style:{fontSize:14,lineHeight:1.5},children:i.text}),e.jsx("div",{style:{fontSize:10,marginTop:4,opacity:.7,textAlign:"right"},children:new Date(i.timestamp).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})})]})]},S)}),T&&e.jsx("div",{style:{display:"flex",alignItems:"center",gap:8,paddingLeft:8,color:"var(--text-muted)",fontSize:13},children:e.jsxs("div",{style:{display:"flex",gap:3,padding:"8px 12px",background:"var(--surface)",borderRadius:16,border:"1px solid var(--border)"},children:[e.jsx("span",{style:{animation:"bounce 1.4s infinite"},children:"●"}),e.jsx("span",{style:{animation:"bounce 1.4s infinite 0.2s"},children:"●"}),e.jsx("span",{style:{animation:"bounce 1.4s infinite 0.4s"},children:"●"})]})}),e.jsx("div",{ref:j})]}),e.jsxs("div",{style:{padding:16,borderTop:"1px solid var(--border)",background:"var(--surface)"},children:[!d&&e.jsx("div",{style:{padding:"8px 12px",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,fontSize:12,color:"#ef4444",marginBottom:12,textAlign:"center"},children:"⚠️ Connecting to chat server..."}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-end"},children:[e.jsx("textarea",{value:v,onChange:p,onKeyPress:I,placeholder:d?"Type a message...":"Connecting...",disabled:!d,style:{flex:1,padding:"10px 12px",borderRadius:10,border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:14,resize:"none",minHeight:40,maxHeight:80,fontFamily:"inherit"},rows:1}),e.jsx(O,{variant:"primary",onClick:g,disabled:!v.trim()||!d,style:{padding:"10px 16px",minWidth:60,height:40},children:"Send"})]}),e.jsx("div",{style:{fontSize:11,color:"var(--text-muted)",marginTop:8,textAlign:"center"},children:"Press Enter to send • Shift+Enter for new line"})]})]}),e.jsx("style",{children:`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(1); opacity: 0.5; }
          40% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `})]})}N.Icon.Default.mergeOptions({iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"});const B=N.divIcon({html:'<div style="background:#10b981;color:#fff;padding:6px 10px;border-radius:50%;font-size:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(16,185,129,0.4)">🔧</div>',iconSize:[32,32],className:"mechanic-marker"}),P=N.divIcon({html:'<div style="background:#3b82f6;color:#fff;padding:6px 10px;border-radius:50%;font-size:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(59,130,246,0.4)">📍</div>',iconSize:[32,32],className:"customer-marker"});function D({orderId:c,mechanicId:u}){const[n,w]=r.useState(null),[t,v]=r.useState(null),[y,T]=r.useState(null),[f,d]=r.useState(null),[x,l]=r.useState(!1),[C,h]=r.useState([]),z=r.useRef(null),o=r.useRef(null),j=r.useRef(null),k=r.useRef(null),s=r.useRef(null),a=r.useRef(null);r.useEffect(()=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition(p=>{const I={lat:p.coords.latitude,lng:p.coords.longitude};v(I)},p=>{console.error("Location error:",p),v({lat:28.6139,lng:77.209})});const g=R("http://localhost:3000",{transports:["websocket","polling"]});return z.current=g,g.on("connect",()=>{console.log("✅ GPS Tracker connected"),g.emit("track-mechanic",{orderId:c,mechanicId:u}),l(!0)}),g.on("mechanic-location-update",p=>{w(p.location),T(p.eta),d(p.distance),p.route&&h(p.route)}),g.on("disconnect",()=>{l(!1)}),()=>{g.emit("stop-tracking",{orderId:c}),g.disconnect()}},[c,u]),r.useEffect(()=>{if(!(!t||!j.current||o.current))return o.current=N.map(j.current).setView([t.lat,t.lng],15),N.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",maxZoom:19}).addTo(o.current),s.current=N.marker([t.lat,t.lng],{icon:P,title:"Your Location"}).addTo(o.current),()=>{o.current&&(o.current.remove(),o.current=null)}},[t]),r.useEffect(()=>{if(!(!o.current||!n)&&(k.current&&o.current.removeLayer(k.current),k.current=N.marker([n.lat,n.lng],{icon:B,title:"Mechanic Location"}).addTo(o.current),a.current&&o.current.removeLayer(a.current),t)){a.current=N.polyline([[t.lat,t.lng],[n.lat,n.lng]],{color:"#3b82f6",weight:3,opacity:.8,dashArray:"8, 4"}).addTo(o.current);const g=N.latLngBounds([t.lat,t.lng],[n.lat,n.lng]);o.current.fitBounds(g,{padding:[80,80]})}},[n,t]);const m=()=>f?`${Math.round(f/40*60)} min`:"Calculating...";return e.jsxs("div",{style:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden",boxShadow:"var(--shadow-md)"},children:[e.jsxs("div",{style:{padding:"16px 20px",background:"linear-gradient(135deg, #10b981 0%, #059669 100%)",color:"#ffffff",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[e.jsx("div",{style:{width:10,height:10,borderRadius:"50%",background:x?"#ffffff":"#ef4444",boxShadow:x?"0 0 8px #ffffff":"none",animation:x?"pulse 2s infinite":"none"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:15,fontWeight:700},children:"📍 Live GPS Tracking"}),e.jsx("div",{style:{fontSize:11,opacity:.9},children:x?"Tracking in real-time":"Waiting for location..."})]})]}),y&&e.jsxs("div",{style:{background:"rgba(255,255,255,0.2)",padding:"8px 16px",borderRadius:12,fontSize:13,fontWeight:700},children:["ETA: ",y||m()]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:1,background:"var(--border)",borderBottom:"1px solid var(--border)"},children:[e.jsxs("div",{style:{padding:"12px 16px",background:"var(--surface)",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--text-muted)",marginBottom:4},children:"Distance"}),e.jsx("div",{style:{fontSize:18,fontWeight:800,color:"var(--accent-light)"},children:f?`${f.toFixed(1)} km`:"--"})]}),e.jsxs("div",{style:{padding:"12px 16px",background:"var(--surface)",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--text-muted)",marginBottom:4},children:"ETA"}),e.jsx("div",{style:{fontSize:18,fontWeight:800,color:"var(--accent-light)"},children:y||m()})]}),e.jsxs("div",{style:{padding:"12px 16px",background:"var(--surface)",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:11,color:"var(--text-muted)",marginBottom:4},children:"Status"}),e.jsx("div",{style:{fontSize:18,fontWeight:800,color:"#10b981"},children:n?"🚗 En Route":"⏳ Pending"})]})]}),e.jsx("div",{style:{position:"relative",height:400,background:"linear-gradient(135deg, rgba(30,58,138,0.05) 0%, rgba(30,58,138,0.1) 100%)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx("div",{ref:j,id:"gps-map",style:{width:"100%",height:"100%",position:"relative",borderRadius:"0 0 0 0"},children:!t&&e.jsxs("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",textAlign:"center",zIndex:10},children:[e.jsx("div",{style:{fontSize:48,marginBottom:16,animation:"bounce 2s infinite"},children:"📍"}),e.jsx("div",{style:{fontSize:16,fontWeight:700,color:"var(--text)",marginBottom:8},children:"Getting your location..."})]})})}),e.jsxs("div",{style:{padding:"16px 20px",background:"var(--bg)",borderTop:"1px solid var(--border)"},children:[e.jsx("div",{style:{fontSize:13,fontWeight:700,marginBottom:12,color:"var(--text)"},children:"📡 Live Updates"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:x?e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{padding:"8px 12px",background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:8,fontSize:12,color:"#10b981",display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{children:"✅"}),e.jsx("span",{children:"GPS tracking active"})]}),n&&e.jsxs("div",{style:{padding:"8px 12px",background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:8,fontSize:12,color:"#3b82f6",display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{children:"🚗"}),e.jsxs("span",{children:["Mechanic location updated ",new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})]})]})]}):e.jsxs("div",{style:{padding:"8px 12px",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,fontSize:12,color:"#ef4444",display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{children:"⚠️"}),e.jsx("span",{children:"Connecting to GPS..."})]})})]}),e.jsx("style",{children:`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-10px); }
        }
      `})]})}function U(c){if(!c)return"N/A";try{return new Date(c).toLocaleDateString("en-IN",{year:"numeric",month:"short",day:"numeric"})}catch{return c}}function Y(){var z,o,j,k;const{orderId:c}=A(),u=L(),[n,w]=r.useState(null),[t,v]=r.useState(null),[y,T]=r.useState(null);r.useEffect(()=>{f();const s=setInterval(f,5e3);return()=>clearInterval(s)},[c]);const f=()=>{try{const a=JSON.parse(localStorage.getItem("rw_orders")||"[]").find(m=>m.id===c);a&&(w(a),v(a.tracking||{}))}catch{}};if(!n)return e.jsx("div",{style:{maxWidth:800,margin:"0 auto",padding:"20px"},children:e.jsxs("div",{style:{textAlign:"center",padding:40},children:[e.jsx("div",{style:{fontSize:48,marginBottom:16},children:"📦"}),e.jsx("h3",{children:"Order not found"}),e.jsx("p",{style:{color:"var(--text-secondary)"},children:"The order you're looking for doesn't exist."}),e.jsx("button",{onClick:()=>u("/orders"),style:{marginTop:20,padding:"10px 20px",borderRadius:8,border:"none",background:"#60a5fa",color:"#fff",cursor:"pointer",fontWeight:700},children:"Back to Orders"})]})});const d=[{id:"pending",label:"Order Placed",icon:"📝",color:"#fbbf24"},{id:"in_progress",label:"In Progress",icon:"⚙️",color:"#60a5fa"},{id:"completed",label:"Completed",icon:"✅",color:"#10b981"}],x=d.findIndex(s=>s.id===n.status),l=d[x],C=(t==null?void 0:t.statusUpdates)||[{time:"14:30",status:"pending",message:"Order placed",icon:"📝"},{time:"14:32",status:"pending",message:"Looking for nearby mechanics",icon:"🔍"}];return e.jsxs("div",{className:"tracking-container",children:[e.jsxs("div",{className:"tracking-hero",children:[e.jsx("button",{onClick:()=>u("/orders"),className:"tracking-back-btn",children:"← Back"}),e.jsxs("div",{className:"tracking-hero-content",children:[e.jsx("h1",{className:"tracking-title",children:"Tracking Your Service"}),e.jsxs("p",{className:"tracking-subtitle",children:["Real-time updates for order #",(z=n.id)==null?void 0:z.slice(-8).toUpperCase()]})]}),e.jsxs("div",{className:"tracking-header-grid",children:[e.jsxs("div",{className:"tracking-header-item",children:[e.jsx("div",{className:"tracking-label",children:"Order #"}),e.jsx("div",{className:"tracking-value",children:(o=n.id)==null?void 0:o.slice(-8).toUpperCase()})]}),e.jsxs("div",{className:"tracking-header-item",children:[e.jsx("div",{className:"tracking-label",children:"Status"}),e.jsxs("div",{className:"tracking-status",style:{color:l==null?void 0:l.color},children:[e.jsx("span",{children:l==null?void 0:l.icon}),l==null?void 0:l.label]})]}),e.jsxs("div",{className:"tracking-header-item",children:[e.jsx("div",{className:"tracking-label",children:"Date"}),e.jsx("div",{className:"tracking-value-date",children:U(n.date)})]}),e.jsxs("div",{className:"tracking-header-item",children:[e.jsx("div",{className:"tracking-label",children:"Total"}),e.jsxs("div",{className:"tracking-value-amount",children:["₹",((j=n.total)==null?void 0:j.toLocaleString("en-IN"))||"0"]})]})]})]}),e.jsxs("div",{className:"tracking-progress-section",children:[e.jsx("h2",{className:"section-title",children:"Service Progress"}),e.jsx("div",{className:"tracking-timeline",children:d.map((s,a)=>{const m=a<x,g=a===x;return e.jsxs("div",{className:`tracking-stage ${m?"tracking-completed":g?"tracking-current":"tracking-next"}`,children:[e.jsx("div",{className:"tracking-stage-circle",children:m?"✓":s.icon}),e.jsxs("div",{className:"tracking-stage-content",children:[e.jsx("div",{className:"tracking-stage-label",children:s.label}),e.jsxs("div",{className:"tracking-stage-desc",children:[s.id==="pending"&&"Waiting for mechanic assignment",s.id==="in_progress"&&"Mechanic is on the way or working on your service",s.id==="completed"&&"Service finished and ready for pickup"]})]}),a<d.length-1&&e.jsx("div",{className:`tracking-connector ${m?"tracking-connector-done":""}`})]},s.id)})}),e.jsxs("div",{className:"tracking-metrics",children:[e.jsxs("div",{className:"tracking-metric-card",children:[e.jsx("div",{className:"metric-label",children:"Est. Time"}),e.jsx("div",{className:"metric-value",children:(t==null?void 0:t.estimatedTime)||"45 mins"})]}),e.jsxs("div",{className:"tracking-metric-card",children:[e.jsx("div",{className:"metric-label",children:"Distance"}),e.jsx("div",{className:"metric-value",children:(t==null?void 0:t.distance)||"8.5 km"})]}),e.jsxs("div",{className:"tracking-metric-card",children:[e.jsx("div",{className:"metric-label",children:"ETA"}),e.jsx("div",{className:"metric-value",children:(t==null?void 0:t.eta)||"15:15"})]})]})]}),e.jsxs("div",{className:"tracking-services-section",children:[e.jsx("h2",{className:"section-title",children:"Services"}),e.jsx("div",{className:"tracking-services-list",children:(k=n.items)==null?void 0:k.map((s,a)=>e.jsxs("div",{className:"tracking-service-item",children:[e.jsxs("span",{className:"service-name",children:[s.title," × ",s.qty]}),e.jsxs("strong",{className:"service-price",children:["₹",(s.price*s.qty).toLocaleString("en-IN")]})]},a))})]}),n.status!=="pending"&&e.jsxs("div",{className:"tracking-mechanic-section",children:[e.jsx("h2",{className:"section-title",children:"Assigned Mechanic"}),e.jsxs("div",{className:"tracking-mechanic-grid",children:[e.jsxs("div",{className:"mechanic-info-item",children:[e.jsx("div",{className:"mechanic-label",children:"Name"}),e.jsx("div",{className:"mechanic-value",children:"Priya Sharma"})]}),e.jsxs("div",{className:"mechanic-info-item",children:[e.jsx("div",{className:"mechanic-label",children:"Rating"}),e.jsx("div",{className:"mechanic-value-rating",children:"⭐ 4.8 (245 reviews)"})]}),e.jsxs("div",{className:"mechanic-contact-buttons",children:[e.jsx("button",{className:"mechanic-btn mechanic-btn-call",children:"📞 Call"}),e.jsx("button",{className:"mechanic-btn mechanic-btn-chat",children:"💬 Chat"})]})]})]}),e.jsxs("div",{className:"tracking-updates-section",children:[e.jsx("h2",{className:"section-title",children:"Status Updates"}),e.jsx("div",{className:"tracking-updates-list",children:C.map((s,a)=>e.jsxs("div",{onClick:()=>T(y===a?null:a),className:`tracking-update-card ${y===a?"tracking-update-selected":""}`,children:[e.jsx("div",{className:"update-icon",children:s.icon}),e.jsxs("div",{className:"update-content",children:[e.jsx("div",{className:"update-message",children:s.message}),e.jsx("div",{className:"update-time",children:s.time})]})]},a))}),e.jsx("div",{className:"tracking-live-indicator",children:"🔄 Live updates - Refreshes every 5 seconds"})]}),e.jsxs("div",{className:"tracking-action-buttons",children:[e.jsx("button",{onClick:()=>u("/orders"),className:"tracking-btn-secondary",children:"← Back to Orders"}),e.jsx("button",{onClick:f,className:"tracking-btn-primary",children:"🔄 Refresh Tracking"})]}),e.jsx("div",{className:"tracking-gps-container",children:e.jsx(D,{orderId:c,mechanicId:n.mechanicId||"m1"})}),e.jsx("div",{className:"tracking-chat-container",children:e.jsx(M,{orderId:c,userRole:"customer",mechanicName:n.mechanicName||"Assigned Mechanic"})}),e.jsx("style",{children:`
    /* ===== TRACKING PREMIUM THEME ===== */
    
    /* Container */
    .tracking-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0;
      background: linear-gradient(180deg, #0b1220 0%, #0f1728 50%, #0d1422 100%);
      min-height: 100vh;
      position: relative;
    }

    /* ===== HERO SECTION ===== */
    .tracking-hero {
      background: linear-gradient(140deg, #101f3a 0%, #0d1728 46%, #0a1321 100%);
      border-bottom: 1px solid rgba(96, 165, 250, 0.14);
      box-shadow: 0 12px 28px rgba(8, 14, 24, 0.45), 0 0 60px rgba(59, 130, 246, 0.08);
      padding: 44px 24px;
      position: relative;
      overflow: hidden;
    }

    .tracking-hero::before {
      content: '';
      position: absolute;
      top: -40%;
      right: -20%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(96, 165, 250, 0.24) 0%, rgba(96, 165, 250, 0) 72%);
      filter: blur(18px);
      animation: tracking-float 20s ease-in-out infinite;
    }

    .tracking-hero::after {
      content: '';
      position: absolute;
      bottom: -30%;
      left: -15%;
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(139, 92, 246, 0) 68%);
      filter: blur(24px);
      animation: tracking-float 22s ease-in-out infinite reverse;
    }

    .tracking-back-btn {
      position: absolute;
      top: 20px;
      left: 20px;
      padding: 8px 16px;
      border-radius: 8px;
      border: 1px solid rgba(96, 165, 250, 0.14);
      background: rgba(96, 165, 250, 0.08);
      color: #60a5fa;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
    }

    .tracking-back-btn:hover {
      background: rgba(96, 165, 250, 0.1);
      border-color: rgba(96, 165, 250, 0.6);
      transform: translateX(-2px);
    }

    .tracking-hero-content {
      position: relative;
      z-index: 2;
      margin-bottom: 32px;
      text-align: center;
    }

    .tracking-title {
      font-size: 32px;
      font-weight: 900;
      letter-spacing: -0.8px;
      color: #e6edf7;
      margin: 0;
      background: linear-gradient(135deg, #e6edf7 0%, #a5d6ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .tracking-subtitle {
      font-size: 14px;
      color: rgba(166, 173, 186, 0.8);
      margin: 8px 0 0 0;
      font-weight: 500;
    }

    .tracking-header-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      position: relative;
      z-index: 2;
    }

    .tracking-header-item {
      background: rgba(16, 32, 58, 0.4);
      backdrop-filter: blur(12px);
      padding: 14px 16px;
      border-radius: 10px;
      border: 1px solid rgba(96, 165, 250, 0.16);
      transition: all 0.3s ease;
    }

    .tracking-header-item:hover {
      border-color: rgba(96, 165, 250, 0.16);
      background: rgba(16, 32, 58, 0.6);
    }

    .tracking-label {
      font-size: 11px;
      font-weight: 600;
      color: rgba(166, 173, 186, 0.7);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }

    .tracking-value {
      font-size: 16px;
      font-weight: 800;
      color: #60a5fa;
      letter-spacing: -0.3px;
    }

    .tracking-value-date {
      font-size: 15px;
      font-weight: 700;
      color: #a5d6ff;
    }

    .tracking-value-amount {
      font-size: 18px;
      font-weight: 900;
      color: #7dd3fc;
      letter-spacing: -0.3px;
    }

    .tracking-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 15px;
      font-weight: 700;
    }

    /* ===== PROGRESS SECTION ===== */
    .tracking-progress-section {
      padding: 32px 24px;
      position: relative;
    }

    .section-title {
      font-size: 20px;
      font-weight: 900;
      color: #e6edf7;
      margin: 0 0 16px 0;
      letter-spacing: -0.4px;
    }

    .tracking-timeline {
      display: grid;
      gap: 24px;
      margin-bottom: 32px;
      background: rgba(16, 32, 58, 0.25);
      backdrop-filter: blur(8px);
      padding: 24px;
      border-radius: 14px;
      border: 1px solid rgba(96, 165, 250, 0.12);
    }

    .tracking-stage {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      position: relative;
      animation: tracking-slide-up 0.6s var(--delay, 0s) ease-out both;
    }

    @keyframes tracking-slide-up {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .tracking-stage:nth-child(1) { --delay: 0.1s; }
    .tracking-stage:nth-child(2) { --delay: 0.2s; }
    .tracking-stage:nth-child(3) { --delay: 0.3s; }

    .tracking-completed .tracking-stage-circle {
      background: rgba(16, 185, 129, 0.15);
      border-color: #10b981;
      color: #10b981;
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.2);
    }

    .tracking-current .tracking-stage-circle {
      background: rgba(96, 165, 250, 0.1);
      border-color: #60a5fa;
      color: #60a5fa;
      box-shadow: 0 0 12px rgba(96, 165, 250, 0.18);
      animation: tracking-pulse 2s ease-in-out infinite;
    }

    @keyframes tracking-pulse {
      0%, 100% { box-shadow: 0 0 12px rgba(96, 165, 250, 0.18); }
      50% { box-shadow: 0 0 16px rgba(96, 165, 250, 0.1); }
    }

    .tracking-next .tracking-stage-circle {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.16);
      color: rgba(166, 173, 186, 0.6);
    }

    .tracking-stage-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 700;
      border: 2px solid;
      flex-shrink: 0;
      position: relative;
      z-index: 2;
      transition: all 0.3s ease;
    }

    .tracking-stage-content {
      flex: 1;
      padding-top: 2px;
    }

    .tracking-stage-label {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 4px;
      transition: color 0.3s ease;
    }

    .tracking-completed .tracking-stage-label {
      color: #10b981;
    }

    .tracking-current .tracking-stage-label {
      color: #60a5fa;
    }

    .tracking-next .tracking-stage-label {
      color: rgba(166, 173, 186, 0.6);
    }

    .tracking-stage-desc {
      font-size: 12px;
      color: rgba(166, 173, 186, 0.7);
      margin-top: 4px;
    }

    .tracking-connector {
      position: absolute;
      left: 21px;
      top: 44px;
      width: 2px;
      height: 60px;
      background: rgba(255, 255, 255, 0.1);
      z-index: 1;
    }

    .tracking-connector-done {
      background: linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.3) 100%);
    }

    /* Metrics Cards */
    .tracking-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 14px;
    }

    .tracking-metric-card {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.04) 100%);
      padding: 16px;
      border-radius: 12px;
      border: 1px solid rgba(96, 165, 250, 0.14);
      text-align: center;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .tracking-metric-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
      transition: left 0.6s ease;
    }

    .tracking-metric-card:hover {
      border-color: rgba(96, 165, 250, 0.16);
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%);
      box-shadow: 0 4px 16px rgba(96, 165, 250, 0.1);
    }

    .tracking-metric-card:hover::before {
      left: 100%;
    }

    .metric-label {
      font-size: 11px;
      font-weight: 600;
      color: rgba(166, 173, 186, 0.7);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 6px;
    }

    .metric-value {
      font-size: 18px;
      font-weight: 800;
      color: #60a5fa;
      letter-spacing: -0.3px;
    }

    /* ===== SERVICES SECTION ===== */
    .tracking-services-section {
      padding: 28px 24px;
      background: rgba(16, 32, 58, 0.2);
      border-top: 1px solid rgba(96, 165, 250, 0.08);
      border-bottom: 1px solid rgba(96, 165, 250, 0.08);
    }

    .tracking-services-list {
      display: grid;
      gap: 10px;
    }

    .tracking-service-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: rgba(16, 32, 58, 0.3);
      border-radius: 8px;
      border: 1px solid rgba(96, 165, 250, 0.1);
      font-size: 13px;
      transition: all 0.2s ease;
    }

    .tracking-service-item:hover {
      border-color: rgba(96, 165, 250, 0.12);
      background: rgba(16, 32, 58, 0.45);
    }

    .service-name {
      color: #a5d6ff;
      font-weight: 600;
    }

    .service-price {
      color: #7dd3fc;
      font-weight: 700;
    }

    /* ===== MECHANIC SECTION ===== */
    .tracking-mechanic-section {
      padding: 28px 24px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.03) 100%);
      border-top: 1px solid rgba(16, 185, 129, 0.12);
      border-bottom: 1px solid rgba(16, 185, 129, 0.08);
    }

    .tracking-mechanic-grid {
      display: grid;
      gap: 14px;
    }

    .mechanic-info-item {
      background: rgba(16, 185, 129, 0.08);
      padding: 12px;
      border-radius: 8px;
      border: 1px solid rgba(16, 185, 129, 0.16);
    }

    .mechanic-label {
      font-size: 11px;
      font-weight: 600;
      color: rgba(16, 185, 129, 0.7);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      margin-bottom: 4px;
    }

    .mechanic-value {
      font-size: 15px;
      font-weight: 700;
      color: #10b981;
    }

    .mechanic-value-rating {
      font-size: 14px;
      font-weight: 700;
      color: #fbbf24;
    }

    .mechanic-contact-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .mechanic-btn {
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(16, 185, 129, 0.3);
      background: rgba(16, 185, 129, 0.08);
      color: #10b981;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .mechanic-btn:hover {
      background: rgba(16, 185, 129, 0.15);
      border-color: rgba(16, 185, 129, 0.5);
      transform: translateY(-2px);
    }

    /* ===== UPDATES SECTION ===== */
    .tracking-updates-section {
      padding: 28px 24px;
    }

    .tracking-updates-list {
      display: grid;
      gap: 12px;
      margin-bottom: 16px;
    }

    .tracking-update-card {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 12px;
      padding: 14px;
      border-radius: 10px;
      background: rgba(96, 165, 250, 0.04);
      border: 1px solid rgba(96, 165, 250, 0.12);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      animation: tracking-update-enter 0.5s ease-out backwards;
    }

    @keyframes tracking-update-enter {
      from {
        opacity: 0;
        transform: translateX(-8px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .tracking-update-card:nth-child(1) { animation-delay: 0.1s; }
    .tracking-update-card:nth-child(2) { animation-delay: 0.2s; }
    .tracking-update-card:nth-child(3) { animation-delay: 0.3s; }

    .tracking-update-selected {
      background: linear-gradient(135deg, rgba(96, 165, 250, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%);
      border-color: rgba(96, 165, 250, 0.16);
      box-shadow: 0 4px 16px rgba(96, 165, 250, 0.1);
    }

    .update-icon {
      font-size: 20px;
      display: flex;
      align-items: center;
    }

    .update-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .update-message {
      font-size: 13px;
      font-weight: 700;
      color: #a5d6ff;
    }

    .update-time {
      font-size: 11px;
      color: rgba(166, 173, 186, 0.6);
      margin-top: 2px;
    }

    .tracking-live-indicator {
      padding: 12px;
      border-radius: 8px;
      background: rgba(96, 165, 250, 0.08);
      border: 1px dashed rgba(96, 165, 250, 0.24);
      color: #60a5fa;
      font-size: 12px;
      text-align: center;
      font-weight: 600;
    }

    /* ===== ACTION BUTTONS ===== */
    .tracking-action-buttons {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      padding: 24px;
    }

    .tracking-btn-primary {
      padding: 12px;
      border-radius: 10px;
      border: none;
      background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(96, 165, 250, 0.18);
      position: relative;
      overflow: hidden;
    }

    .tracking-btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      transition: left 0.5s ease;
    }

    .tracking-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(96, 165, 250, 0.14);
    }

    .tracking-btn-primary:hover::before {
      left: 100%;
    }

    .tracking-btn-secondary {
      padding: 12px;
      border-radius: 10px;
      border: 1px solid rgba(96, 165, 250, 0.18);
      background: rgba(96, 165, 250, 0.08);
      color: #60a5fa;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tracking-btn-secondary:hover {
      background: rgba(96, 165, 250, 0.1);
      border-color: rgba(96, 165, 250, 0.5);
      transform: translateY(-2px);
    }

    /* ===== GPS & CHAT CONTAINERS ===== */
    .tracking-gps-container,
    .tracking-chat-container {
      padding: 24px;
      background: rgba(16, 32, 58, 0.2);
      margin: 0;
    }

    .tracking-gps-container {
      border-top: 1px solid rgba(96, 165, 250, 0.08);
      border-bottom: 1px solid rgba(96, 165, 250, 0.08);
    }

    .tracking-chat-container {
      border-top: 1px solid rgba(96, 165, 250, 0.08);
      padding-bottom: 40px;
    }

    /* ===== ANIMATIONS ===== */
    @keyframes tracking-float {
      0%, 100% { transform: translate(0, 0); }
      33% { transform: translate(20px, -10px); }
      66% { transform: translate(-10px, 20px); }
    }

    /* ===== RESPONSIVE DESIGN ===== */
    @media (max-width: 768px) {
      .tracking-hero {
        padding: 32px 16px;
      }

      .tracking-title {
        font-size: 24px;
      }

      .tracking-header-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }

      .tracking-back-btn {
        font-size: 12px;
        padding: 6px 12px;
      }

      .section-title {
        font-size: 18px;
        margin-bottom: 20px;
      }

      .tracking-metrics {
        grid-template-columns: 1fr;
      }

      .tracking-action-buttons {
        padding: 16px;
      }

      .mechanic-contact-buttons {
        grid-template-columns: 1fr;
      }

      .tracking-timeline {
        padding: 16px;
        gap: 20px;
      }
    }

    @media (max-width: 480px) {
      .tracking-container {
        padding: 0;
      }

      .tracking-hero {
        padding: 24px 12px;
      }

      .tracking-progress-section,
      .tracking-services-section,
      .tracking-mechanic-section,
      .tracking-updates-section,
      .tracking-action-buttons,
      .tracking-gps-container,
      .tracking-chat-container {
        padding: 16px 12px;
      }

      .tracking-back-btn {
        top: 12px;
        left: 12px;
        font-size: 11px;
      }

      .tracking-title {
        font-size: 20px;
      }

      .tracking-subtitle {
        font-size: 12px;
      }

      .tracking-header-grid {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .section-title {
        font-size: 16px;
      }

      .tracking-stage-circle {
        width: 36px;
        height: 36px;
        font-size: 16px;
      }

      .tracking-connector {
        left: 17px;
        height: 50px;
        top: 36px;
      }

      .tracking-action-buttons {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .metric-value {
        font-size: 16px;
      }

      .update-message {
        font-size: 12px;
      }
    }
  `})]})}export{Y as default};
