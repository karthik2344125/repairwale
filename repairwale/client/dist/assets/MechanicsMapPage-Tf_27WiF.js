import{r as a,j as o}from"./index-BgBzfigI.js";import{L as g,l as X}from"./index-BtGou90v.js";delete g.Icon.Default.prototype._getIconUrl;g.Icon.Default.mergeOptions({iconRetinaUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",iconUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",shadowUrl:"https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"});const H=(h,c,d=40)=>g.divIcon({html:`
      <div style="
        position: relative;
        width: ${d}px;
        height: ${d}px;
      ">
        <div style="
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: ${d}px;
          height: ${d}px;
          background: linear-gradient(135deg, ${c}dd 0%, ${c} 100%);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg) translateX(-50%);
          border: 3px solid white;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3), 0 0 0 2px ${c}33;
        "></div>
        <div style="
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          font-size: ${d*.5}px;
          z-index: 1;
        ">${h}</div>
      </div>
    `,className:"custom-marker",iconSize:[d,d],iconAnchor:[d/2,d],popupAnchor:[0,-d]}),_=H("🔧","#10b981",44),q=H("📍","#3b82f6",36),J=H("⭐","#f59e0b",48);function Q({mechanics:h=[],userLocation:c=null,onMechanicSelect:d=null,searchRadius:C=10,enableRealTime:m=!1,enableClustering:Y=!1,showRadius:E=!0,height:T="600px",className:x=""}){const i=a.useRef(null),R=a.useRef(null),w=a.useRef([]),v=a.useRef(null),k=a.useRef(null);a.useRef(null);const M=a.useRef(null),S=a.useRef(null),[y,A]=a.useState(!1),[z,N]=a.useState(!1),[l,F]=a.useState(c),[e,n]=a.useState(null),[f,B]=a.useState({}),[u,b]=a.useState(!1);a.useEffect(()=>{if(!R.current||i.current)return;const t=l||{lat:28.6139,lng:77.209},r=g.map(R.current,{zoomControl:!1,attributionControl:!0,minZoom:3,maxZoom:19,zoomAnimation:!0,fadeAnimation:!0,markerZoomAnimation:!0}).setView([t.lat,t.lng],13);return i.current=r,g.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",maxZoom:19}).addTo(r),g.control.zoom({position:"bottomright"}).addTo(r),g.control.scale({position:"bottomleft",imperial:!1}).addTo(r),N(!0),()=>{S.current&&S.current.disconnect(),i.current&&(i.current.remove(),i.current=null)}},[]),a.useEffect(()=>{if(!m)return;const t=X("http://localhost:3000",{reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return S.current=t,t.on("connect",()=>{console.log("🟢 Map: Real-time connection established"),b(!0),l&&t.emit("user:location",{userId:"current-user",lat:l.lat,lng:l.lng,timestamp:Date.now()})}),t.on("mechanic:location-update",r=>{B(s=>({...s,[r.mechanicId]:{lat:r.lat,lng:r.lng,timestamp:r.timestamp}}))}),t.on("disconnect",()=>{console.log("🔴 Map: Real-time connection lost"),b(!1)}),()=>{t&&t.disconnect()}},[m,l]),a.useEffect(()=>{if(!i.current||!z)return;v.current&&(i.current.removeLayer(v.current),v.current=null),k.current&&(i.current.removeLayer(k.current),k.current=null);const t=l||c;t&&(v.current=g.marker([t.lat,t.lng],{icon:q,zIndexOffset:1e3,riseOnHover:!0}).addTo(i.current),v.current.bindPopup(`
      <div style="min-width: 180px; font-family: system-ui, -apple-system, sans-serif;">
        <div style="font-weight: 700; font-size: 16px; color: #1e293b; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          📍 Your Location
        </div>
        <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">
          📌 ${t.lat.toFixed(4)}, ${t.lng.toFixed(4)}
        </div>
        <div style="font-size: 12px; color: #94a3b8;">
          ${new Date().toLocaleTimeString()}
        </div>
      </div>
    `,{className:"custom-popup"}),E&&C>0&&(k.current=g.circle([t.lat,t.lng],{radius:C*1e3,color:"#3b82f6",fillColor:"#3b82f6",fillOpacity:.08,weight:2,opacity:.5,dashArray:"10, 10"}).addTo(i.current)),i.current.setView([t.lat,t.lng],13,{animate:!0,duration:1}))},[l,c,C,E,z]);const j=a.useCallback((t,r)=>{const s=K=>K*Math.PI/180,$=s(r.lat-t.lat),D=s(r.lng-t.lng),L=s(t.lat),P=s(r.lat),O=Math.sin($/2)**2+Math.cos(L)*Math.cos(P)*Math.sin(D/2)**2;return 2*6371*Math.asin(Math.sqrt(O))},[]);a.useEffect(()=>{if(!(!i.current||!z)&&(w.current.forEach(t=>i.current.removeLayer(t)),w.current=[],h.forEach(t=>{const r=f[t.id],s=r||{lat:t.lat,lng:t.lng},p=l||c?j(l||c,s):null,$=(e==null?void 0:e.id)===t.id,D=$?J:_,L=g.marker([s.lat,s.lng],{icon:D,riseOnHover:!0,riseOffset:250}).addTo(i.current),P=Array.isArray(t.services)?t.services:typeof t.services=="string"&&t.services.trim()?[t.services]:[],O=`
        <div style="min-width: 220px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="font-weight: 700; font-size: 16px; color: #1e293b; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            🔧 ${t.name}
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px;">
            <div style="font-size: 13px; color: #64748b; display: flex; align-items: center; gap: 6px;">
              ⭐ <span style="font-weight: 700; color: #f59e0b;">${(t.rating||4.5).toFixed(1)}</span>
              ${t.reviewCount?`<span style="font-size: 11px;">(${t.reviewCount} reviews)</span>`:""}
            </div>
            ${p?`
              <div style="font-size: 13px; color: #64748b; display: flex; align-items: center; gap: 6px;">
                📍 <span style="font-weight: 600; color: #3b82f6;">${p.toFixed(2)} km</span> away
              </div>
            `:""}
            ${r?`
              <div style="font-size: 12px; color: #10b981; display: flex; align-items: center; gap: 6px;">
                🟢 <span style="font-weight: 600;">Live Tracking</span>
              </div>
            `:""}
            ${P.length>0?`
              <div style="font-size: 12px; color: #8b5cf6; margin-top: 4px;">
                ${P.slice(0,2).join(", ")}${P.length>2?"...":""}
              </div>
            `:""}
          </div>
          <button 
            id="select-mechanic-${t.id}"
            style="
              width: 100%;
              padding: 10px 16px;
              background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 700;
              font-size: 14px;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
              transition: all 0.2s;
            "
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(59, 130, 246, 0.4)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)'"
          >
            ${$?"✓ Selected":"Select Mechanic"}
          </button>
        </div>
      `;L.bindPopup(O,{className:"custom-popup",maxWidth:280,closeButton:!0}),L.on("click",()=>{I(t)}),L.bindTooltip(`
        <div style="font-weight: 700; font-size: 13px;">
          ${t.name}<br/>
          <span style="font-size: 11px; font-weight: 500;">⭐ ${(t.rating||4.5).toFixed(1)} ${p?`• ${p.toFixed(1)}km`:""}</span>
        </div>
      `,{direction:"top",offset:[0,-20],opacity:.95}),w.current.push(L)}),h.length>0&&(l||c))){const t=g.latLngBounds([[(l||c).lat,(l||c).lng],...h.map(r=>{const s=f[r.id];return s?[s.lat,s.lng]:[r.lat,r.lng]})]);i.current.fitBounds(t,{padding:[80,80],maxZoom:15,animate:!0,duration:1})}},[h,f,l,c,e,z,j]);const I=a.useCallback(t=>{n(t),M.current&&i.current&&(i.current.removeLayer(M.current),M.current=null);const r=l||c;if(r&&i.current){const p=f[t.id]||{lat:t.lat,lng:t.lng};M.current=g.polyline([[r.lat,r.lng],[p.lat,p.lng]],{color:"#3b82f6",weight:4,opacity:.7,dashArray:"12, 8",lineJoin:"round",lineCap:"round"}).addTo(i.current);const $=g.latLngBounds([r.lat,r.lng],[p.lat,p.lng]);i.current.fitBounds($,{padding:[100,100],animate:!0})}d&&d(t),setTimeout(()=>{const s=document.getElementById(`select-mechanic-${t.id}`);s&&(s.textContent="✓ Selected",s.style.background="linear-gradient(135deg, #10b981 0%, #059669 100%)")},100)},[l,c,f,d]),W=a.useCallback(()=>{if(!navigator.geolocation){alert("❌ Geolocation not supported by your browser");return}A(!0),navigator.geolocation.getCurrentPosition(t=>{var s;const r={lat:t.coords.latitude,lng:t.coords.longitude};F(r),A(!1),m&&((s=S.current)!=null&&s.connected)&&S.current.emit("user:location",{userId:"current-user",...r,timestamp:Date.now()}),i.current&&(g.popup().setLatLng([r.lat,r.lng]).setContent("📍 <strong>Location updated!</strong>").openOn(i.current),setTimeout(()=>{var p;return(p=i.current)==null?void 0:p.closePopup()},2e3))},t=>{console.error("Location error:",t),A(!1),alert("⚠️ Unable to get your location. Please check permissions.")},{enableHighAccuracy:!0,timeout:1e4,maximumAge:3e4})},[m]),G=a.useCallback(()=>{if(!i.current)return;const t=l||c;t&&i.current.setView([t.lat,t.lng],13,{animate:!0,duration:1})},[l,c]),Z=a.useCallback(()=>{if(!i.current||h.length===0)return;const t=l||c;if(!t)return;const r=g.latLngBounds([[t.lat,t.lng],...h.map(s=>{const p=f[s.id];return p?[p.lat,p.lng]:[s.lat,s.lng]})]);i.current.fitBounds(r,{padding:[60,60],animate:!0,duration:1})},[h,f,l,c]);return o.jsxs("div",{style:{position:"relative",width:"100%",height:T,borderRadius:"16px",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.12)",border:"1px solid rgba(255,255,255,0.1)"},className:x,children:[o.jsx("div",{ref:R,style:{width:"100%",height:"100%",background:"#e5e7eb"}}),o.jsxs("div",{style:{position:"absolute",top:"16px",left:"16px",display:"flex",flexDirection:"column",gap:"8px",zIndex:1e3},children:[o.jsx("button",{onClick:W,disabled:y,title:"Find My Location",style:{width:"48px",height:"48px",background:y?"rgba(59, 130, 246, 0.3)":"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(10px)",border:"2px solid rgba(59, 130, 246, 0.3)",borderRadius:"12px",cursor:y?"not-allowed":"pointer",boxShadow:"0 4px 16px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"24px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",transform:y?"scale(0.95)":"scale(1)"},onMouseEnter:t=>!y&&(t.target.style.transform="scale(1.05)"),onMouseLeave:t=>!y&&(t.target.style.transform="scale(1)"),children:y?"⏳":"📍"}),o.jsx("button",{onClick:G,title:"Recenter Map",style:{width:"48px",height:"48px",background:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(10px)",border:"2px solid rgba(147, 197, 253, 0.3)",borderRadius:"12px",cursor:"pointer",boxShadow:"0 4px 16px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},onMouseEnter:t=>t.target.style.transform="scale(1.05)",onMouseLeave:t=>t.target.style.transform="scale(1)",children:"🎯"}),o.jsx("button",{onClick:Z,title:"Show All Mechanics",style:{width:"48px",height:"48px",background:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(10px)",border:"2px solid rgba(147, 197, 253, 0.3)",borderRadius:"12px",cursor:"pointer",boxShadow:"0 4px 16px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},onMouseEnter:t=>t.target.style.transform="scale(1.05)",onMouseLeave:t=>t.target.style.transform="scale(1)",children:"🗺️"})]}),m&&o.jsxs("div",{style:{position:"absolute",top:"72px",right:"16px",padding:"10px 14px",background:u?"linear-gradient(135deg, #10b981 0%, #059669 100%)":"linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",backdropFilter:"blur(10px)",color:"white",borderRadius:"10px",fontSize:"13px",fontWeight:"700",display:"flex",alignItems:"center",gap:"8px",zIndex:1e3,boxShadow:"0 4px 16px rgba(0,0,0,0.2)",animation:"slideIn 0.5s ease-out"},children:[o.jsx("div",{style:{width:"8px",height:"8px",background:"white",borderRadius:"50%",animation:u?"pulse 2s infinite":"none"}}),u?"🟢 Live":"🔴 Offline"]}),o.jsx("style",{children:`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.3); }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
          border: 1px solid rgba(147, 197, 253, 0.3);
        }
        .custom-popup .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.98);
        }
        .leaflet-tooltip {
          background: rgba(30, 41, 59, 0.95);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
          padding: 8px 12px;
          color: white;
        }
        .leaflet-tooltip-top:before {
          border-top-color: rgba(30, 41, 59, 0.95);
        }
        .custom-marker {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .custom-marker:hover {
          z-index: 1000 !important;
          transform: scale(1.1);
        }
        @media (max-width: 768px) {
          .custom-popup .leaflet-popup-content-wrapper {
            min-width: 200px !important;
          }
        }
      `})]})}const U={lat:28.6139,lng:77.209};function et(){const[h,c]=a.useState([]),[d,C]=a.useState(null),[m,Y]=a.useState(10),[E,T]=a.useState([]),[x,i]=a.useState(null),[R,w]=a.useState(!0),[v,k]=a.useState(null),[M,S]=a.useState("distance");a.useEffect(()=>{if(!navigator.geolocation){k("Geolocation not supported by your browser"),w(!1);return}navigator.geolocation.getCurrentPosition(e=>{const n={lat:e.coords.latitude,lng:e.coords.longitude};C(n),w(!1),k(null)},e=>{console.error("Geolocation error:",e),k("Location access denied. Using default location."),w(!1),C(U)},{enableHighAccuracy:!0,timeout:1e4,maximumAge:0})},[]);const y=(e,n)=>{const f=Math.random()*2*Math.PI,u=n/6371,b=e.lat*Math.PI/180,j=e.lng*Math.PI/180,I=Math.asin(Math.sin(b)*Math.cos(u)+Math.cos(b)*Math.sin(u)*Math.cos(f)),W=j+Math.atan2(Math.sin(f)*Math.sin(u)*Math.cos(b),Math.cos(u)-Math.sin(b)*Math.sin(I));return{lat:I*180/Math.PI,lng:W*180/Math.PI}},A=()=>{const e=["AutoCare","QuickFix","SpeedyWrench","Metro Motors","Prime Auto","Elite Garage","Swift Fix"],n=["Ravi","Aman","Sanjay","Vikas","Arjun","Rajesh","Kumar"];return`${n[Math.floor(Math.random()*n.length)]} ${e[Math.floor(Math.random()*e.length)]}`},z=e=>{if(!e)return[];const n=[],f=["Engine Repair","Brake Service","AC Repair","General Maintenance","Oil Change","Battery Replacement"],B=[4.8,4.6,4.9,4.5,4.7,4.4,4.8,4.6,4.5,4.7];for(let u=0;u<10;u++){const b=1+Math.random()*(m-1),j=y(e,b),I=B[u];n.push({id:`mech_${u}`,name:A(),lat:j.lat,lng:j.lng,rating:I,distance:Math.round(b*10)/10,services:[f[Math.floor(Math.random()*f.length)]]})}return n.sort((u,b)=>u.distance-b.distance)};a.useEffect(()=>{T(z(d||U))},[d,m]);const l=[...h.length>0?h:E].sort((e,n)=>M==="rating"?(n.rating||0)-(e.rating||0):(e.distance||999)-(n.distance||999)),F=e=>Array.isArray(e)?e.join(", "):typeof e=="string"?e:"";return o.jsxs("div",{style:{height:"100vh",width:"100%",display:"flex",flexDirection:"column",background:"#1a2a4a",overflow:"hidden"},children:[o.jsx("div",{style:{background:"#243a5a",borderBottom:"1px solid #3a5a8a",padding:"14px 18px",boxShadow:"0 2px 8px rgba(0,0,0,0.4)",zIndex:100},children:o.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:o.jsx("h1",{style:{margin:0,fontSize:"24px",fontWeight:"700",color:"#fff"},children:"Nearby Mechanics"})})}),o.jsxs("div",{style:{flex:1,display:"flex",overflow:"hidden",gap:0,flexDirection:"row"},children:[o.jsxs("div",{style:{flex:1,position:"relative",overflow:"hidden",background:"#1a2a4a",display:"flex"},children:[o.jsx(Q,{mechanics:l,userLocation:d||U,onMechanicSelect:e=>i(e),searchRadius:m,enableRealTime:!1,showRadius:!0,height:"100%"}),R&&o.jsx("div",{style:{position:"absolute",bottom:"20px",left:"20px",background:"rgba(33, 150, 243, 0.95)",color:"white",padding:"10px 14px",borderRadius:"8px",fontSize:"12px",fontWeight:"600",backdropFilter:"blur(8px)",zIndex:500},children:"📍 Getting location..."}),!R&&o.jsx("div",{style:{position:"absolute",bottom:"20px",left:"20px",background:v?"rgba(245, 158, 11, 0.95)":"rgba(76, 175, 80, 0.95)",color:"white",padding:"10px 14px",borderRadius:"8px",fontSize:"12px",fontWeight:"600",backdropFilter:"blur(8px)",zIndex:500,maxWidth:"260px"},children:v?"📍 Using default location":"📍 Location active"})]}),o.jsxs("div",{style:{width:"360px",minWidth:"320px",maxWidth:"40%",height:"100%",background:"#1a2a4a",borderLeft:"1px solid #3a5a8a",display:"flex",flexDirection:"column",overflow:"hidden"},children:[o.jsxs("div",{style:{padding:"14px",borderBottom:"1px solid #3a5a8a",background:"#162240",flex:"0 0 auto",minHeight:"70px"},children:[o.jsxs("h2",{style:{margin:"0 0 10px 0",fontSize:"14px",fontWeight:"600",color:"#fff"},children:[l.length," Near You"]}),o.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[o.jsx("label",{style:{fontSize:"11px",fontWeight:"600",color:"#aaa",flex:"0 0 auto"},children:"Sort:"}),o.jsxs("select",{value:M,onChange:e=>S(e.target.value),style:{padding:"5px 8px",border:"1px solid #3a5a8a",borderRadius:"5px",fontSize:"11px",background:"#243a5a",color:"#fff",cursor:"pointer",flex:1},children:[o.jsx("option",{value:"distance",children:"📍 Distance"}),o.jsx("option",{value:"rating",children:"⭐ Rating"})]})]})]}),o.jsx("div",{style:{flex:1,overflowY:"auto",padding:"10px",background:"#1a2a4a"},children:l.length===0?o.jsxs("div",{style:{padding:"30px 16px",textAlign:"center",color:"#888"},children:[o.jsx("p",{style:{margin:"0 0 6px 0",fontSize:"13px"},children:"No mechanics found"}),o.jsx("p",{style:{margin:0,fontSize:"11px"},children:"Increase radius"})]}):l.map(e=>o.jsxs("div",{onClick:()=>i(e),style:{padding:"12px",marginBottom:"8px",borderRadius:"10px",background:(x==null?void 0:x.id)===e.id?"#2a5a9a":"#223050",border:(x==null?void 0:x.id)===e.id?"2px solid #2196f3":"1px solid #3a5a8a",cursor:"pointer",transition:"all 0.2s",minHeight:"110px",display:"flex",flexDirection:"column"},onMouseEnter:n=>{(x==null?void 0:x.id)!==e.id&&(n.currentTarget.style.background="#2a3a5a",n.currentTarget.style.borderColor="#5a7aaa")},onMouseLeave:n=>{(x==null?void 0:x.id)!==e.id&&(n.currentTarget.style.background="#223050",n.currentTarget.style.borderColor="#3a5a8a")},children:[o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"6px",gap:"8px"},children:[o.jsx("h3",{style:{margin:0,fontSize:"13px",fontWeight:"700",color:"#fff",flex:1,wordBreak:"break-word",lineHeight:"1.3"},children:e.name}),o.jsxs("span",{style:{fontSize:"11px",fontWeight:"600",color:"#ffd700",background:"rgba(255, 215, 0, 0.15)",padding:"2px 6px",borderRadius:"4px",whiteSpace:"nowrap",flexShrink:0},children:["⭐ ",e.rating]})]}),o.jsxs("p",{style:{margin:"0 0 6px 0",fontSize:"11px",color:"#aaa"},children:["📍 ",e.distance," km"]}),e.services&&o.jsxs("p",{style:{margin:"0 0 8px 0",fontSize:"10px",color:"#999",fontStyle:"italic"},children:["🔧 ",F(e.services)]}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginTop:"auto"},children:[o.jsx("button",{onClick:n=>{n.stopPropagation(),alert(`Calling ${e.name}...`)},style:{padding:"6px 8px",fontSize:"11px",fontWeight:"600",border:"none",borderRadius:"5px",background:"#2196f3",color:"white",cursor:"pointer",transition:"all 0.2s"},onMouseEnter:n=>n.target.style.background="#1976d2",onMouseLeave:n=>n.target.style.background="#2196f3",children:"📞 Call"}),o.jsx("button",{onClick:n=>{n.stopPropagation(),alert(`Chat with ${e.name}`)},style:{padding:"6px 8px",fontSize:"11px",fontWeight:"600",border:"1px solid #2196f3",borderRadius:"5px",background:"transparent",color:"#2196f3",cursor:"pointer",transition:"all 0.2s"},onMouseEnter:n=>{n.target.style.background="#2196f3",n.target.style.color="white"},onMouseLeave:n=>{n.target.style.background="transparent",n.target.style.color="#2196f3"},children:"💬 Chat"})]})]},e.id))})]})]})]})}export{et as default};
