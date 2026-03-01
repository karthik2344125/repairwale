import{r as c,j as e}from"./index-BgBzfigI.js";import{B as u}from"./Button-D_miSh7Z.js";import{a as h,b as v}from"./roleData-DJwutZ1G.js";import{s as p}from"./toast-DQ1rwNUc.js";const f=`
.mechanic-services {
  min-height: 100vh;
  background: linear-gradient(135deg, #0b1220 0%, #152239 100%);
  padding: 40px 20px;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #E6EDF7;
  margin: 0;
}

.page-subtitle {
  color: rgba(166, 173, 186, 0.7);
  font-size: 14px;
  margin-top: 6px;
}

.card {
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 1px solid #2A4368;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(8, 14, 24, 0.4);
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #4A9EFF;
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.12);
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #E6EDF7;
  margin: 0 0 16px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.service-item {
  background: linear-gradient(135deg, #0F1728 0%, #162844 100%);
  border: 1px solid #2A4368;
  border-radius: 10px;
  padding: 16px;
  transition: all 0.3s ease;
}

.service-item:hover {
  border-color: #4A9EFF;
  background: linear-gradient(135deg, #0F1728 0%, #1a2d4d 100%);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.12);
  transform: translateY(-2px);
}

.service-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.service-name {
  color: #E6EDF7;
  font-weight: 700;
  font-size: 16px;
}

.service-meta {
  color: rgba(166, 173, 186, 0.7);
  font-size: 12px;
}

.service-price {
  color: #4A9EFF;
  font-weight: 700;
  font-size: 14px;
}

.badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.badge.active {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.badge.inactive {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.form-group label {
  display: block;
  color: rgba(166, 173, 186, 0.7);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  background: rgba(42, 67, 104, 0.15);
  border: 1px solid #2A4368;
  border-radius: 8px;
  color: #E6EDF7;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #4A9EFF;
  background: rgba(42, 67, 104, 0.25);
  box-shadow: 0 0 12px rgba(96, 165, 250, 0.12);
}

.empty {
  text-align: center;
  padding: 40px 20px;
  color: rgba(166, 173, 186, 0.7);
}

.action-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.toggle-btn {
  background: rgba(42, 67, 104, 0.3);
  border: 1px solid #2A4368;
  color: #E6EDF7;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  border-color: #4A9EFF;
  background: rgba(96, 165, 250, 0.1);
  box-shadow: 0 0 15px rgba(96, 165, 250, 0.12);
}

@media (max-width: 768px) {
  .mechanic-services {
    padding: 24px 16px;
  }
  
  .services-container {
    max-width: 100%;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .page-subtitle {
    font-size: 13px;
  }
  
  .card {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .card-title {
    font-size: 16px;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  
  .service-item {
    padding: 14px;
  }
  
  .service-name {
    font-size: 15px;
  }
  
  .action-row {
    margin-top: 14px;
  }
}

@media (max-width: 480px) {
  .mechanic-services {
    padding: 16px 12px;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .page-subtitle {
    font-size: 12px;
  }
  
  .card {
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 10px;
  }
  
  .card-title {
    font-size: 15px;
    margin-bottom: 14px;
  }
  
  .form-grid {
    gap: 12px;
  }
  
  .form-group label {
    font-size: 11px;
  }
  
  .form-input {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .grid {
    gap: 12px;
  }
  
  .service-item {
    padding: 12px;
  }
  
  .service-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 6px;
  }
  
  .service-name {
    font-size: 14px;
  }
  
  .service-meta {
    font-size: 11px;
  }
  
  .service-price {
    font-size: 13px;
  }
  
  .badge {
    font-size: 10px;
    padding: 3px 8px;
  }
  
  .toggle-btn {
    font-size: 11px;
    padding: 5px 8px;
  }
  
  .action-row {
    display: flex;
    justify-content: stretch;
  }
  
  .action-row button {
    width: 100%;
  }
}

/* ===== PREMIUM THEME WITH HIGHLIGHTS ===== */
.mechanic-services {
  background: linear-gradient(180deg, #0B1220 0%, #0F1728 100%) !important;
}

.page-title {
  color: #E6EDF7 !important;
  text-shadow: 0 2px 8px rgba(74, 158, 255, 0.1);
}

.page-subtitle {
  color: rgba(230, 237, 247, 0.7) !important;
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

.service-item {
  background: linear-gradient(135deg, #0B1220 0%, #162844 100%) !important;
  border: 2px solid #2A4368 !important;
  transition: all 0.3s ease;
}

.service-item:hover {
  border-color: #4A9EFF !important;
  box-shadow: 0 4px 16px rgba(74, 158, 255, 0.12);
}

.service-name {
  color: #E6EDF7 !important;
}

.service-meta {
  color: rgba(230, 237, 247, 0.7) !important;
}

.service-price {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(74, 158, 255, 0.18));
}

.badge.active {
  background: linear-gradient(135deg, #10B981 0%, #34D399 100%) !important;
  color: #FFFFFF !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.badge.inactive {
  background: linear-gradient(135deg, #3D1A1A 0%, #5C2A2A 100%) !important;
  color: #FF6B6B !important;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.form-group label {
  color: rgba(230, 237, 247, 0.7) !important;
}

.form-input {
  background: rgba(11, 18, 32, 0.8) !important;
  border: 2px solid #2A4368 !important;
  color: #E6EDF7 !important;
  transition: all 0.3s ease;
}

.form-input:focus {
  border-color: #4A9EFF !important;
  background: rgba(26, 58, 92, 0.5) !important;
  box-shadow: 0 0 0 4px rgba(74, 158, 255, 0.1);
}

.empty {
  color: rgba(230, 237, 247, 0.7) !important;
}

.toggle-btn {
  background: linear-gradient(135deg, #1A3A5C 0%, #2A4368 100%) !important;
  border: 2px solid #4A9EFF !important;
  color: #4A9EFF !important;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: linear-gradient(135deg, #4A9EFF 0%, #60A5FF 100%) !important;
  color: #FFFFFF !important;
  box-shadow: 0 6px 20px rgba(74, 158, 255, 0.22);
}
`,l={name:"",category:"",price:"",duration:"",active:!0};function y(){const[t,g]=c.useState(()=>h()),[a,o]=c.useState(l),n=c.useMemo(()=>(t==null?void 0:t.services)||[],[t]),d=r=>{g(r),v(r)},x=()=>{if(!a.name.trim()||!a.category.trim()){alert("Please enter service name and category");return}const r={id:`SRV-${Date.now()}`,name:a.name.trim(),category:a.category.trim(),price:parseInt(a.price||"0",10),duration:a.duration.trim(),active:!0},s={...t,services:[...n,r]};d(s),o(l),p("Service added")},m=r=>{const s={...t,services:n.map(i=>i.id===r?{...i,active:!i.active}:i)};d(s)},b=r=>{if(!confirm("Remove this service?"))return;const s={...t,services:n.filter(i=>i.id!==r)};d(s),p("Service removed")};return e.jsxs("div",{className:"mechanic-services",children:[e.jsx("style",{children:f}),e.jsxs("div",{className:"services-container",children:[e.jsx("div",{className:"page-header",children:e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Services Provided"}),e.jsx("div",{className:"page-subtitle",children:"Manage the services you offer to customers."})]})}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"Add New Service"}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"SERVICE NAME"}),e.jsx("input",{className:"form-input",type:"text",value:a.name,onChange:r=>o({...a,name:r.target.value}),placeholder:"e.g. Brake Service"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"CATEGORY"}),e.jsx("input",{className:"form-input",type:"text",value:a.category,onChange:r=>o({...a,category:r.target.value}),placeholder:"e.g. Repairs"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"PRICE (INR)"}),e.jsx("input",{className:"form-input",type:"number",value:a.price,onChange:r=>o({...a,price:r.target.value}),placeholder:"0"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"DURATION"}),e.jsx("input",{className:"form-input",type:"text",value:a.duration,onChange:r=>o({...a,duration:r.target.value}),placeholder:"e.g. 45 mins"})]})]}),e.jsx("div",{className:"action-row",children:e.jsx(u,{onClick:x,children:"Add Service"})})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"Your Services"}),n.length===0?e.jsx("div",{className:"empty",children:"No services added yet."}):e.jsx("div",{className:"grid",children:n.map(r=>e.jsxs("div",{className:"service-item",children:[e.jsxs("div",{className:"service-header",children:[e.jsx("div",{className:"service-name",children:r.name}),e.jsx("span",{className:`badge ${r.active?"active":"inactive"}`,children:r.active?"Active":"Inactive"})]}),e.jsxs("div",{className:"service-meta",children:[r.category," ",r.duration?`• ${r.duration}`:""]}),e.jsxs("div",{style:{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{className:"service-price",children:["INR ",r.price||0]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{className:"toggle-btn",onClick:()=>m(r.id),children:r.active?"Disable":"Enable"}),e.jsx("button",{className:"toggle-btn",onClick:()=>b(r.id),children:"Remove"})]})]})]},r.id))})]})]})]})}export{y as default};
