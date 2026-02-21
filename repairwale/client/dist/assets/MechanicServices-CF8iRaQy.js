import{r as d,j as e,s as p}from"./index-TLEbH3MQ.js";import{B as u}from"./Button-BfaPFI1m.js";import{a as v,b as h}from"./roleData-K1rJ6LBK.js";const b=`
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
  color: #ffffff;
  margin: 0;
}

.page-subtitle {
  color: #9aa7bf;
  font-size: 14px;
  margin-top: 6px;
}

.card {
  background: #101a2a;
  border: 1px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  margin-bottom: 24px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.service-item {
  background: rgba(30, 58, 138, 0.12);
  border: 1px solid rgba(30, 58, 138, 0.25);
  border-radius: 10px;
  padding: 16px;
  transition: all 0.2s ease;
}

.service-item:hover {
  border-color: rgba(30, 58, 138, 0.45);
  background: rgba(30, 58, 138, 0.18);
}

.service-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.service-name {
  color: #ffffff;
  font-weight: 700;
  font-size: 16px;
}

.service-meta {
  color: #9aa7bf;
  font-size: 12px;
}

.service-price {
  color: #3b82f6;
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
  color: #9aa7bf;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 14px;
  background: rgba(30, 58, 138, 0.15);
  border: 1px solid rgba(30, 58, 138, 0.3);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(30, 58, 138, 0.25);
}

.empty {
  text-align: center;
  padding: 40px 20px;
  color: #9aa7bf;
}

.action-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.toggle-btn {
  background: transparent;
  border: 1px solid rgba(30, 58, 138, 0.3);
  color: #ffffff;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
}

.toggle-btn:hover {
  border-color: rgba(30, 58, 138, 0.5);
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
`,l={name:"",category:"",price:"",duration:"",active:!0};function w(){const[r,x]=d.useState(()=>v()),[i,s]=d.useState(l),n=d.useMemo(()=>(r==null?void 0:r.services)||[],[r]),c=a=>{x(a),h(a)},g=()=>{if(!i.name.trim()||!i.category.trim()){alert("Please enter service name and category");return}const a={id:`SRV-${Date.now()}`,name:i.name.trim(),category:i.category.trim(),price:parseInt(i.price||"0",10),duration:i.duration.trim(),active:!0},o={...r,services:[...n,a]};c(o),s(l),p("Service added")},m=a=>{const o={...r,services:n.map(t=>t.id===a?{...t,active:!t.active}:t)};c(o)},f=a=>{if(!confirm("Remove this service?"))return;const o={...r,services:n.filter(t=>t.id!==a)};c(o),p("Service removed")};return e.jsxs("div",{className:"mechanic-services",children:[e.jsx("style",{children:b}),e.jsxs("div",{className:"services-container",children:[e.jsx("div",{className:"page-header",children:e.jsxs("div",{children:[e.jsx("h1",{className:"page-title",children:"Services Provided"}),e.jsx("div",{className:"page-subtitle",children:"Manage the services you offer to customers."})]})}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"Add New Service"}),e.jsxs("div",{className:"form-grid",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"SERVICE NAME"}),e.jsx("input",{className:"form-input",type:"text",value:i.name,onChange:a=>s({...i,name:a.target.value}),placeholder:"e.g. Brake Service"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"CATEGORY"}),e.jsx("input",{className:"form-input",type:"text",value:i.category,onChange:a=>s({...i,category:a.target.value}),placeholder:"e.g. Repairs"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"PRICE (INR)"}),e.jsx("input",{className:"form-input",type:"number",value:i.price,onChange:a=>s({...i,price:a.target.value}),placeholder:"0"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{children:"DURATION"}),e.jsx("input",{className:"form-input",type:"text",value:i.duration,onChange:a=>s({...i,duration:a.target.value}),placeholder:"e.g. 45 mins"})]})]}),e.jsx("div",{className:"action-row",children:e.jsx(u,{onClick:g,children:"Add Service"})})]}),e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-title",children:"Your Services"}),n.length===0?e.jsx("div",{className:"empty",children:"No services added yet."}):e.jsx("div",{className:"grid",children:n.map(a=>e.jsxs("div",{className:"service-item",children:[e.jsxs("div",{className:"service-header",children:[e.jsx("div",{className:"service-name",children:a.name}),e.jsx("span",{className:`badge ${a.active?"active":"inactive"}`,children:a.active?"Active":"Inactive"})]}),e.jsxs("div",{className:"service-meta",children:[a.category," ",a.duration?`• ${a.duration}`:""]}),e.jsxs("div",{style:{marginTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{className:"service-price",children:["INR ",a.price||0]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{className:"toggle-btn",onClick:()=>m(a.id),children:a.active?"Disable":"Enable"}),e.jsx("button",{className:"toggle-btn",onClick:()=>f(a.id),children:"Remove"})]})]})]},a.id))})]})]})]})}export{w as default};
