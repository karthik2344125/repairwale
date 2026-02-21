import{r as p,u as me,a as xe,j as e,s as o}from"./index-TLEbH3MQ.js";import{B as t}from"./Button-BfaPFI1m.js";import{e as he,g as fe,a as ge,s as v,b as j}from"./roleData-K1rJ6LBK.js";const ue=`
.user-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #0b1220 0%, #152239 100%);
  padding: 40px 20px;
}

.user-container {
  max-width: 1200px;
  margin: 0 auto;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #0d1425 0%, #152239 100%);
  border-radius: 16px;
  border: 1px solid rgba(30, 58, 138, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.avatar-lg {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e3a8a, #1e40af);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.5);
}

.header-text h2 {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.header-text p {
  color: #9aa7bf;
  margin: 0;
  font-size: 14px;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.profile-card {
  background: #101a2a;
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.profile-card:hover {
  box-shadow: 0 4px 24px rgba(30, 58, 138, 0.4);
  border-color: rgba(30, 58, 138, 0.5);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}

.card-header span {
  font-size: 24px;
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px 0;
  border-top: 1px solid rgba(30, 58, 138, 0.2);
  border-bottom: 1px solid rgba(30, 58, 138, 0.2);
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-num {
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
  display: block;
  height: 32px;
  line-height: 32px;
}

.stat-label {
  font-size: 11px;
  color: #9aa7bf;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.info-item {
  padding: 12px 0;
  border-bottom: 1px solid rgba(30, 58, 138, 0.1);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 12px;
  color: #9aa7bf;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  font-weight: 600;
}

.info-value {
  font-size: 14px;
  color: #ffffff;
  font-weight: 500;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.15), rgba(30, 58, 138, 0.08));
  border-radius: 10px;
  margin-bottom: 12px;
  border: 1px solid rgba(30, 58, 138, 0.2);
  transition: all 0.3s ease;
}

.list-item:hover {
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.25), rgba(30, 58, 138, 0.15));
  border-color: rgba(30, 58, 138, 0.5);
  box-shadow: 0 2px 8px rgba(30, 58, 138, 0.3);
}

.list-info {
  flex: 1;
}

.list-primary {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.list-secondary {
  font-size: 12px;
  color: #9aa7bf;
  margin-top: 2px;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  background: rgba(30, 58, 138, 0.3);
  color: #3b82f6;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-top: 4px;
}

.btn-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.3), rgba(30, 58, 138, 0.2));
  border: 1px solid rgba(30, 58, 138, 0.4);
  border-radius: 6px;
  color: #3b82f6;
  font-size: 12px;
  font-weight: 600;
  margin: 4px;
}

.delete-btn {
  color: #ef4444;
  cursor: pointer;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

.availability-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-top: 12px;
}

.day-btn {
  padding: 8px;
  background: rgba(30, 58, 138, 0.15);
  border: 1px solid rgba(30, 58, 138, 0.3);
  border-radius: 6px;
  color: #9aa7bf;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.day-btn.active {
  background: linear-gradient(135deg, #1e3a8a, #1e40af);
  border-color: #1e3a8a;
  color: white;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: rgba(30, 58, 138, 0.3);
  border: 1px solid rgba(30, 58, 138, 0.4);
  color: #3b82f6;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.2s;
}

.qty-btn:hover {
  background: rgba(30, 58, 138, 0.5);
}

.full-section {
  grid-column: 1 / -1;
}

.role-badge {
  padding: 6px 12px;
  background: linear-gradient(135deg, #1e3a8a, #1e40af);
  color: white;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  display: inline-block;
}

.status-badge {
  padding: 4px 8px;
  background: rgba(34, 197, 94, 0.2);
  color: #15803d;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .stat-row {
    grid-template-columns: 1fr;
  }
  .user-header {
    flex-direction: column;
    text-align: center;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, #0d1425 0%, #152239 100%);
  border: 1px solid rgba(30, 58, 138, 0.4);
  border-radius: 16px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-close {
  background: rgba(30, 58, 138, 0.2);
  border: 1px solid rgba(30, 58, 138, 0.3);
  color: #9aa7bf;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.4);
  color: #ef4444;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #9aa7bf;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(30, 58, 138, 0.15);
  border: 1px solid rgba(30, 58, 138, 0.3);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(30, 58, 138, 0.25);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #6b7280;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-save {
  flex: 1;
  padding: 12px;
  background: linear-gradient(135deg, #1e3a8a, #1e40af);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(30, 58, 138, 0.4);
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  background: rgba(30, 58, 138, 0.15);
  color: #9aa7bf;
  border: 1px solid rgba(30, 58, 138, 0.3);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: rgba(30, 58, 138, 0.25);
  color: #ffffff;
}
`;function we(){var L,V,M,R,U,I,T;const[n,S]=p.useState(null),P=me(),{role:d,completeLogout:be,loading:ve}=xe(),[z,E]=p.useState(!0),[i,h]=p.useState(null),[l,f]=p.useState(null),[B,g]=p.useState(!1),[W,N]=p.useState(!1),[$,y]=p.useState(!1),[k,C]=p.useState(null),[m,u]=p.useState({brand:"",model:"",plate:""}),[c,b]=p.useState({label:"",line:"",city:"",pincode:""}),[x,A]=p.useState({fullName:"",phone:"",email:""});p.useEffect(()=>{try{const a=localStorage.getItem("repairwale_user");a&&S(JSON.parse(a));const s=d||localStorage.getItem("rw_role_locked")||"customer";if(console.log("[UserPage] Current role:",s),he(s),s==="customer"){const r=fe();console.log("[UserPage] Loading customer data:",r),h(r)}if(s==="mechanic"){const r=ge();console.log("[UserPage] Loading mechanic data:",r),f(r)}E(!1)}catch(a){console.error("[UserPage] Error loading data:",a),E(!1)}},[d]);const Y=((n==null?void 0:n.fullName)||"User").split(" ").map(a=>a[0]).join("").slice(0,2).toUpperCase(),w=n!=null&&n.joinedDate?new Date(n.joinedDate):null,H=w?Math.max(0,Math.floor((Date.now()-w.getTime())/(1e3*60*60*24))):0,D=()=>{u({brand:"",model:"",plate:""}),C(null),g(!0)},O=a=>{u({brand:a.brand,model:a.model,plate:a.plate}),C(a.id),g(!0)},_=()=>{if(!m.brand.trim()){alert("Please enter vehicle brand");return}if(!i){alert("Customer data not loaded. Please refresh the page.");return}if(k){const a={...i,vehicles:(i.vehicles||[]).map(s=>s.id===k?{...s,...m}:s)};h(a),v(a),o("✓ Vehicle updated")}else{const a=i.vehicles||[],s={id:`VH-${Date.now()}`,...m,primary:a.length===0},r={...i,vehicles:[...a,s]};h(r),v(r),o(`✓ Added ${m.brand} ${m.model}`)}g(!1),u({brand:"",model:"",plate:""}),C(null)},q=a=>{if(!i||!i.vehicles)return;const s=i.vehicles.find(r=>r.id===a);s&&O(s)},J=a=>{if(!i||!confirm("Remove vehicle?"))return;const s={...i,vehicles:(i.vehicles||[]).filter(r=>r.id!==a)};h(s),v(s),o("✓ Vehicle removed")},Q=a=>{if(!i)return;const s={...i,vehicles:(i.vehicles||[]).map(r=>({...r,primary:r.id===a}))};h(s),v(s),o("✓ Primary vehicle set")},F=()=>{b({label:"",line:"",city:"",pincode:""}),N(!0)},X=()=>{if(!c.label.trim()||!c.line.trim()){alert("Please enter address label and line 1");return}if(!i){alert("Customer data not loaded. Please refresh the page.");return}const a={id:`ADDR-${Date.now()}`,...c},s={...i,addresses:[...i.addresses||[],a]};h(s),v(s),o(`✓ Added ${c.label}`),N(!1),b({label:"",line:"",city:"",pincode:""})},G=a=>{if(!i||!confirm("Remove address?"))return;const s={...i,addresses:(i.addresses||[]).filter(r=>r.id!==a)};h(s),v(s),o("✓ Address removed")},K=()=>{const a=prompt("Add skill?");if(!a)return;const s={...l,skills:[...new Set([...(l==null?void 0:l.skills)||[],a])]};f(s),j(s),o(`✓ Added ${a}`)},Z=a=>{const s={...l,skills:((l==null?void 0:l.skills)||[]).filter(r=>r!==a)};f(s),j(s)},ee=a=>{var r;const s={...l,availability:{...(l==null?void 0:l.availability)||{},[a]:!((r=l==null?void 0:l.availability)!=null&&r[a])}};f(s),j(s)},ae=()=>{const a=prompt("Certification name?");if(!a)return;const s=parseInt(prompt("Year?")||`${new Date().getFullYear()}`,10),r={...l,certifications:[...(l==null?void 0:l.certifications)||[],{id:`CERT-${Date.now()}`,name:a,year:s}]};f(r),j(r),o(`✓ Added ${a}`)},se=()=>{const a=prompt("Service area name?");if(!a)return;const s=parseInt(prompt("Radius (km)?")||"5",10),r={...l,serviceAreas:[...(l==null?void 0:l.serviceAreas)||[],{id:`AREA-${Date.now()}`,area:a,km:s}]};f(r),j(r),o("✓ Area added")},ie=a=>{const s={...l,serviceAreas:((l==null?void 0:l.serviceAreas)||[]).filter(r=>r.id!==a)};f(s),j(s)},le=()=>{A({fullName:n.fullName||"",phone:n.phone||"",email:n.email||""}),y(!0)},re=()=>{if(!x.fullName.trim()){alert("Please enter your full name");return}const a={...n,fullName:x.fullName,phone:x.phone};S(a),localStorage.setItem("repairwale_user",JSON.stringify(a)),o("✓ Profile updated"),y(!1)},te=()=>{le()},ne=()=>{if(!prompt("Current password?"))return;const s=prompt("New password?");if(!s)return;if(prompt("Confirm password?")!==s){alert("Passwords do not match");return}o("✓ Password changed successfully")},oe=()=>{P("/favorites")},de=()=>{o("💳 Payment methods will be available soon")},ce=()=>{o("📍 Manage your service areas above")},pe=()=>{o("📅 Set your availability above")};return z||!n?e.jsxs("div",{style:{padding:"60px 20px",textAlign:"center",color:"#9aa7bf",minHeight:"50vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[e.jsx("div",{style:{width:48,height:48,border:"3px solid rgba(255,255,255,0.1)",borderTopColor:"rgba(255,255,255,0.6)",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("div",{style:{marginTop:16},children:"Loading profile..."})]}):e.jsxs("div",{className:"user-wrapper",children:[e.jsx("style",{children:ue}),e.jsxs("div",{className:"user-container",children:[e.jsxs("div",{className:"user-header",children:[e.jsx("div",{className:"avatar-lg",children:Y}),e.jsxs("div",{className:"header-text",style:{flex:1},children:[e.jsx("h2",{children:n.fullName||"User Account"}),e.jsx("p",{children:n.email}),e.jsx("div",{style:{marginTop:8},children:e.jsx("span",{className:"role-badge",children:(d==null?void 0:d.charAt(0).toUpperCase())+(d==null?void 0:d.slice(1))})})]})]}),e.jsxs("div",{className:"user-grid",children:[e.jsxs("div",{className:"profile-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("span",{children:"👤"}),"Profile Info"]}),e.jsxs("div",{className:"stat-row",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-num",children:H}),e.jsx("div",{className:"stat-label",children:"Days"})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-num",children:((L=i==null?void 0:i.orders)==null?void 0:L.length)||0}),e.jsx("div",{className:"stat-label",children:"Orders"})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-num",children:"★ 4.8"}),e.jsx("div",{className:"stat-label",children:"Rating"})]})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"info-label",children:"Email"}),e.jsx("div",{className:"info-value",children:n.email})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"info-label",children:"Phone"}),e.jsx("div",{className:"info-value",children:n.phone||"Not added"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx("div",{className:"info-label",children:"Joined"}),e.jsx("div",{className:"info-value",children:w==null?void 0:w.toLocaleDateString()})]})]}),e.jsxs("div",{className:"profile-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("span",{children:"⚡"}),"Quick Actions"]}),e.jsxs("div",{className:"action-buttons",children:[e.jsx(t,{fullWidth:!0,onClick:te,children:"✏️ Edit Profile"}),e.jsx(t,{fullWidth:!0,variant:"ghost",onClick:ne,children:"🔐 Change Password"}),d==="customer"&&e.jsxs(e.Fragment,{children:[e.jsx(t,{fullWidth:!0,variant:"ghost",onClick:oe,children:"❤️ Favorites"}),e.jsx(t,{fullWidth:!0,variant:"ghost",onClick:de,children:"💳 Payment Methods"})]}),d==="mechanic"&&e.jsxs(e.Fragment,{children:[e.jsx(t,{fullWidth:!0,variant:"ghost",onClick:ce,children:"📍 Service Areas"}),e.jsx(t,{fullWidth:!0,variant:"ghost",onClick:pe,children:"📅 Schedule"})]}),e.jsx(t,{fullWidth:!0,variant:"ghost",onClick:()=>P("/terms"),children:"📋 Terms & Conditions"})]})]}),d==="customer"&&!i&&!z&&e.jsxs("div",{className:"profile-card full-section",style:{textAlign:"center",padding:"40px"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:"⚠️"}),e.jsx("div",{style:{color:"#9aa7bf",marginBottom:"16px"},children:"Customer profile data not found"}),e.jsx(t,{onClick:()=>window.location.reload(),children:"Reload Page"})]}),d==="customer"&&i&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"profile-card full-section",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("span",{children:"🚗"}),"My Vehicles",e.jsxs("span",{style:{marginLeft:"auto",fontSize:"14px",fontWeight:400,color:"#888"},children:[((V=i.vehicles)==null?void 0:V.length)||0," vehicle",(((M=i.vehicles)==null?void 0:M.length)||0)!==1?"s":""]})]}),((R=i.vehicles)==null?void 0:R.length)===0?e.jsxs("div",{style:{padding:"40px 20px",textAlign:"center",color:"#aaa"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"12px"},children:"🚗"}),e.jsx("div",{children:"No vehicles added yet"}),e.jsx(t,{onClick:D,style:{marginTop:16},children:"+ Add Your First Vehicle"})]}):e.jsxs("div",{children:[i.vehicles.map(a=>e.jsxs("div",{className:"list-item",children:[e.jsxs("div",{className:"list-info",children:[e.jsxs("div",{className:"list-primary",children:[a.brand," ",a.model,a.primary&&e.jsx("span",{style:{marginLeft:"8px",fontSize:"12px",background:"rgba(34, 197, 94, 0.2)",color:"#15803d",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:"PRIMARY"})]}),e.jsxs("div",{className:"list-secondary",children:["License Plate: ",a.plate]})]}),e.jsxs("div",{className:"btn-group",children:[!a.primary&&e.jsx(t,{size:"sm",variant:"ghost",onClick:()=>Q(a.id),title:"Set as primary",children:"⭐"}),e.jsx(t,{size:"sm",variant:"ghost",onClick:()=>q(a.id),title:"Edit vehicle",children:"✏️"}),e.jsx(t,{size:"sm",variant:"ghost",onClick:()=>J(a.id),title:"Remove vehicle",children:"✕"})]})]},a.id)),e.jsx(t,{onClick:D,style:{marginTop:16,width:"100%"},children:"+ Add Another Vehicle"})]})]}),e.jsxs("div",{className:"profile-card full-section",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("span",{children:"📍"}),"Saved Addresses",e.jsxs("span",{style:{marginLeft:"auto",fontSize:"14px",fontWeight:400,color:"#888"},children:[((U=i.addresses)==null?void 0:U.length)||0," address",(((I=i.addresses)==null?void 0:I.length)||0)!==1?"es":""]})]}),((T=i.addresses)==null?void 0:T.length)===0?e.jsxs("div",{style:{padding:"40px 20px",textAlign:"center",color:"#aaa"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"12px"},children:"📍"}),e.jsx("div",{children:"No addresses saved yet"}),e.jsx(t,{onClick:F,style:{marginTop:16},children:"+ Add Your First Address"})]}):e.jsxs("div",{children:[i.addresses.map(a=>e.jsxs("div",{className:"list-item",children:[e.jsxs("div",{className:"list-info",children:[e.jsx("div",{className:"list-primary",children:a.label}),e.jsx("div",{className:"list-secondary",children:a.line}),e.jsxs("div",{className:"list-secondary",children:[a.city," - ",a.pincode]})]}),e.jsx("div",{className:"btn-group",children:e.jsx(t,{size:"sm",variant:"ghost",onClick:()=>G(a.id),title:"Remove address",children:"✕"})})]},a.id)),e.jsx(t,{onClick:F,style:{marginTop:16,width:"100%"},children:"+ Add Another Address"})]})]})]}),d==="mechanic"&&l&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"profile-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("span",{children:"🔧"}),"Skills"]}),e.jsx("div",{style:{marginBottom:12},children:(l.skills||[]).map(a=>e.jsxs("span",{className:"skill-badge",children:[a,e.jsx("span",{className:"delete-btn",onClick:()=>Z(a),children:"✕"})]},a))}),e.jsx(t,{onClick:K,style:{width:"100%"},children:"+ Add Skill"})]}),e.jsxs("div",{className:"profile-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("span",{children:"📅"}),"Availability"]}),e.jsx("div",{className:"availability-grid",children:["mon","tue","wed","thu","fri","sat","sun"].map(a=>{var s;return e.jsx("button",{className:`day-btn ${(s=l.availability)!=null&&s[a]?"active":""}`,onClick:()=>ee(a),children:a.toUpperCase()},a)})})]}),e.jsxs("div",{className:"profile-card full-section",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("span",{children:"📍"}),"Service Areas"]}),(l.serviceAreas||[]).map(a=>e.jsxs("div",{className:"list-item",children:[e.jsxs("div",{className:"list-info",children:[e.jsx("div",{className:"list-primary",children:a.area}),e.jsxs("div",{className:"list-secondary",children:[a.km," km radius"]})]}),e.jsx(t,{size:"sm",variant:"ghost",onClick:()=>ie(a.id),children:"✕"})]},a.id)),e.jsx(t,{onClick:se,style:{marginTop:12,width:"100%"},children:"+ Add Area"})]}),e.jsxs("div",{className:"profile-card full-section",children:[e.jsxs("div",{className:"card-header",children:[e.jsx("span",{children:"🏆"}),"Certifications"]}),(l.certifications||[]).map(a=>e.jsx("div",{className:"list-item",children:e.jsxs("div",{className:"list-info",children:[e.jsx("div",{className:"list-primary",children:a.name}),e.jsx("div",{className:"list-secondary",children:a.year})]})},a.id)),e.jsx(t,{onClick:ae,style:{marginTop:12,width:"100%"},children:"+ Add Certification"})]})]})]}),B&&e.jsx("div",{className:"modal-overlay",onClick:()=>g(!1),children:e.jsxs("div",{className:"modal-content",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title",children:[e.jsx("span",{children:"🚗"}),k?"Edit Vehicle":"Add New Vehicle"]}),e.jsx("button",{className:"modal-close",onClick:()=>g(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"VEHICLE BRAND *"}),e.jsx("input",{type:"text",className:"form-input",placeholder:"e.g., Honda, Toyota, BMW",value:m.brand,onChange:a=>u({...m,brand:a.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"MODEL"}),e.jsx("input",{type:"text",className:"form-input",placeholder:"e.g., Civic, Camry, X5",value:m.model,onChange:a=>u({...m,model:a.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"LICENSE PLATE NUMBER"}),e.jsx("input",{type:"text",className:"form-input",placeholder:"e.g., MH 01 AB 1234",value:m.plate,onChange:a=>u({...m,plate:a.target.value.toUpperCase()})})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>g(!1),children:"Cancel"}),e.jsx("button",{className:"btn-save",onClick:_,children:k?"Update Vehicle":"Add Vehicle"})]})]})}),W&&e.jsx("div",{className:"modal-overlay",onClick:()=>N(!1),children:e.jsxs("div",{className:"modal-content",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title",children:[e.jsx("span",{children:"📍"}),"Add New Address"]}),e.jsx("button",{className:"modal-close",onClick:()=>N(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"ADDRESS LABEL *"}),e.jsx("input",{type:"text",className:"form-input",placeholder:"e.g., Home, Office, Workshop",value:c.label,onChange:a=>b({...c,label:a.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"ADDRESS LINE 1 *"}),e.jsx("input",{type:"text",className:"form-input",placeholder:"Street, Building, Apartment",value:c.line,onChange:a=>b({...c,line:a.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"CITY"}),e.jsx("input",{type:"text",className:"form-input",placeholder:"e.g., Mumbai, Delhi, Bangalore",value:c.city,onChange:a=>b({...c,city:a.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"PINCODE"}),e.jsx("input",{type:"text",className:"form-input",placeholder:"e.g., 400001",maxLength:"6",value:c.pincode,onChange:a=>b({...c,pincode:a.target.value.replace(/\D/g,"")})})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>N(!1),children:"Cancel"}),e.jsx("button",{className:"btn-save",onClick:X,children:"Add Address"})]})]})}),$&&e.jsx("div",{className:"modal-overlay",onClick:()=>y(!1),children:e.jsxs("div",{className:"modal-content",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title",children:[e.jsx("span",{children:"👤"}),"Edit Profile"]}),e.jsx("button",{className:"modal-close",onClick:()=>y(!1),children:"✕"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"FULL NAME *"}),e.jsx("input",{type:"text",className:"form-input",placeholder:"Enter your full name",value:x.fullName,onChange:a=>A({...x,fullName:a.target.value})})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"EMAIL"}),e.jsx("input",{type:"email",className:"form-input",placeholder:"your.email@example.com",value:x.email,disabled:!0,style:{opacity:.6,cursor:"not-allowed"}}),e.jsx("div",{style:{fontSize:"11px",color:"#9aa7bf",marginTop:"4px"},children:"Email cannot be changed"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"PHONE NUMBER"}),e.jsx("input",{type:"tel",className:"form-input",placeholder:"e.g., +91 98765 43210",value:x.phone,onChange:a=>A({...x,phone:a.target.value})})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx("button",{className:"btn-cancel",onClick:()=>y(!1),children:"Cancel"}),e.jsx("button",{className:"btn-save",onClick:re,children:"Save Changes"})]})]})})]})]})}export{we as default};
