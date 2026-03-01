import{r as l,j as e}from"./index-BgBzfigI.js";import{B as i}from"./Button-D_miSh7Z.js";import{a as n,s}from"./toast-DQ1rwNUc.js";function u(){const[r,t]=l.useState({fullName:"",phone:"",vehicleType:"Car",vehicleNumber:""});l.useEffect(()=>{try{const a=JSON.parse(localStorage.getItem("rw_customer")||"null");a&&t({fullName:a.fullName||"",phone:a.phone||"",vehicleType:a.vehicleType||"Car",vehicleNumber:a.vehicleNumber||""})}catch{}},[]);const o=()=>{if(!r.fullName||!r.phone){n("Please enter your name and phone");return}try{localStorage.setItem("rw_customer",JSON.stringify(r)),sessionStorage.setItem("rw_vehicle_type",r.vehicleType),s("Profile saved. You can now request help!"),window.location.href="/map"}catch{n("Could not save. Please retry")}};return e.jsxs("div",{className:"svc-card",style:{maxWidth:640,margin:"24px auto"},children:[e.jsx("div",{className:"svc-head",children:e.jsxs("div",{children:[e.jsx("div",{className:"svc-title",children:"Quick Setup"}),e.jsx("div",{className:"svc-sub",children:"Help us get you the best experience"})]})}),e.jsxs("div",{style:{display:"grid",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{className:"rw-label",children:"Full Name"}),e.jsx("input",{className:"rw-input",value:r.fullName,onChange:a=>t({...r,fullName:a.target.value}),placeholder:"Enter your name"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"rw-label",children:"Phone"}),e.jsx("input",{className:"rw-input",value:r.phone,onChange:a=>t({...r,phone:a.target.value}),placeholder:"10-digit number"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"rw-label",children:"Vehicle Type"}),e.jsxs("select",{className:"rw-input",value:r.vehicleType,onChange:a=>t({...r,vehicleType:a.target.value}),children:[e.jsx("option",{value:"Bike",children:"Bike"}),e.jsx("option",{value:"Car",children:"Car"}),e.jsx("option",{value:"SUV",children:"SUV"}),e.jsx("option",{value:"EV",children:"EV"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"rw-label",children:"Vehicle Number (optional)"}),e.jsx("input",{className:"rw-input",value:r.vehicleNumber,onChange:a=>t({...r,vehicleNumber:a.target.value}),placeholder:"e.g., KA01 AB 1234"})]}),e.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"flex-end",marginTop:8},children:[e.jsx(i,{variant:"ghost",onClick:()=>window.history.back(),children:"Cancel"}),e.jsx(i,{variant:"primary",onClick:o,children:"Save & Continue"})]})]}),e.jsx("style",{children:`
        /* PREMIUM THEME WITH #0B1220 BACKGROUND */
        body {
          background: linear-gradient(180deg, #070b14 0%, #0b1220 100%) !important;
        }

        .svc-card {
          background: linear-gradient(135deg, #0b1220 0%, #0f1d34 100%) !important;
          border: 1px solid #243449 !important;
          box-shadow: 0 8px 32px rgba(56, 189, 248, 0.1) !important;
          border-radius: 16px !important;
          padding: 32px !important;
        }

        .svc-title {
          background: linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          font-weight: 800 !important;
        }

        .rw-input {
          background: rgba(11, 18, 32, 0.8) !important;
          border: 1px solid #243449 !important;
          color: #e6edf7 !important;
          transition: all 0.3s ease !important;
        }

        .rw-input:focus {
          border-color: #38bdf8 !important;
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1) !important;
          outline: none !important;
        }

        .rw-label {
          color: #e6edf7 !important;
          font-weight: 600 !important;
        }
      `})]})}export{u as default};
