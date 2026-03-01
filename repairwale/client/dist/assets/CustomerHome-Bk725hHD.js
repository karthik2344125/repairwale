import{a as u,u as y,r as s,j as e}from"./index-BgBzfigI.js";function v(){const{user:o}=u(),a=y(),[n,l]=s.useState(null),[d,p]=s.useState(0);s.useEffect(()=>{const t=()=>p(window.scrollY);return window.addEventListener("scroll",t),()=>window.removeEventListener("scroll",t)},[]);const c=Math.min(d*.5,100),m=[{id:"emergency",icon:"🚨",title:"Emergency Roadside",description:"Quick fixes for breakdowns",color:"#ef4444",lightColor:"rgba(239, 68, 68, 0.1)",services:[{name:"Breakdown Quick Fix",price:"₹549",time:"30-60 mins"},{name:"Flat Tyre Assist",price:"₹399",time:"30 mins"},{name:"Battery Jump-Start",price:"₹299",time:"20-30 mins"},{name:"Emergency Fuel Delivery",price:"₹249",time:"40 mins"},{name:"Locked Keys Support",price:"₹749",time:"45-60 mins"},{name:"Winch & Pull-out",price:"₹1,299",time:"60-90 mins"}]},{id:"maintenance",icon:"🔧",title:"Scheduled Maintenance",description:"Keep your vehicle in shape",color:"#3b82f6",lightColor:"rgba(59, 130, 246, 0.1)",services:[{name:"Basic Service",price:"₹1,299",time:"Same-day"},{name:"Comprehensive Service",price:"₹2,299",time:"Same-day"},{name:"Pickup & Drop",price:"₹399",time:"Next-day"},{name:"Detailing & Wash",price:"₹899",time:"Same-day"},{name:"AC Service",price:"₹1,499",time:"Same-day"},{name:"Interior Deep Clean",price:"₹1,699",time:"Same-day"}]},{id:"repairs",icon:"🛠️",title:"Mechanical & Electrical",description:"Expert diagnostics and repairs",color:"#8b5cf6",lightColor:"rgba(139, 92, 246, 0.1)",services:[{name:"Engine Tune-up",price:"₹1,799",time:"Same-day"},{name:"Brake Service",price:"₹999",time:"Same-day"},{name:"Battery Replacement",price:"₹499",time:"30-60 mins"},{name:"Clutch & Gear Work",price:"₹2,499",time:"1-2 days"},{name:"ECU Scan & Reset",price:"₹599",time:"60 mins"},{name:"Suspension & Steering",price:"₹1,899",time:"1 day"}]},{id:"tyres",icon:"🛞",title:"Tyres & Wheels",description:"Grip, balance, and alignment",color:"#f59e0b",lightColor:"rgba(245, 158, 11, 0.1)",services:[{name:"Wheel Alignment",price:"₹699",time:"60 mins"},{name:"Wheel Balancing",price:"₹599",time:"60 mins"},{name:"Tyre Replacement",price:"₹1,299",time:"90 mins"},{name:"Alloy Repair",price:"₹1,599",time:"Same-day"},{name:"Tyre Puncture Repair",price:"₹149",time:"30 mins"},{name:"Wheel Cleaning",price:"₹299",time:"45 mins"}]},{id:"towing",icon:"🚚",title:"Towing & Transport",description:"Safe vehicle transport",color:"#06b6d4",lightColor:"rgba(6, 182, 212, 0.1)",services:[{name:"City Tow (≤10 km)",price:"₹1,199",time:"45-90 mins"},{name:"Flatbed Tow",price:"₹1,899",time:"60-120 mins"},{name:"Long-Distance (per km)",price:"₹45/km",time:"Scheduled"},{name:"Bike Towing",price:"₹899",time:"45 mins"},{name:"Premium Car Transport",price:"₹2,299",time:"90 mins"},{name:"Interstate Transport",price:"Custom",time:"Scheduled"}]},{id:"body",icon:"🎨",title:"Body & Paint",description:"Restore your car's appearance",color:"#ec4899",lightColor:"rgba(236, 72, 153, 0.1)",services:[{name:"Paint Touch-up",price:"₹1,299",time:"1 day"},{name:"Dent Removal",price:"₹1,899",time:"1-2 days"},{name:"Glass Repair",price:"₹999",time:"Same-day"},{name:"Scratch Removal",price:"₹599",time:"Same-day"},{name:"Full Body Polish",price:"₹2,499",time:"1 day"},{name:"Ceramic Coating",price:"₹3,999",time:"1-2 days"}]}],x=[{icon:"⚡",title:"Fast Service",description:"Mechanics arrive within 30-90 minutes"},{icon:"🔒",title:"Verified Mechanics",description:"All mechanics are certified and background checked"},{icon:"📍",title:"Live Tracking",description:"Track your mechanic in real-time on the map"},{icon:"💬",title:"Live Chat Support",description:"Chat directly with your mechanic anytime"},{icon:"💰",title:"Transparent Pricing",description:"No hidden charges, price upfront"},{icon:"🛡️",title:"Quality Guarantee",description:"30-day service warranty on all repairs"}],g=[{name:"Rajesh K.",city:"Delhi",text:"Excellent service! Mechanic arrived on time and fixed my car quickly. Highly recommend!",rating:5},{name:"Priya S.",city:"Mumbai",text:"Very professional and courteous. The app made it so easy to book and track.",rating:5},{name:"Amit P.",city:"Bangalore",text:"Best roadside assistance app I've used. The pricing is honest and service is reliable.",rating:4}],h=[{number:"50K+",label:"Vehicles Served"},{number:"4.8★",label:"Average Rating"},{number:"24/7",label:"Emergency Support"},{number:"2000+",label:"Verified Mechanics"}];return e.jsxs("div",{style:{background:"#0a0e27",minHeight:"100vh",color:"#e5e7eb"},children:[e.jsxs("div",{style:{background:"linear-gradient(135deg, #1a2847 0%, #0f1729 100%)",padding:"80px 24px 60px",borderBottom:"1px solid rgba(96, 165, 250, 0.1)",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{position:"absolute",width:"400px",height:"400px",background:"radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",borderRadius:"50%",top:-150+c,right:-100,animation:"float 3s ease-in-out infinite"}}),e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",position:"relative",zIndex:1},children:[e.jsxs("div",{style:{marginBottom:"48px"},children:[e.jsx("p",{style:{margin:"0 0 12px 0",fontSize:"16px",fontWeight:"600",color:"rgba(129, 230, 217, 0.9)",textTransform:"uppercase",letterSpacing:"1px"},children:"👋 Welcome back"}),e.jsxs("h1",{style:{margin:"0 0 16px 0",fontSize:"clamp(32px, 6vw, 52px)",fontWeight:"900",background:"linear-gradient(135deg, #3b82f6, #60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:"1.2"},children:[(o==null?void 0:o.fullName)||"Customer","!"]}),e.jsx("p",{style:{margin:0,fontSize:"18px",color:"rgba(229,231,235,0.65)",maxWidth:"600px",lineHeight:"1.6"},children:"Need a mechanic? Professional roadside assistance and vehicle repair services available 24/7"})]}),e.jsxs("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>a("/map"),style:{padding:"16px 32px",background:"linear-gradient(135deg, #3b82f6, #1e40af)",color:"white",border:"none",borderRadius:"10px",fontSize:"16px",fontWeight:"700",cursor:"pointer",transition:"all 0.3s ease"},onMouseOver:t=>{t.target.style.transform="translateY(-2px)",t.target.style.boxShadow="0 12px 32px rgba(59, 130, 246, 0.4)"},onMouseOut:t=>{t.target.style.transform="translateY(0)",t.target.style.boxShadow="none"},children:"🗺️ Find Nearby Mechanics"}),e.jsx("button",{onClick:()=>a("/service"),style:{padding:"16px 32px",background:"transparent",color:"#60a5fa",border:"2px solid #3b82f6",borderRadius:"10px",fontSize:"16px",fontWeight:"700",cursor:"pointer",transition:"all 0.3s ease"},onMouseOver:t=>{t.target.style.background="rgba(59, 130, 246, 0.1)"},onMouseOut:t=>{t.target.style.background="transparent"},children:"📋 Browse Services"})]})]})]}),e.jsx("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"48px 24px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"32px"},children:h.map((t,i)=>e.jsxs("div",{style:{textAlign:"center",padding:"20px"},children:[e.jsx("div",{style:{fontSize:"32px",fontWeight:"900",background:"linear-gradient(135deg, #3b82f6, #60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"8px"},children:t.number}),e.jsx("div",{style:{fontSize:"14px",color:"#9ca3af",fontWeight:"600"},children:t.label})]},i))}),e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"60px 24px"},children:[e.jsx("h2",{style:{fontSize:"32px",fontWeight:"800",marginBottom:"48px",textAlign:"center",color:"#e5e7eb"},children:"Why Choose RepairWale? ✨"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"24px"},children:x.map((t,i)=>e.jsxs("div",{style:{background:"linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",border:"1px solid rgba(96, 165, 250, 0.1)",borderRadius:"16px",padding:"32px 24px",textAlign:"center",transition:"all 0.3s ease"},onMouseOver:r=>{r.currentTarget.style.transform="translateY(-8px)",r.currentTarget.style.borderColor="rgba(96, 165, 250, 0.14)",r.currentTarget.style.boxShadow="0 12px 40px rgba(59, 130, 246, 0.15)"},onMouseOut:r=>{r.currentTarget.style.transform="translateY(0)",r.currentTarget.style.borderColor="rgba(96, 165, 250, 0.1)",r.currentTarget.style.boxShadow="none"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"16px"},children:t.icon}),e.jsx("h3",{style:{fontSize:"18px",fontWeight:"700",marginBottom:"12px",color:"#e5e7eb"},children:t.title}),e.jsx("p",{style:{margin:0,fontSize:"14px",color:"#9ca3af",lineHeight:"1.6"},children:t.description})]},i))})]}),e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"60px 24px"},children:[e.jsx("h2",{style:{fontSize:"32px",fontWeight:"800",marginBottom:"48px",color:"#e5e7eb"},children:"Our Services 🛠️"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"24px"},children:m.map(t=>e.jsxs("div",{onClick:()=>l(n===t.id?null:t.id),style:{background:"linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",border:`2px solid ${n===t.id?t.color:"rgba(96, 165, 250, 0.1)"}`,borderRadius:"16px",padding:"32px 24px",cursor:"pointer",transition:"all 0.3s ease",boxShadow:n===t.id?`0 12px 40px ${t.color}20`:"none"},onMouseOver:i=>{n!==t.id&&(i.currentTarget.style.borderColor="rgba(96, 165, 250, 0.18)",i.currentTarget.style.transform="translateY(-4px)")},onMouseOut:i=>{n!==t.id&&(i.currentTarget.style.borderColor="rgba(96, 165, 250, 0.1)",i.currentTarget.style.transform="translateY(0)")},children:[e.jsx("div",{style:{fontSize:"40px",marginBottom:"16px"},children:t.icon}),e.jsx("h3",{style:{fontSize:"22px",fontWeight:"700",marginBottom:"8px",color:"#e5e7eb"},children:t.title}),e.jsx("p",{style:{fontSize:"14px",color:"#9ca3af",marginBottom:"16px"},children:t.description}),n===t.id&&e.jsxs("div",{style:{marginTop:"20px",paddingTop:"20px",borderTop:"1px solid rgba(96, 165, 250, 0.1)"},children:[e.jsx("div",{style:{display:"grid",gap:"12px"},children:t.services.map((i,r)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px",background:t.lightColor,borderRadius:"8px",fontSize:"13px"},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{style:{color:"#e5e7eb",fontWeight:"600",marginBottom:"4px"},children:i.name}),e.jsx("div",{style:{color:"#9ca3af",fontSize:"12px"},children:i.time})]}),e.jsx("div",{style:{color:t.color,fontWeight:"700",marginLeft:"12px"},children:i.price})]},r))}),e.jsx("button",{onClick:i=>{i.stopPropagation(),a("/service")},style:{width:"100%",marginTop:"16px",padding:"12px",background:t.color,color:"white",border:"none",borderRadius:"8px",fontWeight:"700",cursor:"pointer",transition:"all 0.2s ease"},onMouseOver:i=>{i.target.style.opacity="0.9",i.target.style.transform="scale(1.02)"},onMouseOut:i=>{i.target.style.opacity="1",i.target.style.transform="scale(1)"},children:"Book Now →"})]}),e.jsxs("div",{style:{marginTop:"16px",fontSize:"12px",color:"#9ca3af"},children:[t.services.length," services available"]})]},t.id))})]}),e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"60px 24px",borderTop:"1px solid rgba(96, 165, 250, 0.1)"},children:[e.jsx("h2",{style:{fontSize:"32px",fontWeight:"800",marginBottom:"48px",textAlign:"center",color:"#e5e7eb"},children:"How It Works 📱"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:"32px"},children:[{step:"1",icon:"📍",title:"Share Location",desc:"Tell us your location and problem"},{step:"2",icon:"⚡",title:"Get Matched",desc:"We find the best nearby mechanic"},{step:"3",icon:"💬",title:"Communicate",desc:"Chat with your mechanic in real-time"},{step:"4",icon:"✅",title:"Service & Pay",desc:"Get service and pay securely"}].map((t,i)=>e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx("div",{style:{width:"60px",height:"60px",background:"linear-gradient(135deg, #3b82f6, #1e40af)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:"28px"},children:t.icon}),e.jsx("h3",{style:{fontSize:"18px",fontWeight:"700",marginBottom:"8px",color:"#e5e7eb"},children:t.title}),e.jsx("p",{style:{margin:0,fontSize:"14px",color:"#9ca3af"},children:t.desc})]},i))})]}),e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto",padding:"60px 24px",borderTop:"1px solid rgba(96, 165, 250, 0.1)"},children:[e.jsx("h2",{style:{fontSize:"32px",fontWeight:"800",marginBottom:"48px",textAlign:"center",color:"#e5e7eb"},children:"What Our Customers Say ⭐"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"24px"},children:g.map((t,i)=>e.jsxs("div",{style:{background:"linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",border:"1px solid rgba(96, 165, 250, 0.1)",borderRadius:"16px",padding:"32px"},children:[e.jsx("div",{style:{display:"flex",gap:"6px",marginBottom:"16px"},children:[...Array(t.rating)].map((r,b)=>e.jsx("span",{style:{fontSize:"18px"},children:"⭐"},b))}),e.jsxs("p",{style:{fontSize:"15px",color:"#d1d5db",marginBottom:"16px",lineHeight:"1.6"},children:['"',t.text,'"']}),e.jsxs("div",{style:{borderTop:"1px solid rgba(96, 165, 250, 0.1)",paddingTop:"16px"},children:[e.jsx("p",{style:{margin:"0 0 4px 0",fontWeight:"700",color:"#e5e7eb"},children:t.name}),e.jsx("p",{style:{margin:0,fontSize:"13px",color:"#9ca3af"},children:t.city})]})]},i))})]}),e.jsxs("div",{style:{background:"linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 242, 0.05) 100%)",padding:"60px 24px",textAlign:"center",borderTop:"1px solid rgba(96, 165, 250, 0.1)"},children:[e.jsx("h2",{style:{fontSize:"32px",fontWeight:"800",marginBottom:"24px",color:"#e5e7eb"},children:"Ready to Get Your Vehicle Fixed? 🚗"}),e.jsx("p",{style:{fontSize:"18px",color:"rgba(229,231,235,0.7)",marginBottom:"32px",maxWidth:"600px",margin:"0 auto 32px"},children:"Join thousands of happy customers who trust RepairWale for their vehicle needs"}),e.jsx("button",{onClick:()=>a("/map"),style:{padding:"16px 48px",background:"linear-gradient(135deg, #3b82f6, #1e40af)",color:"white",border:"none",borderRadius:"10px",fontSize:"18px",fontWeight:"700",cursor:"pointer",transition:"all 0.3s ease"},onMouseOver:t=>{t.target.style.transform="scale(1.05)",t.target.style.boxShadow="0 12px 40px rgba(59, 130, 246, 0.4)"},onMouseOut:t=>{t.target.style.transform="scale(1)",t.target.style.boxShadow="none"},children:"Find a Mechanic Now"})]}),e.jsx("style",{children:`
        /* PREMIUM THEME WITH #0B1220 BACKGROUND */
        body {
          background: linear-gradient(180deg, #070b14 0%, #0b1220 50%, #0f1d34 100%) !important;
        }

        /* Container Overrides */
        [style*="background: '#0a0e27'"],
        [style*="background:#0a0e27"] {
          background: #070b14 !important;
        }

        /* Hero Section Enhancement */
        [style*="linear-gradient(135deg, #1a2847"] {
          background: linear-gradient(135deg, #070b14 0%, #0b1220 100%) !important;
          border-bottom: 2px solid #243449 !important;
          box-shadow: 0 8px 32px rgba(56, 189, 248, 0.1) !important;
        }

        /* Card Enhancements */
        [style*="background: 'linear-gradient(135deg, #1e293b"] {
          background: linear-gradient(135deg, #0b1220 0%, #0f1d34 100%) !important;
          border: 1px solid #243449 !important;
          box-shadow: 0 4px 20px rgba(56, 189, 248, 0.1) !important;
          transition: all 0.3s ease !important;
        }

        [style*="background: 'linear-gradient(135deg, #1e293b"]:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 8px 32px rgba(56, 189, 248, 0.12) !important;
          border-color: #38bdf8 !important;
        }

        /* Primary Button Gradients */
        [style*="background: 'linear-gradient(135deg, #3b82f6"] {
          background: linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%) !important;
          box-shadow: 0 4px 16px rgba(56, 189, 248, 0.18) !important;
        }

        [style*="background: 'linear-gradient(135deg, #3b82f6"]:hover {
          background: linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%) !important;
          box-shadow: 0 6px 24px rgba(56, 189, 248, 0.22) !important;
        }

        /* Service Category Cards */
        [style*="borderRadius: '16px'"] {
          position: relative !important;
          overflow: hidden !important;
        }

        [style*="borderRadius: '16px'"]::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          height: 3px !important;
          background: linear-gradient(90deg, transparent, #38bdf8, transparent) !important;
          opacity: 0 !important;
          transition: opacity 0.3s ease !important;
        }

        [style*="borderRadius: '16px'"]:hover::before {
          opacity: 1 !important;
        }

        /* Stats and Numbers with Gradient Text */
        [style*="fontSize: '32px'"],
        [style*="fontSize: '48px'"] {
          background: linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          filter: drop-shadow(0 2px 8px rgba(56, 189, 248, 0.18)) !important;
        }

        /* Text Colors */
        [style*="color: '#e5e7eb'"],
        [style*="color: 'rgba(229,231,235"] {
          color: #e6edf7 !important;
        }

        /* Focus States */
        input:focus,
        select:focus,
        textarea:focus,
        button:focus {
          outline: none !important;
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1) !important;
          border-color: #38bdf8 !important;
        }
      `})]})}export{v as default};
