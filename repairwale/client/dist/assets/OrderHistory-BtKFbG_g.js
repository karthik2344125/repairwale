import{u as z,r as p,j as e}from"./index-BgBzfigI.js";import{B as C}from"./Button-D_miSh7Z.js";function c(o){return`₹${Number(o||0).toLocaleString("en-IN",{maximumFractionDigits:0})}`}function S(o){try{return new Date(o).toLocaleDateString("en-IN",{year:"numeric",month:"short",day:"numeric"})}catch{return o}}function O(){const o=z(),[s,f]=p.useState([]),[a,h]=p.useState("all"),u=[{id:"ord_20260301_001",status:"in_progress",date:"2026-03-01T08:40:00.000Z",location:"Banjara Hills, Hyderabad",items:[{title:"Engine Oil Change",qty:1,price:1800},{title:"Brake Inspection",qty:1,price:700}],total:2500},{id:"ord_20260227_014",status:"completed",date:"2026-02-27T15:10:00.000Z",location:"Madhapur, Hyderabad",items:[{title:"Battery Replacement",qty:1,price:5200},{title:"On-site Installation",qty:1,price:500}],total:5700},{id:"ord_20260222_031",status:"pending",date:"2026-02-22T11:30:00.000Z",location:"Gachibowli, Hyderabad",items:[{title:"Tyre Puncture Repair",qty:2,price:450},{title:"Wheel Balancing",qty:1,price:900},{title:"Nitrogen Air Fill",qty:1,price:250}],total:2050},{id:"ord_20260218_044",status:"cancelled",date:"2026-02-18T09:25:00.000Z",location:"Kukatpally, Hyderabad",items:[{title:"AC Cooling Check",qty:1,price:1200}],total:1200}];p.useEffect(()=>{v()},[]);const v=()=>{try{const r=JSON.parse(localStorage.getItem("rw_orders")||"[]"),t=Array.isArray(r)&&r.length>0?r:u;f(t.sort((d,l)=>new Date(l.date)-new Date(d.date)))}catch{}},g=s.filter(r=>a==="completed"?r.status==="completed":a==="pending"?["pending","in_progress"].includes(r.status):a==="cancelled"?r.status==="cancelled":!0),i={total:s.length,completed:s.filter(r=>r.status==="completed").length,pending:s.filter(r=>["pending","in_progress"].includes(r.status)).length,totalSpent:s.filter(r=>r.status==="completed").reduce((r,t)=>r+(t.total||0),0)},w=s.filter(r=>r.status==="cancelled").length,y=r=>({pending:["#f59e0b","rgba(245, 158, 11, 0.12)"],in_progress:["#60a5fa","rgba(96, 165, 250, 0.14)"],completed:["#34d399","rgba(52, 211, 153, 0.12)"],cancelled:["#f87171","rgba(248, 113, 113, 0.12)"]})[r]||["#9aa0a6","rgba(154, 160, 166, 0.12)"],j=r=>({pending:"⏳",in_progress:"🛠️",completed:"✅",cancelled:"❌"})[r]||"📌",N=r=>({pending:"Pending",in_progress:"In Progress",completed:"Completed",cancelled:"Cancelled"})[r]||r;return e.jsxs("div",{className:"orders-page",children:[e.jsx("div",{className:"orders-hero",children:e.jsxs("div",{className:"orders-hero-inner",children:[e.jsxs("div",{className:"orders-top",children:[e.jsx("div",{className:"orders-logo",children:"📦"}),e.jsxs("div",{children:[e.jsx("h1",{className:"orders-title",children:"My Orders"}),e.jsx("p",{className:"orders-subtitle",children:"Track your service bookings and history"})]})]}),e.jsx("div",{className:"orders-stats",children:[{label:"Total Orders",value:i.total,icon:"📦",color:"#60a5fa"},{label:"Completed",value:i.completed,icon:"✅",color:"#34d399"},{label:"In Progress",value:i.pending,icon:"🛠️",color:"#f59e0b"},{label:"Total Spent",value:c(i.totalSpent),icon:"💰",color:"#a78bfa"}].map((r,t)=>e.jsxs("div",{className:"orders-stat-card",children:[e.jsx("div",{className:"orders-stat-icon",style:{background:`${r.color}20`},children:r.icon}),e.jsxs("div",{children:[e.jsx("p",{className:"orders-stat-label",children:r.label}),e.jsx("p",{className:"orders-stat-value",style:{color:r.color},children:r.value})]})]},t))})]})}),e.jsxs("div",{className:"orders-main",children:[e.jsx("div",{className:"orders-filters",children:[{id:"all",label:"All Orders",badge:i.total},{id:"pending",label:"Pending",badge:i.pending},{id:"completed",label:"Completed",badge:i.completed},{id:"cancelled",label:"Cancelled",badge:w}].map(r=>e.jsxs("button",{onClick:()=>h(r.id),className:`orders-filter-btn ${a===r.id?"active":""}`,children:[r.label,r.badge>0&&e.jsx("span",{className:"orders-badge",children:r.badge})]},r.id))}),g.length===0?e.jsxs("div",{className:"orders-empty",children:[e.jsx("div",{className:"orders-empty-icon",children:"🧾"}),e.jsxs("h3",{children:["No ",a!=="all"?a:"orders"," found"]}),e.jsx("p",{style:{marginBottom:24},children:a!=="all"?`You don't have any ${a} orders yet.`:"Start booking services to see your order history here"}),e.jsx(C,{variant:"primary",size:"md",onClick:()=>o("/service"),style:{marginTop:16},children:"Browse Services"})]}):e.jsx("div",{className:"orders-list",children:g.map((r,t)=>{var x,m,b;const[d,l]=y(r.status);return e.jsxs("div",{className:"order-card",style:{animationDelay:`${t*.05}s`},onClick:()=>o(`/tracking/${r.id}`),children:[e.jsxs("div",{className:"order-top",children:[e.jsxs("div",{children:[e.jsx("p",{className:"order-caption",children:"ORDER ID"}),e.jsxs("p",{className:"order-id",children:["#",r.id.slice(-8).toUpperCase()]})]}),e.jsxs("div",{className:"order-status",style:{background:l,borderColor:`${d}55`,color:d},children:[e.jsx("span",{style:{fontSize:14},children:j(r.status)}),e.jsx("span",{children:N(r.status)})]})]}),e.jsxs("div",{className:"order-meta",children:[e.jsxs("div",{className:"order-meta-item",children:[e.jsx("p",{className:"order-meta-label",children:"Date"}),e.jsxs("p",{className:"order-meta-value",children:["📅 ",S(r.date)]})]}),e.jsxs("div",{className:"order-meta-item",children:[e.jsx("p",{className:"order-meta-label",children:"Location"}),e.jsxs("p",{className:"order-meta-value",children:["📍 ",r.location||"Your Location"]})]})]}),e.jsxs("div",{style:{marginBottom:16},children:[e.jsxs("p",{className:"order-services-title",children:["Services (",((x=r.items)==null?void 0:x.length)||0,")"]}),e.jsx("div",{className:"order-services-list",children:(m=r.items)==null?void 0:m.slice(0,3).map((n,k)=>e.jsxs("div",{className:"order-service-item",children:[e.jsx("span",{className:"order-service-name",children:n.title}),e.jsxs("div",{className:"order-service-right",children:[e.jsxs("span",{className:"order-qty",children:["×",n.qty]}),e.jsx("span",{className:"order-service-price",children:c(n.price*n.qty)})]})]},k))}),((b=r.items)==null?void 0:b.length)>3&&e.jsxs("p",{className:"order-more",children:["+",r.items.length-3," more service",r.items.length-3!==1?"s":""]})]}),e.jsxs("div",{className:"order-footer",children:[e.jsxs("div",{children:[e.jsx("p",{className:"order-total-label",children:"Total Amount"}),e.jsx("p",{className:"order-total-value",children:c(r.total)})]}),e.jsx("div",{className:"order-view-cta",children:"View Details →"})]})]},r.id)})})]}),e.jsx("style",{children:`
    .orders-page {
      min-height: 100vh;
      background: radial-gradient(1200px 600px at 90% -10%, rgba(56, 189, 248, 0.08) 0%, transparent 55%),
                  radial-gradient(900px 500px at -10% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 60%),
                  linear-gradient(180deg, #070b14 0%, #0b1220 52%, #0d1628 100%);
      padding-bottom: 44px;
      color: #e6edf7;
    }

    .orders-hero {
      position: relative;
      overflow: hidden;
      background: linear-gradient(140deg, #0f1d34 0%, #0c172a 48%, #0a1220 100%);
      border-bottom: 1px solid rgba(125, 211, 252, 0.16);
      box-shadow: 0 14px 32px rgba(5, 10, 20, 0.52);
      padding: 44px 24px;
    }

    .orders-hero::before,
    .orders-hero::after {
      content: '';
      position: absolute;
      width: 320px;
      height: 320px;
      border-radius: 999px;
      pointer-events: none;
      filter: blur(18px);
      opacity: 0.35;
    }

    .orders-hero::before {
      top: -150px;
      right: -70px;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0) 72%);
    }

    .orders-hero::after {
      bottom: -170px;
      left: -110px;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.26) 0%, rgba(168, 85, 247, 0) 70%);
    }

    .orders-hero-inner,
    .orders-main {
      max-width: 1400px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .orders-top {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .orders-logo {
      width: 62px;
      height: 62px;
      border-radius: 16px;
      display: grid;
      place-items: center;
      font-size: 30px;
      background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 52%, #7c3aed 100%);
      box-shadow: 0 12px 28px rgba(37, 99, 235, 0.25);
      border: 1px solid rgba(191, 219, 254, 0.24);
    }

    .orders-title {
      margin: 0;
      font-size: 36px;
      line-height: 1.1;
      letter-spacing: -0.8px;
      font-weight: 900;
      background: linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 45%, #a78bfa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 10px rgba(56, 189, 248, 0.14));
    }

    .orders-subtitle {
      margin: 8px 0 0;
      color: rgba(203, 213, 225, 0.84);
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.2px;
    }

    .orders-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 14px;
    }

    .orders-stat-card {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      border-radius: 14px;
      padding: 16px;
      background: linear-gradient(145deg, rgba(17, 26, 43, 0.92), rgba(11, 20, 34, 0.98));
      border: 1px solid rgba(125, 211, 252, 0.18);
      box-shadow: 0 10px 22px rgba(5, 10, 20, 0.48);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      overflow: hidden;
    }

    .orders-stat-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(120deg, transparent 35%, rgba(255, 255, 255, 0.09) 50%, transparent 65%);
      transform: translateX(-120%);
      transition: transform 0.5s ease;
    }

    .orders-stat-card:hover {
      transform: translateY(-3px);
      border-color: rgba(125, 211, 252, 0.42);
      box-shadow: 0 14px 28px rgba(37, 99, 235, 0.22);
    }

    .orders-stat-card:hover::before {
      transform: translateX(120%);
    }

    .orders-stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      font-size: 30px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: inset 0 0 16px rgba(255, 255, 255, 0.06);
    }

    .orders-stat-label {
      margin: 0 0 4px;
      color: rgba(226, 232, 240, 0.68);
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.65px;
    }

    .orders-stat-value {
      margin: 0;
      font-size: 24px;
      font-weight: 900;
    }

    .orders-main {
      padding: 30px 24px;
    }

    .orders-filters {
      display: flex;
      gap: 10px;
      margin-bottom: 26px;
      overflow-x: auto;
      padding: 0 0 10px;
      border-bottom: 1px solid rgba(125, 211, 252, 0.18);
      scrollbar-width: thin;
    }

    .orders-filter-btn {
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 12px;
      border: 1px solid rgba(125, 211, 252, 0.22);
      background: rgba(15, 23, 38, 0.84);
      color: rgba(226, 232, 240, 0.88);
      padding: 11px 17px;
      cursor: pointer;
      font-weight: 700;
      font-size: 13px;
      transition: all 0.25s ease;
    }

    .orders-filter-btn:hover {
      border-color: rgba(125, 211, 252, 0.52);
      background: rgba(30, 64, 175, 0.2);
      transform: translateY(-1px);
    }

    .orders-filter-btn.active {
      border-color: rgba(125, 211, 252, 0.62);
      color: #eff6ff;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.34), rgba(124, 58, 237, 0.22));
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.24);
    }

    .orders-badge {
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 800;
      background: rgba(96, 165, 250, 0.1);
      color: #e2e8f0;
    }

    .orders-filter-btn.active .orders-badge {
      background: rgba(147, 197, 253, 0.3);
      color: #eff6ff;
      box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.2);
    }

    .orders-empty {
      text-align: center;
      border-radius: 18px;
      border: 1px dashed rgba(125, 211, 252, 0.2);
      background: linear-gradient(145deg, rgba(15, 26, 44, 0.9), rgba(10, 17, 30, 0.96));
      padding: 64px 26px;
      box-shadow: 0 14px 34px rgba(4, 8, 16, 0.56);
    }

    .orders-empty-icon {
      font-size: 62px;
      margin-bottom: 18px;
      filter: drop-shadow(0 8px 14px rgba(96, 165, 250, 0.12));
      animation: orders-float 3s ease-in-out infinite;
    }

    .orders-empty h3 {
      margin: 0 0 8px;
      font-size: 22px;
      font-weight: 800;
      color: #f8fafc;
    }

    .orders-empty p {
      max-width: 420px;
      margin: 0 auto;
      color: rgba(226, 232, 240, 0.72);
      font-size: 14px;
      line-height: 1.55;
    }

    .orders-list {
      display: grid;
      gap: 16px;
    }

    .order-card {
      position: relative;
      border-radius: 18px;
      border: 1px solid rgba(125, 211, 252, 0.2);
      background: linear-gradient(145deg, #101b2f 0%, #0b1525 62%, #0a1220 100%);
      padding: 20px;
      box-shadow: 0 12px 24px rgba(4, 8, 16, 0.5);
      cursor: pointer;
      transition: transform 0.26s ease, box-shadow 0.26s ease, border-color 0.26s ease;
      animation: orders-slide-up 0.45s ease-out both;
      overflow: hidden;
    }

    .order-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      opacity: 0;
      transition: opacity 0.25s ease;
      background: linear-gradient(90deg, transparent, rgba(125, 211, 252, 0.75), transparent);
    }

    .order-card:hover {
      transform: translateY(-4px);
      border-color: rgba(125, 211, 252, 0.42);
      box-shadow: 0 16px 32px rgba(30, 64, 175, 0.24);
    }

    .order-card:hover::before {
      opacity: 1;
    }

    .order-top,
    .order-meta,
    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
    }

    .order-top {
      margin-bottom: 14px;
      align-items: flex-start;
    }

    .order-caption {
      margin: 0;
      font-size: 11px;
      font-weight: 700;
      color: rgba(226, 232, 240, 0.56);
      letter-spacing: 0.9px;
    }

    .order-id {
      margin: 4px 0 0;
      font-size: 19px;
      font-weight: 900;
      color: #7dd3fc;
      letter-spacing: 0.7px;
    }

    .order-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid transparent;
      font-size: 12px;
      font-weight: 800;
      white-space: nowrap;
    }

    .order-meta {
      margin-bottom: 16px;
      padding: 12px;
      border-radius: 12px;
      border: 1px solid rgba(125, 211, 252, 0.16);
      background: rgba(12, 20, 34, 0.68);
    }

    .order-meta-item {
      flex: 1;
      min-width: 0;
    }

    .order-meta-label {
      margin: 0 0 5px;
      font-size: 10px;
      font-weight: 800;
      color: rgba(226, 232, 240, 0.5);
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .order-meta-value {
      margin: 0;
      font-size: 13px;
      font-weight: 700;
      color: #e2e8f0;
      line-height: 1.4;
    }

    .order-services-title {
      margin: 0 0 10px;
      font-size: 12px;
      font-weight: 800;
      color: rgba(226, 232, 240, 0.74);
      letter-spacing: 0.7px;
      text-transform: uppercase;
    }

    .order-services-list {
      display: grid;
      gap: 8px;
      margin-bottom: 14px;
    }

    .order-service-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      border-radius: 10px;
      border: 1px solid rgba(125, 211, 252, 0.15);
      background: rgba(20, 32, 50, 0.55);
      padding: 10px 12px;
    }

    .order-service-name {
      font-size: 13px;
      color: #e2e8f0;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .order-service-right {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
    }

    .order-qty {
      font-size: 11px;
      border-radius: 999px;
      padding: 2px 8px;
      background: rgba(96, 165, 250, 0.12);
      color: #dbeafe;
      font-weight: 700;
    }

    .order-service-price {
      font-size: 12px;
      color: #93c5fd;
      font-weight: 800;
    }

    .order-more {
      margin: 10px 0 0;
      font-size: 12px;
      color: rgba(125, 211, 252, 0.82);
      font-weight: 700;
    }

    .order-footer {
      padding-top: 14px;
      border-top: 1px solid rgba(125, 211, 252, 0.16);
    }

    .order-total-label {
      margin: 0 0 3px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      color: rgba(226, 232, 240, 0.52);
      letter-spacing: 0.8px;
    }

    .order-total-value {
      margin: 0;
      font-size: 21px;
      font-weight: 900;
      background: linear-gradient(130deg, #bae6fd 0%, #38bdf8 50%, #a78bfa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 8px rgba(56, 189, 248, 0.16));
    }

    .order-view-cta {
      border-radius: 10px;
      border: 1px solid rgba(125, 211, 252, 0.42);
      background: linear-gradient(135deg, rgba(2, 132, 199, 0.92), rgba(59, 130, 246, 0.9));
      color: #eff6ff;
      font-size: 12px;
      font-weight: 800;
      padding: 10px 15px;
      box-shadow: 0 10px 18px rgba(2, 132, 199, 0.24);
      transition: transform 0.2s ease;
      white-space: nowrap;
    }

    .order-card:hover .order-view-cta {
      transform: translateX(3px);
    }

    @media (max-width: 1024px) {
      .orders-title {
        font-size: 32px;
      }

      .orders-main,
      .orders-hero {
        padding-left: 18px;
        padding-right: 18px;
      }

      .orders-stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 768px) {
      .orders-hero {
        padding-top: 34px;
        padding-bottom: 34px;
      }

      .orders-top {
        align-items: flex-start;
      }

      .orders-logo {
        width: 54px;
        height: 54px;
        border-radius: 14px;
        font-size: 25px;
      }

      .orders-title {
        font-size: 27px;
      }

      .orders-subtitle {
        font-size: 13px;
      }

      .orders-stats {
        grid-template-columns: 1fr;
      }

      .orders-stat-value {
        font-size: 21px;
      }

      .order-top,
      .order-footer {
        flex-direction: column;
        align-items: flex-start;
      }

      .order-status {
        align-self: flex-start;
      }

      .order-meta {
        flex-direction: column;
        align-items: flex-start;
      }

      .order-meta-item {
        width: 100%;
      }

      .order-view-cta {
        width: 100%;
        text-align: center;
      }

      .orders-empty {
        padding: 48px 18px;
      }
    }

    @media (max-width: 480px) {
      .orders-main,
      .orders-hero {
        padding-left: 14px;
        padding-right: 14px;
      }

      .orders-title {
        font-size: 24px;
      }

      .order-card {
        padding: 16px;
      }

      .order-service-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .order-service-right {
        width: 100%;
        justify-content: space-between;
      }

      .order-total-value {
        font-size: 19px;
      }
    }

    @keyframes orders-slide-up {
      from {
        opacity: 0;
        transform: translateY(18px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes orders-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-7px); }
    }
  `})]})}export{O as default};
