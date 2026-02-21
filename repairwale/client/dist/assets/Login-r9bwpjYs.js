import{u as T,a as C,r as s,j as e}from"./index-TLEbH3MQ.js";function B(){const h=T(),{login:y}=C(),[r,w]=s.useState(!1),[i,x]=s.useState(!1),[a,n]=s.useState({}),[u,g]=s.useState(""),[m,j]=s.useState(!1),[f,v]=s.useState(!1),[o,b]=s.useState({email:"",password:"",confirmPassword:"",fullName:"",phone:"",acceptTerms:!1}),S=()=>{const t={};return o.email.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email)||(t.email="Invalid email format"):t.email="Email is required",o.password?o.password.length<6&&(t.password="Password must be at least 6 characters"):t.password="Password is required",r&&(o.fullName.trim()||(t.fullName="Full name is required"),o.phone.trim()?/^\d{10}$/.test(o.phone.replace(/\D/g,""))||(t.phone="Phone must be 10 digits"):t.phone="Phone number is required",o.password!==o.confirmPassword&&(t.confirmPassword="Passwords do not match"),o.acceptTerms||(t.acceptTerms="You must accept the terms and conditions")),n(t),Object.keys(t).length===0},k=async t=>{if(t.preventDefault(),!!S()){x(!0),g(""),n({});try{const p=r?"/api/auth/register":"/api/auth/login",d=r?{email:o.email,password:o.password,fullName:o.fullName}:{email:o.email,password:o.password},c=await(await fetch(`http://localhost:3000${p}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})).json();if(!c.ok){n({form:c.error||"Authentication failed"}),x(!1);return}localStorage.setItem("repairwale_token",c.token),localStorage.setItem("repairwale_user",JSON.stringify(c.user)),y(o.email,o.password,o.fullName),g(r?"🎉 Account created successfully!":"✓ Welcome back!"),b({email:"",password:"",confirmPassword:"",fullName:"",phone:"",acceptTerms:!1}),setTimeout(()=>{h("/role-selection")},800)}catch(p){console.error("Auth error:",p),n({form:"Server connection failed. Please check if the backend is running."})}finally{x(!1)}}},l=(t,p)=>{b(d=>({...d,[t]:p})),a[t]&&n(d=>({...d,[t]:""}))},z=()=>{w(!r),n({}),g("")};return e.jsxs("div",{style:{minHeight:"100vh",background:"linear-gradient(145deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',position:"relative",overflow:"hidden"},children:[e.jsxs("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden",zIndex:0},children:[e.jsx("div",{style:{position:"absolute",width:"400px",height:"400px",background:"radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)",borderRadius:"50%",top:"-150px",left:"-100px",animation:"float 20s ease-in-out infinite"}}),e.jsx("div",{style:{position:"absolute",width:"380px",height:"380px",background:"radial-gradient(circle, rgba(245, 87, 108, 0.2) 0%, transparent 70%)",borderRadius:"50%",bottom:"-120px",right:"-80px",animation:"float 25s ease-in-out infinite reverse"}}),e.jsx("div",{style:{position:"absolute",width:"300px",height:"300px",background:"radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, transparent 70%)",borderRadius:"50%",top:"50%",left:"50%",animation:"float 30s ease-in-out infinite"}})]}),e.jsx("style",{children:`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.05); }
        }
        
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .login-container { animation: slideInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1); }
        
        @media (max-width: 768px) {
          .login-container { padding: 32px 24px !important; }
        }
        @media (max-width: 480px) {
          .login-container { padding: 28px 20px !important; border-radius: 20px !important; }
          .branding-title { font-size: 24px !important; }
        }
        
        .input-field {
          width: 100%; padding: 13px 15px;
          border: 1.5px solid rgba(102, 126, 234, 0.2);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          outline: none;
          backdrop-filter: blur(10px);
        }
        
        .input-field:focus {
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
        }
        
        .input-field::placeholder { color: rgba(255, 255, 255, 0.5); }
        
        .btn-submit {
          width: 100%; padding: 14px 24px;
          border: none; border-radius: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white; font-size: 16px; font-weight: 700;
          cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.35);
          text-transform: uppercase; letter-spacing: 0.8px;
          overflow: hidden; position: relative;
        }
        
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
        }
        
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        
        
      `}),e.jsxs("div",{className:"login-container",style:{width:"100%",maxWidth:"420px",background:"rgba(30, 30, 46, 0.7)",backdropFilter:"blur(20px)",border:"1px solid rgba(102, 126, 234, 0.2)",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.4)",borderRadius:"24px",padding:"40px 36px",position:"relative",zIndex:1},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:"32px"},children:[e.jsx("div",{style:{width:"80px",height:"80px",margin:"0 auto 16px",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",borderRadius:"18px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"40px",boxShadow:"0 8px 24px rgba(102, 126, 234, 0.4)",transform:"rotate(-5deg)"},children:"🔧"}),e.jsx("h1",{className:"branding-title",style:{fontSize:"32px",fontWeight:"900",margin:"0 0 8px",color:"#ffffff"},children:"RepairWale"}),e.jsx("p",{style:{fontSize:"14px",color:"rgba(255, 255, 255, 0.6)",margin:"0",fontWeight:"500"},children:r?"Create your account":"Sign in to continue"})]}),u&&e.jsx("div",{style:{background:"linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%)",border:"1px solid rgba(16, 185, 129, 0.4)",color:"#a7f3d0",padding:"14px 18px",borderRadius:"10px",fontSize:"14px",fontWeight:"600",marginBottom:"20px"},children:u}),a.form&&e.jsxs("div",{style:{background:"linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)",border:"1px solid rgba(239, 68, 68, 0.4)",color:"#fca5a5",padding:"14px 18px",borderRadius:"10px",fontSize:"14px",fontWeight:"600",marginBottom:"20px"},children:["⚠️ ",a.form]}),e.jsxs("form",{onSubmit:k,style:{marginBottom:"20px"},children:[r&&e.jsxs("div",{style:{marginBottom:"18px"},children:[e.jsx("label",{style:{display:"block",fontSize:"12px",fontWeight:"700",color:"rgba(255, 255, 255, 0.7)",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.8px"},children:"Full Name"}),e.jsx("input",{type:"text",className:"input-field",value:o.fullName,onChange:t=>l("fullName",t.target.value),placeholder:"John Doe",disabled:i}),a.fullName&&e.jsxs("div",{style:{color:"#ff6b6b",fontSize:"12px",marginTop:"6px"},children:["⚠️ ",a.fullName]})]}),e.jsxs("div",{style:{marginBottom:"18px"},children:[e.jsx("label",{style:{display:"block",fontSize:"12px",fontWeight:"700",color:"rgba(255, 255, 255, 0.7)",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.8px"},children:"Email Address"}),e.jsx("input",{type:"email",className:"input-field",value:o.email,onChange:t=>l("email",t.target.value),placeholder:"your@email.com",disabled:i}),a.email&&e.jsxs("div",{style:{color:"#ff6b6b",fontSize:"12px",marginTop:"6px"},children:["⚠️ ",a.email]})]}),r&&e.jsxs("div",{style:{marginBottom:"18px"},children:[e.jsx("label",{style:{display:"block",fontSize:"12px",fontWeight:"700",color:"rgba(255, 255, 255, 0.7)",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.8px"},children:"Phone Number"}),e.jsx("input",{type:"tel",className:"input-field",value:o.phone,onChange:t=>l("phone",t.target.value.replace(/\D/g,"").slice(0,10)),placeholder:"9876543210",disabled:i}),a.phone&&e.jsxs("div",{style:{color:"#ff6b6b",fontSize:"12px",marginTop:"6px"},children:["⚠️ ",a.phone]})]}),e.jsxs("div",{style:{marginBottom:"18px"},children:[e.jsx("label",{style:{display:"block",fontSize:"12px",fontWeight:"700",color:"rgba(255, 255, 255, 0.7)",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.8px"},children:"Password"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("input",{type:m?"text":"password",className:"input-field",value:o.password,onChange:t=>l("password",t.target.value),placeholder:"••••••••",disabled:i,style:{paddingRight:"45px"}}),e.jsx("button",{type:"button",onClick:()=>j(!m),style:{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#667eea",cursor:"pointer",fontSize:"18px",padding:"4px"},children:m?"👁️":"👁️‍🗨️"})]}),a.password&&e.jsxs("div",{style:{color:"#ff6b6b",fontSize:"12px",marginTop:"6px"},children:["⚠️ ",a.password]})]}),r&&e.jsxs("div",{style:{marginBottom:"18px"},children:[e.jsx("label",{style:{display:"block",fontSize:"12px",fontWeight:"700",color:"rgba(255, 255, 255, 0.7)",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.8px"},children:"Confirm Password"}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("input",{type:f?"text":"password",className:"input-field",value:o.confirmPassword,onChange:t=>l("confirmPassword",t.target.value),placeholder:"••••••••",disabled:i,style:{paddingRight:"45px"}}),e.jsx("button",{type:"button",onClick:()=>v(!f),style:{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#667eea",cursor:"pointer",fontSize:"18px",padding:"4px"},children:f?"👁️":"👁️‍🗨️"})]}),a.confirmPassword&&e.jsxs("div",{style:{color:"#ff6b6b",fontSize:"12px",marginTop:"6px"},children:["⚠️ ",a.confirmPassword]})]}),!r&&e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px",fontSize:"13px"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",color:"rgba(255, 255, 255, 0.7)"},children:[e.jsx("input",{type:"checkbox",style:{accentColor:"#667eea"}}),"Remember me"]}),e.jsx("a",{href:"#",style:{color:"#667eea",textDecoration:"none",fontWeight:"600"},children:"Forgot?"})]}),r&&e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:"8px",cursor:"pointer",fontSize:"13px",color:"rgba(255, 255, 255, 0.7)"},children:[e.jsx("input",{type:"checkbox",checked:o.acceptTerms,onChange:t=>l("acceptTerms",t.target.checked),disabled:i,style:{accentColor:"#667eea",marginTop:"3px"}}),"I agree to Terms & Conditions"]}),a.acceptTerms&&e.jsxs("div",{style:{color:"#ff6b6b",fontSize:"12px",marginTop:"6px"},children:["⚠️ ",a.acceptTerms]})]}),e.jsx("button",{type:"submit",className:"btn-submit",disabled:i,children:i?e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"},children:[e.jsx("div",{style:{width:"18px",height:"18px",border:"3px solid rgba(255,255,255,0.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),e.jsx("span",{children:"Processing..."})]}):r?"✨ Create Account":"🚀 Sign In"})]}),e.jsxs("div",{style:{textAlign:"center",fontSize:"14px",color:"rgba(255, 255, 255, 0.6)",marginBottom:"20px"},children:[r?"Already have an account? ":"Don't have an account? ",e.jsx("button",{onClick:z,disabled:i,style:{background:"none",border:"none",color:"#667eea",cursor:"pointer",fontWeight:"700",fontSize:"14px"},children:r?"Sign in":"Sign up"})]})]})]})}export{B as default};
