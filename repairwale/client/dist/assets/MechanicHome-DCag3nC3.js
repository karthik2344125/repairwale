import{u as y,a as F,r as l,j as e}from"./index-BgBzfigI.js";import{B as o}from"./Button-D_miSh7Z.js";import{s as n}from"./toast-DQ1rwNUc.js";import{a as k}from"./roleData-DJwutZ1G.js";const E=`
.mechanic-home {
  min-height: 100vh;
  background: linear-gradient(135deg, #0b1220 0%, #152239 100%);
  padding: 40px 20px;
}

.mechanic-container {
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-banner {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(30, 58, 138, 0.4);
}

.welcome-content h1 {
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.welcome-content p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: #101a2a;
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 24px rgba(30, 58, 138, 0.4);
  border-color: rgba(30, 58, 138, 0.5);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 4px;
}

.stat-label {
  color: #9aa7bf;
  font-size: 14px;
  font-weight: 500;
}

.stat-change {
  font-size: 12px;
  margin-top: 8px;
}

.stat-change.positive {
  color: #22c55e;
}

.stat-change.negative {
  color: #ef4444;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .mechanic-home {
    padding: 24px 16px;
  }
  
  .welcome-banner {
    padding: 24px;
    margin-bottom: 24px;
    border-radius: 12px;
  }
  
  .welcome-content h1 {
    font-size: 24px;
  }
  
  .welcome-content p {
    font-size: 14px;
  }
  
  .stats-grid {
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .stat-card {
    padding: 16px;
  }
  
  .stat-icon {
    font-size: 28px;
    margin-bottom: 8px;
  }
  
  .stat-value {
    font-size: 24px;
  }
  
  .stat-label {
    font-size: 12px;
  }
  
  .content-grid {
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .card {
    padding: 20px;
  }
  
  .card-title {
    font-size: 18px;
  }
  
  .request-item {
    padding: 14px;
  }
  
  .request-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .request-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .request-actions button {
    width: 100%;
  }
  
  .chart-bars {
    height: 100px;
    gap: 6px;
  }
  
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .mechanic-home {
    padding: 16px 12px;
  }
  
  .welcome-banner {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .welcome-content h1 {
    font-size: 20px;
  }
  
  .welcome-content p {
    font-size: 13px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .stat-card {
    padding: 16px;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .stat-icon {
    font-size: 32px;
    margin-bottom: 0;
  }
  
  .stat-value {
    font-size: 20px;
  }
  
  .content-grid {
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .card {
    padding: 16px;
    border-radius: 10px;
  }
  
  .card-title {
    font-size: 16px;
    gap: 8px;
  }
  
  .request-item {
    padding: 12px;
  }
  
  .customer-info h4 {
    font-size: 14px;
  }
  
  .customer-info p {
    font-size: 12px;
  }
  
  .request-details {
    font-size: 13px;
  }
  
  .chart-bars {
    height: 80px;
    gap: 4px;
  }
  
  .chart-labels {
    font-size: 10px;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .action-btn {
    padding: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
  }
  
  .action-btn-icon {
    font-size: 24px;
    margin-bottom: 0;
  }
  
  .action-btn-label {
    font-size: 14px;
  }
}

.card {
  background: #101a2a;
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  padding: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 12px;
}

.request-item {
  background: rgba(30, 58, 138, 0.1);
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.2s;
}

.request-item:hover {
  border-color: rgba(30, 58, 138, 0.4);
  background: rgba(30, 58, 138, 0.15);
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.customer-info h4 {
  color: #ffffff;
  margin: 0 0 4px 0;
  font-size: 16px;
}

.customer-info p {
  color: #9aa7bf;
  margin: 0;
  font-size: 13px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.pending {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.status-badge.active {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.status-badge.completed {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.request-details {
  color: #9aa7bf;
  font-size: 14px;
  margin-bottom: 12px;
}

.request-actions {
  display: flex;
  gap: 8px;
}

.earnings-chart {
  background: rgba(30, 58, 138, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 120px;
  gap: 8px;
  margin-bottom: 12px;
}

.chart-bar {
  flex: 1;
  background: linear-gradient(to top, #1e3a8a, #3b82f6);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s;
}

.chart-bar:hover {
  background: linear-gradient(to top, #1e40af, #60a5fa);
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  color: #9aa7bf;
  font-size: 11px;
}

.reviews-list {
  max-height: 400px;
  overflow-y: auto;
}

.review-item {
  background: rgba(30, 58, 138, 0.1);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.reviewer-name {
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
}

.rating-stars {
  color: #fbbf24;
  font-size: 14px;
}

.review-text {
  color: #9aa7bf;
  font-size: 13px;
  line-height: 1.5;
}

.review-date {
  color: #6b7280;
  font-size: 11px;
  margin-top: 8px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #9aa7bf;
}

.empty-state-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 24px;
}

.action-btn {
  background: rgba(30, 58, 138, 0.2);
  border: 1px solid rgba(30, 58, 138, 0.3);
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(30, 58, 138, 0.3);
  border-color: rgba(30, 58, 138, 0.5);
  transform: translateY(-2px);
}

.action-btn-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.action-btn-label {
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== PREMIUM THEME WITH HIGHLIGHTS ===== */
.mechanic-home {
  background: linear-gradient(180deg, #0B1220 0%, #0F1728 100%) !important;
}

.welcome-banner {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #4A9EFF !important;
  box-shadow: 0 8px 32px rgba(74, 158, 255, 0.1), 0 0 100px rgba(74, 158, 255, 0.05) !important;
}

.welcome-content h1 {
  color: #E6EDF7 !important;
  text-shadow: 0 2px 8px rgba(74, 158, 255, 0.1);
}

.welcome-content p {
  color: rgba(230, 237, 247, 0.7) !important;
}

.stat-card {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #4A9EFF, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-card:hover {
  border-color: #4A9EFF !important;
  box-shadow: 0 16px 48px rgba(74, 158, 255, 0.1);
}

.stat-value {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 8px rgba(74, 158, 255, 0.18));
}

.stat-label {
  color: rgba(230, 237, 247, 0.7) !important;
}

.stat-change.positive {
  color: #10B981 !important;
}

.stat-change.negative {
  color: #FF6B6B !important;
}

.card {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.4);
  position: relative;
}

.card::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #4A9EFF, #60A5FF);
  border-radius: 12px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.card:hover::after {
  opacity: 0.15;
}

.card:hover {
  box-shadow: 0 12px 40px rgba(74, 158, 255, 0.12);
}

.card-title {
  color: #E6EDF7 !important;
  text-shadow: 0 2px 8px rgba(74, 158, 255, 0.1);
}

.request-item {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
}

.request-item:hover {
  border-color: #4A9EFF !important;
  box-shadow: 0 4px 16px rgba(74, 158, 255, 0.12);
}

.customer-info h4 {
  color: #E6EDF7 !important;
}

.customer-info p {
  color: rgba(230, 237, 247, 0.7) !important;
}

.status-badge.pending {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%) !important;
  color: #0B1220 !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
}

.status-badge.active {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%) !important;
  color: #FFFFFF !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.status-badge.completed {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
  color: #FFFFFF !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(74, 158, 255, 0.18);
}

.request-details {
  color: rgba(230, 237, 247, 0.7) !important;
}

.earnings-chart {
  background: rgba(26, 58, 92, 0.3) !important;
  border: 1px solid #2A4368;
}

.chart-bar {
  background: linear-gradient(to top, #1A3A5C, #4A9EFF) !important;
}

.chart-bar:hover {
  background: linear-gradient(to top, #2A4368, #60A5FF) !important;
}

.chart-labels {
  color: rgba(230, 237, 247, 0.7) !important;
}

.review-item {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
}

.reviewer-name {
  color: #E6EDF7 !important;
}

.rating-stars {
  color: #FBBF24 !important;
  filter: drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3));
}

.review-text {
  color: rgba(230, 237, 247, 0.7) !important;
}

.review-date {
  color: rgba(230, 237, 247, 0.5) !important;
}

.empty-state {
  color: rgba(230, 237, 247, 0.7) !important;
}

.action-btn {
  background: linear-gradient(135deg, #1A3A5C 0%, #2A4368 100%) !important;
  border: 2px solid #4A9EFF !important;
  transition: all 0.2s;
}

.action-btn:hover {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
  border-color: #60A5FF !important;
  box-shadow: 0 8px 24px rgba(74, 158, 255, 0.12);
}

.action-btn-label {
  color: #4A9EFF !important;
  font-weight: 700;
}

.action-btn:hover .action-btn-label {
  color: #FFFFFF !important;
}
`;function M(){const m=y(),{user:p}=F(),[z,h]=l.useState(null),[i,c]=l.useState([]),[r,b]=l.useState({todayJobs:0,todayEarnings:0,monthlyJobs:0,monthlyEarnings:0,rating:4.7,totalReviews:0});l.useEffect(()=>{const a=k();h(a),f(),x()},[]);const f=()=>{const a={todayJobs:Math.floor(Math.random()*5)+2,todayEarnings:Math.floor(Math.random()*3e3)+1500,monthlyJobs:Math.floor(Math.random()*50)+30,monthlyEarnings:Math.floor(Math.random()*5e4)+25e3,rating:"4.7",totalReviews:87};b(a)},x=()=>{const a=localStorage.getItem("rw_mechanic_requests");if(a)c(JSON.parse(a));else{const t=[{id:"REQ-"+Date.now(),customerName:"Rahul Sharma",problem:"Engine overheating",location:"Koregaon Park, Pune",distance:"2.5 km",status:"pending",price:800,createdAt:Date.now()-18e5},{id:"REQ-"+(Date.now()+1),customerName:"Priya Patel",problem:"Flat tire replacement",location:"Hinjewadi, Pune",distance:"5.2 km",status:"pending",price:500,createdAt:Date.now()-36e5}];c(t),localStorage.setItem("rw_mechanic_requests",JSON.stringify(t))}},u=a=>{const t=i.map(s=>s.id===a?{...s,status:"active"}:s);c(t),localStorage.setItem("rw_mechanic_requests",JSON.stringify(t)),n("✓ Request accepted! Navigate to the job.")},v=a=>{const t=i.filter(s=>s.id!==a);c(t),localStorage.setItem("rw_mechanic_requests",JSON.stringify(t)),n("Request declined")},g=[2800,3200,2500,3800,3100,2900,3500],j=Math.max(...g),N=[{id:1,name:"Amit Kumar",rating:5,text:"Excellent service! Very professional and quick.",date:"2 days ago"},{id:2,name:"Sneha Reddy",rating:4,text:"Good work, but could be faster. Overall satisfied.",date:"5 days ago"},{id:3,name:"Vikram Singh",rating:5,text:"Best mechanic in the area. Highly recommended!",date:"1 week ago"}],d=a=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(a),w=a=>{const t=Math.floor((Date.now()-a)/6e4);if(t<60)return`${t}m ago`;const s=Math.floor(t/60);return s<24?`${s}h ago`:`${Math.floor(s/24)}d ago`};return e.jsxs("div",{className:"mechanic-home",children:[e.jsx("style",{children:E}),e.jsxs("div",{className:"mechanic-container",children:[e.jsx("div",{className:"welcome-banner",children:e.jsxs("div",{className:"welcome-content",children:[e.jsxs("h1",{children:["👋 Welcome back, ",(p==null?void 0:p.fullName)||"Mechanic","!"]}),e.jsxs("p",{children:["You have ",i.filter(a=>a.status==="pending").length," pending requests today"]})]})}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"📊"}),e.jsx("div",{className:"stat-value",children:r.todayJobs}),e.jsx("div",{className:"stat-label",children:"Jobs Today"}),e.jsx("div",{className:"stat-change positive",children:"↑ +2 from yesterday"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"💰"}),e.jsx("div",{className:"stat-value",children:d(r.todayEarnings)}),e.jsx("div",{className:"stat-label",children:"Today's Earnings"}),e.jsx("div",{className:"stat-change positive",children:"↑ +15% from average"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"📅"}),e.jsx("div",{className:"stat-value",children:r.monthlyJobs}),e.jsx("div",{className:"stat-label",children:"Monthly Jobs"}),e.jsx("div",{className:"stat-change positive",children:"↑ +18% from last month"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"💵"}),e.jsx("div",{className:"stat-value",children:d(r.monthlyEarnings)}),e.jsx("div",{className:"stat-label",children:"Monthly Earnings"}),e.jsx("div",{className:"stat-change positive",children:"↑ +22% from last month"})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"⭐"}),e.jsx("div",{className:"stat-value",children:r.rating}),e.jsx("div",{className:"stat-label",children:"Average Rating"}),e.jsxs("div",{className:"stat-change positive",children:["Based on ",r.totalReviews," reviews"]})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"✅"}),e.jsx("div",{className:"stat-value",children:"98%"}),e.jsx("div",{className:"stat-label",children:"Completion Rate"}),e.jsx("div",{className:"stat-change positive",children:"↑ Excellent performance"})]})]}),e.jsxs("div",{className:"content-grid",children:[e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-header",children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{children:"📬"}),"Pending Service Requests"]}),e.jsx(o,{size:"sm",variant:"ghost",onClick:x,children:"🔄 Refresh"})]}),i.filter(a=>a.status==="pending").length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:"📭"}),e.jsx("p",{children:"No pending requests"}),e.jsx("p",{style:{fontSize:12,marginTop:8},children:"New requests will appear here"})]}):i.filter(a=>a.status==="pending").map(a=>e.jsxs("div",{className:"request-item",children:[e.jsxs("div",{className:"request-header",children:[e.jsxs("div",{className:"customer-info",children:[e.jsx("h4",{children:a.customerName}),e.jsxs("p",{children:["📍 ",a.location," • ",a.distance," away"]})]}),e.jsx("div",{className:"status-badge pending",children:"PENDING"})]}),e.jsxs("div",{className:"request-details",children:[e.jsx("strong",{children:"Problem:"})," ",a.problem,e.jsxs("div",{style:{marginTop:4},children:[e.jsx("strong",{children:"Estimated:"})," ",d(a.price)," • ",w(a.createdAt)]})]}),e.jsxs("div",{className:"request-actions",children:[e.jsx(o,{onClick:()=>u(a.id),style:{flex:1},children:"✓ Accept Job"}),e.jsx(o,{variant:"ghost",onClick:()=>v(a.id),children:"✕ Decline"})]})]},a.id)),i.filter(a=>a.status==="active").length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{marginTop:32,marginBottom:16},children:e.jsxs("div",{className:"card-title",style:{fontSize:18},children:[e.jsx("span",{children:"🔧"}),"Active Jobs"]})}),i.filter(a=>a.status==="active").map(a=>e.jsxs("div",{className:"request-item",children:[e.jsxs("div",{className:"request-header",children:[e.jsxs("div",{className:"customer-info",children:[e.jsx("h4",{children:a.customerName}),e.jsxs("p",{children:["📍 ",a.location]})]}),e.jsx("div",{className:"status-badge active",children:"IN PROGRESS"})]}),e.jsxs("div",{className:"request-details",children:[e.jsx("strong",{children:"Problem:"})," ",a.problem]}),e.jsxs("div",{className:"request-actions",children:[e.jsx(o,{onClick:()=>n("Job details coming soon"),children:"View Job"}),e.jsx(o,{variant:"ghost",onClick:()=>n("Chat coming soon"),children:"Chat"})]})]},a.id))]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"card",style:{marginBottom:24},children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{children:"📈"}),"Weekly Earnings"]}),e.jsxs("div",{className:"earnings-chart",children:[e.jsx("div",{className:"chart-bars",children:g.map((a,t)=>e.jsx("div",{className:"chart-bar",style:{height:`${a/j*100}%`},title:d(a)},t))}),e.jsxs("div",{className:"chart-labels",children:[e.jsx("span",{children:"Mon"}),e.jsx("span",{children:"Tue"}),e.jsx("span",{children:"Wed"}),e.jsx("span",{children:"Thu"}),e.jsx("span",{children:"Fri"}),e.jsx("span",{children:"Sat"}),e.jsx("span",{children:"Sun"})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{children:"💬"}),"Recent Reviews"]}),e.jsx("div",{className:"reviews-list",children:N.map(a=>e.jsxs("div",{className:"review-item",children:[e.jsxs("div",{className:"review-header",children:[e.jsx("span",{className:"reviewer-name",children:a.name}),e.jsx("span",{className:"rating-stars",children:"⭐".repeat(a.rating)})]}),e.jsx("div",{className:"review-text",children:a.text}),e.jsx("div",{className:"review-date",children:a.date})]},a.id))})]})]})]}),e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsx("span",{children:"⚡"}),"Quick Actions"]}),e.jsxs("div",{className:"quick-actions",children:[e.jsxs("div",{className:"action-btn",onClick:()=>m("/mechanic/services"),children:[e.jsx("div",{className:"action-btn-icon",children:"🧰"}),e.jsx("div",{className:"action-btn-label",children:"My Services"})]}),e.jsxs("div",{className:"action-btn",onClick:()=>m("/user"),children:[e.jsx("div",{className:"action-btn-icon",children:"👤"}),e.jsx("div",{className:"action-btn-label",children:"My Profile"})]}),e.jsxs("div",{className:"action-btn",onClick:()=>n("Analytics coming soon"),children:[e.jsx("div",{className:"action-btn-icon",children:"📊"}),e.jsx("div",{className:"action-btn-label",children:"Analytics"})]}),e.jsxs("div",{className:"action-btn",onClick:()=>n("Settings coming soon"),children:[e.jsx("div",{className:"action-btn-icon",children:"⚙️"}),e.jsx("div",{className:"action-btn-label",children:"Settings"})]})]})]})]})]})}export{M as default};
