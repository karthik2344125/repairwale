import{r as o,j as t}from"./index-BgBzfigI.js";import{B as l}from"./Button-D_miSh7Z.js";import{a as s,g as x,s as g,r as h}from"./favorites-DXiEhdJt.js";import{s as d}from"./toast-DQ1rwNUc.js";function N(){const[i,r]=o.useState([]);o.useEffect(()=>{r(s());const e=()=>r(s());return window.addEventListener("favoritesUpdated",e),window.addEventListener("storage",e),()=>{window.removeEventListener("favoritesUpdated",e),window.removeEventListener("storage",e)}},[]);const c=e=>{try{const a=x(),n=a.find(p=>p.id===e.id);n?n.qty+=1:a.push({id:e.id,title:e.title,price:e.price,qty:1}),g(a),window.dispatchEvent(new Event("cartUpdated")),d(`Added ${e.title} to cart`)}catch{}},m=e=>{h(e),r(s()),d("Removed from favorites")};return t.jsxs("div",{className:"page-container",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h1",{className:"page-title",children:"♥ Favorites"}),t.jsxs("p",{className:"page-subtitle",children:["Your saved services • ",i.length," items"]})]}),t.jsx("div",{className:"card",children:i.length===0?t.jsxs("div",{className:"empty-state",children:[t.jsx("div",{className:"empty-icon",children:"♥"}),t.jsx("p",{className:"empty-text",children:"No favorites yet. Tap ♥ on any service to save it here."})]}):t.jsx("div",{className:"item-list",children:i.map(e=>t.jsx("div",{className:"item",children:t.jsxs("div",{className:"item-row",children:[e.image?t.jsx("img",{className:"item-thumb",src:e.image,alt:e.title}):t.jsx("div",{className:"item-thumb",style:{display:"flex",alignItems:"center",justifyContent:"center",fontSize:32},children:"★"}),t.jsxs("div",{className:"item-content",children:[t.jsx("h4",{className:"item-title",children:e.title}),t.jsx("p",{className:"item-desc",children:"Saved from your browsing"}),t.jsxs("div",{className:"item-meta",children:[t.jsx("span",{className:"item-chip",children:"Quick reorder"}),e.category&&t.jsx("span",{className:"item-chip",children:e.category})]})]}),t.jsxs("div",{className:"item-actions",children:[t.jsxs("div",{className:"item-price",children:["₹",e.price]}),t.jsx(l,{size:"sm",variant:"primary",onClick:()=>c(e),children:"Add to Cart"}),t.jsx("button",{className:"btn btn-sm btn-danger",onClick:()=>m(e.id),children:"Remove"})]})]})},e.id))})}),t.jsx("style",{children:`
        /* PREMIUM THEME WITH #0B1220 BACKGROUND */
        .page-container {
          background: linear-gradient(180deg, #070b14 0%, #0b1220 100%) !important;
          min-height: 100vh !important;
        }

        .page-header {
          background: linear-gradient(135deg, #070b14 0%, #0b1220 100%) !important;
          border-bottom: 2px solid #243449 !important;
          box-shadow: 0 4px 20px rgba(56, 189, 248, 0.1) !important;
        }

        .page-title {
          background: linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
        }

        .card {
          background: linear-gradient(135deg, #0b1220 0%, #0f1d34 100%) !important;
          border: 1px solid #243449 !important;
          box-shadow: 0 4px 20px rgba(56, 189, 248, 0.1) !important;
        }

        .item {
          background: rgba(11, 18, 32, 0.5) !important;
          border: 1px solid #243449 !important;
          border-radius: 12px !important;
          padding: 16px !important;
          margin-bottom: 12px !important;
          transition: all 0.3s ease !important;
        }

        .item:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(56, 189, 248, 0.12) !important;
          border-color: #38bdf8 !important;
        }

        .item-title {
          color: #e6edf7 !important;
        }

        .item-price {
          background: linear-gradient(135deg, #38bdf8 0%, #7dd3fc 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          font-weight: 800 !important;
        }

        .empty-icon {
          font-size: 64px !important;
          opacity: 0.3 !important;
          filter: drop-shadow(0 4px 16px rgba(56, 189, 248, 0.18)) !important;
        }
      `})]})}export{N as default};
