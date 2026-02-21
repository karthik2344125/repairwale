import{u,a as f,r as s,j as t}from"./index-TLEbH3MQ.js";const b=[{id:"customer",icon:"👤",title:"Customer",subtitle:"Need vehicle assistance?",description:"Request roadside help, browse mechanics, track repairs, and manage your vehicle services in one place.",features:["SOS dispatch in minutes","Live tracking updates","Digital payments & invoices","Full history & notes"],accent:"#6dd5ed",gradient:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",darkGradient:"linear-gradient(135deg, #0ea5e9, #06b6d4)"},{id:"mechanic",icon:"🔧",title:"Mechanic",subtitle:"Offer your expertise?",description:"Join our network of certified professionals. Receive customer requests, manage your schedule, and grow your business.",features:["Instant leads near you","Smart scheduling","Transparent payouts","Build public reputation"],accent:"#f093fb",gradient:"linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",darkGradient:"linear-gradient(135deg, #ec4899, #dc2626)"}];function h(){const r=u(),{selectRole:l,logout:d}=f(),[o,c]=s.useState(null),[i,p]=s.useState(!1),n=async e=>{i||(console.log("🎯 Role selected:",e),c(e),p(!0),await l(e),console.log("✅ Role set in context, navigating to /service"),r("/service",{replace:!0}))},g=()=>{d(),r("/login")};return t.jsxs("div",{style:{minHeight:"100vh",background:"#0f172a",padding:"48px 20px 80px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"system-ui, -apple-system, sans-serif"},children:[t.jsx("style",{children:`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .role-container {
          width: 100%;
          max-width: 1200px;
          animation: fadeInUp 0.5s ease-out;
        }

        .role-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .role-title {
          font-size: 40px;
          font-weight: 800;
          color: #f1f5f9;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .role-subtitle {
          font-size: 16px;
          color: #94a3b8;
          max-width: 500px;
          margin: 0 auto;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .role-card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 32px 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .role-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient, linear-gradient(135deg, #3b82f6, #8b5cf6));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .role-card:hover {
          border-color: #475569;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .role-card:hover::before {
          opacity: 1;
        }

        .role-card.selected {
          border-color: #3b82f6;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8));
          box-shadow: 0 0 24px rgba(59, 130, 246, 0.2);
        }

        .role-icon {
          font-size: 48px;
          margin-bottom: 16px;
          display: inline-block;
        }

        .role-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 8px;
        }

        .role-card-subtitle {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .role-card-description {
          font-size: 14px;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .role-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px 0;
          border-top: 1px solid #334155;
          border-bottom: 1px solid #334155;
          margin-bottom: 20px;
        }

        .role-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #cbd5e1;
        }

        .role-feature::before {
          content: '✓';
          color: #10b981;
          font-weight: bold;
          flex-shrink: 0;
        }

        .role-btn {
          width: 100%;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          background: var(--gradient, linear-gradient(135deg, #3b82f6, #8b5cf6));
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .role-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .role-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .role-btn.loading {
          animation: pulse 1.5s ease-in-out infinite;
        }

        .logout-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 8px 16px;
          background: #334155;
          color: #f1f5f9;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: #475569;
        }

        @media (max-width: 768px) {
          .role-title {
            font-size: 28px;
          }

          .roles-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .role-card {
            padding: 24px 16px;
          }
        }
      `}),t.jsx("button",{className:"logout-btn",onClick:g,children:"Logout"}),t.jsxs("div",{className:"role-container",children:[t.jsxs("div",{className:"role-header",children:[t.jsx("h1",{className:"role-title",children:"Select Your Role"}),t.jsx("p",{className:"role-subtitle",children:"Choose how you'd like to use RepairWale. You can change this later if needed."})]}),t.jsx("div",{className:"roles-grid",children:b.map(e=>t.jsxs("div",{className:`role-card ${o===e.id?"selected":""}`,style:{"--gradient":e.gradient},onClick:()=>n(e.id),children:[t.jsx("div",{className:"role-icon",children:e.icon}),t.jsx("h3",{className:"role-card-title",children:e.title}),t.jsx("p",{className:"role-card-subtitle",children:e.subtitle}),t.jsx("p",{className:"role-card-description",children:e.description}),t.jsx("div",{className:"role-features",children:e.features.map((a,x)=>t.jsx("div",{className:"role-feature",children:a},x))}),t.jsx("button",{className:`role-btn ${o===e.id&&i?"loading":""}`,style:{background:e.gradient},disabled:i&&o!==e.id,onClick:a=>{a.stopPropagation(),n(e.id)},children:o===e.id&&i?"Setting up...":`Continue as ${e.title}`})]},e.id))}),t.jsxs("div",{style:{textAlign:"center",padding:"24px",background:"#1e293b",borderRadius:"8px",border:"1px solid #334155"},children:[t.jsx("p",{style:{fontSize:"13px",color:"#94a3b8",margin:"0 0 8px 0"},children:"Each role gets a personalized dashboard with features tailored for you."}),t.jsx("p",{style:{color:"#64748b",textDecoration:"none",fontSize:"12px",fontWeight:"500",margin:0},children:"You can switch roles anytime from your account settings."})]})]})]})}export{h as default};
