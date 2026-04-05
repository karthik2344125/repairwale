import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAPIBase, getAPICandidates } from '../services/apiConfig'
import { IconBot, IconChat, IconMapPin, IconMoney, IconPhone, IconSpark, IconWrench } from '../../icons'

export default function AISupport() {
  const navigate = useNavigate()
  const [activeRole, setActiveRole] = useState(localStorage.getItem('rw_role_locked') || 'customer')
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'hello! i\'m the RepairWale support assistant. how can i help you today?', timestamp: new Date() }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [conversationContext, setConversationContext] = useState({ lastIntent: null, userAsked: [] })
  const [followUpSuggestions, setFollowUpSuggestions] = useState([])
  const messagesEndRef = useRef(null)

  const quickSuggestions = activeRole === 'mechanic'
    ? [
        { icon: IconMoney, text: 'today earnings', query: 'Show my earnings tips for today' },
        { icon: IconWrench, text: 'job handling', query: 'How should I handle a new service request?' },
        { icon: IconMapPin, text: 'route support', query: 'How can I reach customer faster?' },
        { icon: IconChat, text: 'customer chat', query: 'Best way to chat with customer professionally' }
      ]
    : [
        { icon: IconMoney, text: 'pricing', query: 'What are your service prices?' },
        { icon: IconPhone, text: 'emergency', query: 'I need emergency help now!' },
        { icon: IconWrench, text: 'book service', query: 'How do I book a service?' },
        { icon: IconMapPin, text: 'track order', query: 'How to track my mechanic?' }
      ]

  useEffect(() => {
    const syncRole = () => {
      const nextRole = localStorage.getItem('rw_role_locked') || 'customer'
      setActiveRole(nextRole)
    }

    syncRole()
    window.addEventListener('storage', syncRole)
    window.addEventListener('repairwale:sync', syncRole)

    return () => {
      window.removeEventListener('storage', syncRole)
      window.removeEventListener('repairwale:sync', syncRole)
    }
  }, [])

  useEffect(() => {
    const roleGreeting = activeRole === 'mechanic'
      ? "hello! i'm the RepairWale mechanic assistant. i can help with jobs, routing, customer chat, and earnings."
      : "hello! i'm the RepairWale customer assistant. i can help with booking, pricing, tracking, and support."

    setMessages((prev) => {
      if (!prev.length) {
        return [{ id: 1, role: 'ai', text: roleGreeting, timestamp: new Date() }]
      }

      if (prev.length === 1 && prev[0].role === 'ai') {
        return [{ ...prev[0], text: roleGreeting }]
      }

      return prev
    })
  }, [activeRole])

  const getActionIcon = (value = '') => {
    const source = value.toLowerCase()

    if (source.includes('call') || source.includes('phone')) return IconPhone
    if (source.includes('book') || source.includes('service')) return IconWrench
    if (source.includes('price') || source.includes('refund') || source.includes('pay')) return IconMoney
    if (source.includes('track') || source.includes('order') || source.includes('location')) return IconMapPin
    if (source.includes('chat') || source.includes('support') || source.includes('help')) return IconChat

    return IconSpark
  }

  useEffect(() => {
    const styleSheet = document.createElement('style')
    styleSheet.textContent = `
      @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      @keyframes pulse { 
        0%, 100% { box-shadow: 0 8px 24px rgba(29,99,255,0.4); } 
        50% { box-shadow: 0 12px 32px rgba(29,99,255,0.6); } 
      }
      @keyframes glow {
        0%, 100% { border-color: rgba(29,99,255,0.3); }
        50% { border-color: rgba(29,99,255,0.6); }
      }
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      .ai-support-button { animation: pulse 2s infinite; }
      .ai-support-modal { animation: slideUp 0.3s ease-out; }
      .ai-message { animation: fadeIn 0.3s ease-in; }
      .ai-suggestion { 
        transition: all 0.3s ease; 
      }
      .ai-suggestion:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(29,99,255,0.3);
      }
    `
    document.head.appendChild(styleSheet)
    return () => document.head.removeChild(styleSheet)
  }, [])

  // Enhanced intent detection with more patterns
  const detectIntent = (userMessage) => {
    const msg = userMessage.toLowerCase()
    
    // Emergency keywords (highest priority)
    if (['emergency', 'urgent', 'breakdown', 'stuck', 'help now', 'stranded', 'asap', 'immediately', 'rescue'].some(k => msg.includes(k))) {
      return 'emergency'
    }
    
    // Pricing keywords
    if (['price', 'cost', 'how much', 'charges', 'rate', 'fee', 'pricing', 'expensive', 'cheap', 'afford'].some(k => msg.includes(k))) {
      return 'pricing'
    }
    
    // Service inquiry
    if (['service', 'what services', 'what can you do', 'offerings', 'what do you offer', 'available', 'provide'].some(k => msg.includes(k))) {
      return 'services'
    }
    
    // Booking related
    if (['book', 'schedule', 'appointment', 'reserve', 'how to book', 'make booking', 'order'].some(k => msg.includes(k))) {
      return 'booking'
    }
    
    // Tracking queries
    if (['track', 'status', 'where is', 'eta', 'location', 'mechanic location', 'progress', 'update'].some(k => msg.includes(k))) {
      return 'tracking'
    }
    
    // Payment queries
    if (['payment', 'pay', 'cash', 'card', 'upi', 'wallet', 'money', 'transaction'].some(k => msg.includes(k))) {
      return 'payment'
    }
    
    // Contact/Support
    if (['contact', 'support', 'help', 'talk', 'customer care', 'call', 'phone', 'email'].some(k => msg.includes(k))) {
      return 'contact'
    }
    
    // Mechanic info
    if (['mechanic', 'who will come', 'certified', 'verified', 'professional', 'technician', 'expert'].some(k => msg.includes(k))) {
      return 'mechanic_info'
    }
    
    // Cancellation/Refund
    if (['cancel', 'cancellation', 'refund', 'policy', 'return'].some(k => msg.includes(k))) {
      return 'cancellation'
    }
    
    // Warranty/Quality
    if (['warranty', 'guarantee', 'quality', 'assurance'].some(k => msg.includes(k))) {
      return 'warranty'
    }
    
    // Coverage area
    if (['area', 'location', 'coverage', 'serve', 'city', 'region', 'available near'].some(k => msg.includes(k))) {
      return 'coverage'
    }
    
    // Greeting
    if (['hi', 'hello', 'hey', 'hii', 'yo', 'greetings'].some(k => msg === k || msg.startsWith(k + ' ') || msg.endsWith(' ' + k))) {
      return 'greeting'
    }
    
    // Thanks
    if (['thanks', 'thank you', 'great', 'awesome', 'good', 'nice', 'perfect'].some(k => msg.includes(k))) {
      return 'thanks'
    }
    
    // Specific vehicle issues
    if (['flat tire', 'flat tyre', 'puncture', 'battery', 'dead battery', 'engine', 'brake', 'oil change'].some(k => msg.includes(k))) {
      return 'specific_issue'
    }
    
    return 'general'
  }

  // Generate follow-up suggestions based on intent
  const getFollowUpSuggestions = (intent) => {
    const suggestions = {
      pricing: [
        { text: ' Book a service', query: 'How do I book a service?' },
        { text: ' Emergency pricing', query: 'Emergency service costs?' }
      ],
      emergency: [
        { text: ' Call now', action: () => window.location.href = 'tel:1800-REPAIR-NOW' },
        { text: ' Book emergency', query: 'Book emergency service' }
      ],
      booking: [
        { text: ' See pricing', query: 'What are your prices?' },
        { text: ' View services', action: () => navigate('/service') }
      ],
      services: [
        { text: ' Check prices', query: 'Service pricing' },
        { text: ' How to book', query: 'How do I book?' }
      ],
      tracking: [
        { text: ' My orders', action: () => navigate('/orders') },
        { text: ' Chat with mechanic', query: 'How to chat?' }
      ],
      contact: [
        { text: ' Emergency help', query: 'Emergency contact' },
        { text: ' Book service', query: 'Book now' }
      ]
    }
    
    return suggestions[intent] || []
  }

  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()
    const intent = detectIntent(msg)
    
    // Update conversation context
    setConversationContext(prev => ({
      lastIntent: intent,
      userAsked: [...prev.userAsked, intent]
    }))
    
    // Generate follow-up suggestions
    setFollowUpSuggestions(getFollowUpSuggestions(intent))
    
    // Context-aware responses
    let response = ''
    let actionButtons = []

    if (activeRole === 'mechanic') {
      switch (intent) {
        case 'pricing':
          response = "**Mechanic Earnings Guide**\n\nYour earning potential depends on:\n- Fast response time\n- Strong customer ratings\n- Completing jobs cleanly\n- Keeping availability updated\n\nTips: pick nearby jobs first, confirm scope early, and close jobs with proper notes."
          actionButtons = [
            { text: 'Open Orders', action: () => navigate('/mechanic/orders') },
            { text: 'View Profile', action: () => navigate('/mechanic/profile') }
          ]
          break
        case 'tracking':
          response = "**Mechanic Live Workflow**\n\n1. Accept the request quickly\n2. Update your movement/location\n3. Confirm arrival in chat\n4. Share progress updates\n5. Mark completion with final summary\n\nThis improves trust and ratings."
          actionButtons = [
            { text: 'Open Orders', action: () => navigate('/mechanic/orders') },
            { text: 'Live Queue', action: () => navigate('/mechanic/live-orders') }
          ]
          break
        case 'contact':
          response = "**Professional Customer Communication**\n\nUse short and clear updates:\n- 'On the way, ETA 12 min'\n- 'Reached location'\n- 'Diagnosis done, starting fix'\n- 'Service complete'\n\nAlways confirm before extra chargeable work."
          actionButtons = [
            { text: 'Open Orders', action: () => navigate('/mechanic/orders') }
          ]
          break
        case 'services':
          response = "**Mechanic Service Execution Tips**\n\n- Verify issue before starting\n- Explain the fix in simple words\n- Keep transparent pricing\n- Capture completion details\n- Request review politely at the end"
          actionButtons = [
            { text: 'Open Profile', action: () => navigate('/mechanic/profile') },
            { text: 'Orders', action: () => navigate('/mechanic/orders') }
          ]
          break
        default:
          response = "**Mechanic Assistant Ready**\n\nI can help you with:\n- handling new orders\n- routing and ETA updates\n- customer communication\n- improving completion quality and ratings\n\nAsk anything about your mechanic workflow."
          actionButtons = [
            { text: 'Open Orders', action: () => navigate('/mechanic/orders') },
            { text: 'Dashboard', action: () => navigate('/mechanic/dashboard') }
          ]
      }

      return { text: response, buttons: actionButtons }
    }
    
    switch(intent) {
      case 'pricing':
        response = " **Service Pricing**\n\n **Emergency Services:**\n Breakdown Quick Fix: 549 (30-60 min)\n Flat Tyre Assist: 399 (30 min)\n Battery Jump-Start: 299 (20-30 min)\n Emergency Fuel: 249 (40 min)\n Key Unlock: 749 (45-60 min)\n\n **Maintenance:**\n Basic Service: 1,299\n Comprehensive Service: 2,299\n AC Service: 1,499\n Detailing: 899\n\n **Repairs:**\n Brake Service: 999\n Engine Tune-up: 1,799\n Battery Replacement: 499\n Clutch Work: 2,499\n\n **Towing:**\n City Tow (10km): 1,199\n Flatbed: 1,899\n Long Distance: 45/km\n\n *All prices include service charge. Parts are extra.*"
        actionButtons = [
          { text: ' Book Service', action: () => navigate('/service') },
          { text: ' Emergency', query: 'Emergency help' }
        ]
        break
        
      case 'emergency':
        response = " **EMERGENCY SERVICE - AVAILABLE NOW!**\n\n **Immediate Response Available:**\n\n Breakdown Quick Fix: 549 (arrives in 30-60 min)\n Flat Tyre Change: 399 (arrives in 30 min)\n Battery Jump-Start: 299 (arrives in 20-30 min)\n Emergency Fuel: 249 (arrives in 40 min)\n Key Unlock Service: 749 (arrives in 45-60 min)\n Winch & Pull-out: 1,299 (arrives in 60-90 min)\n\n **CALL IMMEDIATELY:** 1800-REPAIR-NOW\n\n **Or use our app:**\n1. Share your exact location\n2. Describe the issue\n3. Get instant dispatch\n4. Track mechanic live\n\n **Pro Tip:** Share your location via GPS for 50% faster response!"
        actionButtons = [
          { text: ' Call Now', action: () => window.location.href = 'tel:1800-REPAIR-NOW' },
          { text: ' Book Emergency', action: () => navigate('/service') },
          { text: ' Share Location', query: 'How to share location?' }
        ]
        break
        
      case 'services':
        response = " **Our Complete Services**\n\n **Emergency Roadside (24/7)**\n   Breakdown, flat tyre, jump-start, fuel, towing\n\n **Scheduled Maintenance**\n   Basic service, comprehensive, AC, detailing\n\n **Mechanical & Electrical**\n   Engine, brakes, battery, clutch, diagnostics\n\n **Tyres & Wheels**\n   Alignment, balancing, replacement, repair\n\n **Body Care & Detailing**\n   PPF, ceramic coating, denting, painting\n\n **Towing & Transport**\n   City tow, flatbed, long-distance, bike transport\n\n **Features:**\n 24/7 Availability\n Live GPS Tracking\n Real-time Chat with Mechanic\n Certified Professionals\n Digital Invoicing\n Service History"
        actionButtons = [
          { text: ' Browse Services', action: () => navigate('/service') },
          { text: ' Check Pricing', query: 'pricing' },
          { text: ' How to Book', query: 'booking' }
        ]
        break
        
      case 'booking':
        response = " **How to Book Your Service**\n\n**Easy 6-Step Process:**\n\n1 **Browse Services**\n    Go to Services page\n    Browse by category\n\n2 **Select Service**\n    Click on service you need\n    View details & pricing\n\n3 **Add to Cart**\n    Click 'Add to Cart'\n    Can add multiple services\n\n4 **Proceed to Checkout**\n    Review your cart\n    Apply promo codes\n\n5 **Enter Details**\n    Vehicle information\n    Service location\n    Preferred time slot\n\n6 **Confirm & Pay**\n    Choose payment method\n    Get instant confirmation\n\n **After Booking:**\n Get mechanic assignment\n Live GPS tracking\n Real-time updates\n Direct chat with mechanic\n Digital invoice\n\n **Emergency Booking:**\nFor urgent help, use 'Emergency' category for instant dispatch!"
        actionButtons = [
          { text: ' Browse Services', action: () => navigate('/service') },
          { text: ' Book Emergency', query: 'emergency' },
          { text: ' View Pricing', query: 'pricing' }
        ]
        break
        
      case 'tracking':
        response = " **Live Order Tracking**\n\n **Real-time Features:**\n GPS location of mechanic\n Accurate ETA updates\n Mechanic profile & photo\n Live status notifications\n Direct chat available\n Service progress updates\n\n**How to Track:**\n\n1. Go to '**My Orders**' page\n2. Click on your active order\n3. View live map with mechanic location\n4. See real-time ETA\n5. Chat directly with mechanic\n\n **Notifications:**\n Mechanic assigned\n On the way (with live location)\n Arrived at location\n Service started\n Service completed\n Payment & invoice\n\n **Chat Features:**\n Ask questions\n Share additional details\n Get photos/updates\n Coordinate meeting point"
        actionButtons = [
          { text: ' My Orders', action: () => navigate('/orders') },
          { text: ' Book Service', action: () => navigate('/service') }
        ]
        break
        
      case 'payment':
        response = " **Payment Options & Security**\n\n**Accepted Payment Methods:**\n\n Credit/Debit Cards (Visa, Mastercard, Amex, Rupay)\n UPI (All apps: GPay, PhonePe, Paytm, etc.)\n Net Banking (All major banks)\n Mobile Wallets (Paytm, Mobikwik, Freecharge)\n Cash on Service Completion\n\n **100% Secure Payments:**\n Bank-grade encryption (256-bit SSL)\n PCI-DSS compliant\n RBI approved payment gateway\n No card details stored\n Instant confirmation\n Digital invoice via email/SMS\n\n **Payment Terms:**\n Pay after service completion\n Transparent pricing (no hidden charges)\n Full refund if unsatisfied\n Easy cancellation policy\n Multiple payment retries\n Instant payment confirmation\n\n **Promo Codes:**\nUse codes: SAVE10, SAVE20, WELCOME for discounts!"
        actionButtons = [
          { text: ' Book Service', action: () => navigate('/service') },
          { text: ' Refund Policy', query: 'refund policy' }
        ]
        break
        
      case 'contact':
        response = " **Contact RepairWale Support**\n\n**24/7 Support Channels:**\n\n **Phone Support:**\n   Helpline: 1800-REPAIR-NOW\n   Available 24/7\n   Avg wait time: < 1 min\n\n **Email Support:**\n   support@repairwale.com\n   Response time: 2-4 hours\n\n **Live Chat:**\n   You're using it right now!\n   Instant AI responses\n   24/7 availability\n\n **Social Media:**\n   Twitter: @RepairWale\n   Facebook: /RepairWaleOfficial\n   Instagram: @repairwale.official\n\n **Office Address:**\n   RepairWale Technologies Pvt. Ltd.\n   [Business Address]\n\n **Emergency?**\n   Call immediately: 1800-REPAIR-NOW"
        actionButtons = [
          { text: ' Call Support', action: () => window.location.href = 'tel:1800-REPAIR-NOW' },
          { text: ' Email Us', action: () => window.location.href = 'mailto:support@repairwale.com' },
          { text: ' Emergency Help', query: 'emergency' }
        ]
        break
        
      case 'mechanic_info':
        response = " **Our Professional Mechanics**\n\n **Certification & Training:**\n ITI/Diploma certified technicians\n Brand-specific training completed\n 3+ years minimum experience\n Regular skill upgrades\n Advanced diagnostic training\n\n **Verification Process:**\n Background verification (police clearance)\n Document authentication\n Skills assessment test\n In-person interview\n Reference checks\n Insurance coverage\n\n **Quality Standards:**\n Customer rating: 4.7/5 avg\n Performance tracking\n Mystery shopper audits\n Customer feedback review\n Continuous monitoring\n\n **Safety & Insurance:**\n Fully insured technicians\n Liability coverage included\n Safety equipment provided\n COVID-19 safety protocols\n\n **What You Get:**\n Professional service\n Transparent pricing\n Quality workmanship\n Genuine parts\n Service warranty"
        actionButtons = [
          { text: ' Book Service', action: () => navigate('/service') },
          { text: ' Quality Guarantee', query: 'warranty' }
        ]
        break
        
      case 'cancellation':
        response = " **Cancellation & Refund Policy**\n\n**Cancellation Terms:**\n\n **Free Cancellation:**\n Within 2 minutes of booking\n No charges applied\n Instant refund\n\n **After Mechanic Dispatch:**\n 99 cancellation fee\n Refund processed in 7-10 days\n\n **No-Show Policy:**\n Full service charge applies\n Mechanic compensation included\n\n**Refund Process:**\n\n1 Go to 'My Orders'\n2 Select order to cancel\n3 Click 'Cancel Order'\n4 Choose cancellation reason\n5 Confirm cancellation\n6 Refund initiated automatically\n\n **Refund Timeline:**\n Cards/UPI: 5-7 business days\n Net Banking: 7-10 business days\n Wallets: 3-5 business days\n\n**Service Issues:**\n Full refund if service unsatisfactory\n Re-service at no extra cost\n Quality guarantee honored\n\n **Need Help?**\nContact support: 1800-REPAIR-NOW"
        actionButtons = [
          { text: ' My Orders', action: () => navigate('/orders') },
          { text: ' Contact Support', action: () => window.location.href = 'tel:1800-REPAIR-NOW' }
        ]
        break
        
      case 'warranty':
        response = "... **Service Guarantee & Warranty**\n\n **Service Warranty:**\n 30-day service warranty on all work\n Free re-service if issues arise\n Parts warranty as per OEM/manufacturer\n Labor warranty included\n No questions asked policy\n\n **Quality Promise:**\n\n **OEM/Genuine Parts:**\n Only authentic parts used\n Original equipment manufacturer warranty\n Quality certificates provided\n\n **Trained Technicians:**\n Certified professionals\n Brand-specific training\n Latest diagnostic tools\n Quality workmanship guarantee\n\n **Quality Inspection:**\n Pre-service inspection\n Post-service quality check\n Service checklist provided\n Customer approval required\n\n **Satisfaction Guarantee:**\n 100% money-back if not satisfied\n Free re-service within warranty\n Transparent complaint resolution\n Customer is always right policy\n\n **Warranty Claims:**\n1. Contact support within 30 days\n2. Provide service order number\n3. Describe the issue\n4. Get immediate re-service scheduled\n5. No additional charges"
        actionButtons = [
          { text: ' Book Service', action: () => navigate('/service') },
          { text: ' Warranty Claim', action: () => window.location.href = 'tel:1800-REPAIR-NOW' }
        ]
        break
        
      case 'coverage':
        response = " **Service Coverage Areas**\n\n **Currently Serving:**\n\n**Metro Cities:**\n Delhi NCR (All areas)\n Mumbai & Navi Mumbai\n Bangalore (Complete coverage)\n Hyderabad & Secunderabad\n Chennai & suburbs\n Kolkata metropolitan area\n Pune & Pimpri-Chinchwad\n Ahmedabad\n\n**Tier-2 Cities:**\n Jaipur, Indore, Bhopal\n Lucknow, Kanpur\n Nagpur, Nashik\n Coimbatore, Madurai\n And 50+ more cities!\n\n **Highway Coverage:**\n Major national highways\n Emergency service on expressways\n 24/7 towing support\n\n **Expanding Fast:**\n Adding 10+ new cities monthly\n Covering 500+ pincodes\n Pan-India coverage by 2027\n\n**Check Your Area:**\n1. Enter your pincode at checkout\n2. See available services\n3. View estimated arrival time\n4. Book instantly if available\n\n **Not in Service Area?**\nWe're expanding! Register your pincode for priority launch notification."
        actionButtons = [
          { text: ' Check Services', action: () => navigate('/service') },
          { text: ' Contact Support', query: 'contact' }
        ]
        break
        
      case 'specific_issue':
        // Detect specific vehicle issue
        if (msg.includes('flat') || msg.includes('tyre') || msg.includes('tire') || msg.includes('puncture')) {
          response = " **Flat Tyre / Puncture Service**\n\n**Available Services:**\n Flat Tyre Change: 399 (30 min arrival)\n Puncture Repair: 149 (30 min repair)\n Tyre Replacement: 1,299 + tyre cost\n Wheel Balancing: 599\n\n **Emergency?**\nCall: 1800-REPAIR-NOW for immediate dispatch!\n\n **What We Do:**\n1. Arrive with tools & equipment\n2. Assess tyre condition\n3. Change/repair as needed\n4. Test & ensure safety\n5. Provide safety checklist\n\n **Have a spare tyre?** Mention it while booking for faster service!"
        } else if (msg.includes('battery')) {
          response = " **Battery Service**\n\n**Available Services:**\n Jump-Start: 299 (20-30 min arrival)\n Battery Testing: Free with jump-start\n Battery Replacement: 499 + battery cost\n Electrical Diagnostics: 599\n\n **Dead Battery Emergency?**\nCall: 1800-REPAIR-NOW\n\n **Service Includes:**\n1. Portable battery booster\n2. Diagnostics & testing\n3. Jump-start service\n4. Battery health report\n5. Alternator check\n6. Recommendation for replacement if needed\n\n **Pro Tip:** Get battery tested every 6 months!"
        } else if (msg.includes('engine') || msg.includes('overheat')) {
          response = " **Engine Service**\n\n**Available Services:**\n Engine Tune-up: 1,799\n ECU Diagnostics: 599\n Cooling System: 1,499\n Engine Oil Change: Included in service\n Comprehensive Check: 2,299\n\n **Engine Breakdown?**\nCall: 1800-REPAIR-NOW for emergency help!\n\n **Important:**\n Don't drive with overheating\n Turn off AC if engine overheats\n Pull over safely\n Call for towing if needed\n\n **We Provide:**\n Complete diagnostics\n Transparent pricing\n Genuine parts\n Warranty on service"
        } else if (msg.includes('brake')) {
          response = " **Brake Service & Repair**\n\n**Available Services:**\n Brake Inspection: Free\n Brake Pad Replacement: 999 + parts\n Brake Fluid Change: 599\n Complete Brake Service: 1,499\n ABS Diagnostics: 799\n\n **Safety First!**\nWorn brakes are dangerous. Book inspection today!\n\n **Service Includes:**\n1. Complete brake inspection\n2. Pad/shoe replacement\n3. Rotor/drum inspection\n4. Brake fluid level check\n5. Test drive & certification\n\n **Warning Signs:**\n Squeaking/grinding sounds\n Soft brake pedal\n Vibration while braking\n Longer stopping distance\n\n Book Now for Safe Driving!"
        } else {
          response = " **Vehicle Issue Help**\n\nI can help with:\n Flat Tyre/Puncture\n Battery Issues\n Engine Problems\n Brake Service\n Oil Change\n AC Issues\n And more!\n\nDescribe your issue in detail, or choose from our services!"
        }
        actionButtons = [
          { text: ' Book Emergency', action: () => navigate('/service') },
          { text: ' Call Now', action: () => window.location.href = 'tel:1800-REPAIR-NOW' },
          { text: ' Check Pricing', query: 'pricing' }
        ]
        break
        
      case 'greeting':
        response = " **Welcome to RepairWale!**\n\nI'm your AI assistant, here to help with:\n\n **Service Pricing** - Get instant price info\n **Browse Services** - See what we offer\n **Booking Help** - Learn how to book\n **Emergency Support** - Get immediate help\n **Order Tracking** - Track your service\n **Payment Info** - Payment methods & security\n **Contact Support** - Reach our team\n **Mechanic Info** - Know our professionals\n\n**Quick Actions Below** \nOr just ask me in natural language!"
        actionButtons = [
          { text: ' View Pricing', query: 'pricing' },
          { text: ' Browse Services', action: () => navigate('/service') },
          { text: ' Emergency Help', query: 'emergency' }
        ]
        break
        
      case 'thanks':
        response = " **You're Very Welcome!**\n\nHappy to help! If you need anything else, I'm here 24/7.\n\n **Don't Forget To:**\n Browse our services\n Check latest offers\n Save favorite services\n Track your orders\n Rate your experience\n\n **Quick Tip:**\nBookmark RepairWale for quick access during emergencies!\n\nHave a safe drive! -"
        actionButtons = [
          { text: ' Browse Services', action: () => navigate('/service') },
          { text: ' Check Pricing', query: 'pricing' }
        ]
        break
        
      default:
        response = "- **I'm Your AI Assistant!**\n\nI can help you with:\n\n Service Pricing & Offers\n Available Services\n Booking Process\n Emergency Assistance\n Order Tracking\n Payment Options\n Contact Support\n Mechanic Information\n Cancellation & Refunds\n Quality Guarantee\n\n **Try asking:**\n \"What are your prices?\"\n \"I need emergency help!\"\n \"How do I book?\"\n \"I have a flat tyre\"\n \"Where is my mechanic?\"\n\n**Or choose from quick actions below!** "
        actionButtons = [
          { text: ' Pricing', query: 'pricing' },
          { text: ' Services', action: () => navigate('/service') },
          { text: ' Emergency', query: 'emergency' }
        ]
    }
    
    return { text: response, buttons: actionButtons }
  }

  const askBackendAI = async (message) => {
    const baseCandidates = [
      getAPIBase(),
      ...getAPICandidates()
    ].filter((value, idx, list) => value && list.indexOf(value) === idx)

    for (const base of baseCandidates) {
      try {
        const response = await fetch(`${base}/ai/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, topK: 4, role: activeRole })
        })

        if (!response.ok) continue
        const payload = await response.json()
        if (payload?.ok && payload?.answer) {
          return payload.answer
        }
      } catch {}
    }

    return null
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (messageText = null) => {
    const textToSend = messageText || input
    if (!textToSend.trim()) return
    
    const userMsg = { id: messages.length + 1, role: 'user', text: textToSend, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setShowSuggestions(false)
    setIsLoading(true)

    const backendAnswer = await askBackendAI(textToSend)
    const aiResponseData = getAIResponse(textToSend)
    if (backendAnswer) {
      aiResponseData.text = backendAnswer
    }

    const aiMsg = { 
      id: messages.length + 2, 
      role: 'ai', 
      text: aiResponseData.text, 
      buttons: aiResponseData.buttons,
      timestamp: new Date() 
    }
    setMessages(prev => [...prev, aiMsg])
    setIsLoading(false)
  }

  const handleSuggestionClick = (query, action = null) => {
    if (action) {
      action()
      return
    }
    setInput(query)
    handleSend(query)
  }

  const handleActionButton = (button) => {
    if (button.action) {
      button.action()
    } else if (button.query) {
      handleSend(button.query)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="ai-support-button"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: '#0B1F3B',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          boxShadow: '0 8px 24px rgba(29,78,216,0.4)',
          zIndex: 9999,
          outline: 'none',
          padding: 0,
          transition: 'all 0.3s ease'
        }}
        title="AI Support Chat"
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)'
          e.target.style.boxShadow = '0 12px 32px rgba(29,78,216,0.6)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)'
          e.target.style.boxShadow = '0 8px 24px rgba(29,78,216,0.4)'
        }}
      >
        <IconBot size={30} />
      </button>
    )
  }

  return (
    <div className="ai-support-modal" style={{
      position: 'fixed',
      bottom: '110px',
      right: '24px',
      width: '420px',
      height: '600px',
      background: 'linear-gradient(135deg, #0f172a 0%, #0B1F3B 100%)',
      borderRadius: '20px',
      border: '2px solid #0B1F3B',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(29,78,216,0.15)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 9999,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        background: 'linear-gradient(135deg, #0f172a 0%, #0B1F3B 100%)',
        borderBottom: '2px solid rgba(29,78,216,0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        boxShadow: '0 4px 16px rgba(29,99,255,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eef4ff' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255,255,255,0.3)'
          }}>
            <IconBot size={22} />
          </div>
          <div>
            <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '800', letterSpacing: '0.3px' }}>repairwale assistant</h3>
            <p style={{ margin: '0', fontSize: '12px', opacity: 0.95, fontWeight: '500' }}>here to help 24/7</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.3)'
            e.target.style.transform = 'rotate(90deg)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)'
            e.target.style.transform = 'rotate(0deg)'
          }}
        >
          ×
        </button>
      </div>
      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        backgroundColor: '#07111f'
      }}>
        {messages.map(msg => (
          <div key={msg.id} className="ai-message">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
              gap: '8px'
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '14px 18px',
                borderRadius: '16px',
                background: msg.role === 'user' 
                  ? '#0B1F3B' 
                  : 'linear-gradient(135deg, #0f172a 0%, #0B1F3B 100%)',
                border: `1px solid ${msg.role === 'user' ? 'rgba(29,78,216,0.5)' : '#0B1F3B'}`,
                color: '#FFFFFF',
                fontSize: '14px',
                lineHeight: '1.6',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                boxShadow: msg.role === 'user' 
                  ? '0 4px 16px rgba(29,78,216,0.3)' 
                  : '0 4px 16px rgba(0,0,0,0.2)',
                fontWeight: msg.role === 'user' ? '500' : '400'
              }}>
                {msg.text}
              </div>
              
              {/* Action Buttons */}
              {msg.buttons && msg.buttons.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  maxWidth: '85%',
                  marginTop: '4px'
                }}>
                  {msg.buttons.map((button, idx) => {
                    const ActionIcon = getActionIcon(button.text || button.query)
                    return (
                      <button
                        key={idx}
                        onClick={() => handleActionButton(button)}
                        style={{
                          padding: '8px 14px',
                          background: '#0B1F3B',
                          border: '1px solid rgba(29,78,216,0.5)',
                          borderRadius: '10px',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)'
                          e.target.style.boxShadow = '0 4px 16px rgba(29,78,216,0.4)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <ActionIcon size={14} />
                          <span style={{ textTransform: 'lowercase' }}>{button.text}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
              
              {/* Follow-up Suggestions */}
              {msg.role === 'ai' && followUpSuggestions.length > 0 && msg.id === messages[messages.length - 1].id && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  maxWidth: '85%',
                  marginTop: '6px'
                }}>
                  <span style={{
                    fontSize: '11px',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    textTransform: 'lowercase',
                    letterSpacing: '0.5px',
                    width: '100%',
                    marginBottom: '4px'
                  }}>
                    you might also want to:
                  </span>
                  {followUpSuggestions.map((suggestion, idx) => {
                    const SuggestionIcon = getActionIcon(suggestion.text || suggestion.query)
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion.query, suggestion.action)}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(15,23,42,0.8)',
                          border: '1px solid #0B1F3B',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          outline: 'none',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(29,78,216,0.15)'
                          e.target.style.borderColor = '#0B1F3B'
                          e.target.style.color = '#FFFFFF'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(15,23,42,0.8)'
                          e.target.style.borderColor = '#0B1F3B'
                          e.target.style.color = '#FFFFFF'
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <SuggestionIcon size={14} />
                          <span style={{ textTransform: 'lowercase' }}>{suggestion.text}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Quick Suggestions */}
        {showSuggestions && messages.length === 1 && (
          <div style={{ marginTop: '8px' }}>
            <p style={{ 
              fontSize: '12px', 
              color: '#FFFFFF', 
              marginBottom: '12px',
              fontWeight: '600',
              textTransform: 'lowercase',
              letterSpacing: '0.5px'
            }}>
              quick actions
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr',
              gap: '10px'
            }}>
              {quickSuggestions.map((suggestion, idx) => {
                const SuggestionIcon = suggestion.icon
                return (
                  <button
                    key={idx}
                    className="ai-suggestion"
                    onClick={() => handleSuggestionClick(suggestion.query)}
                    style={{
                      padding: '12px 14px',
                      background: '#0B1F3B',
                      border: '1px solid rgba(255,255,255,0.14)',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      outline: 'none',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ fontSize: '18px', display: 'inline-flex' }}><SuggestionIcon size={18} /></span>
                    <span style={{ textTransform: 'lowercase' }}>{suggestion.text}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
        
        {isLoading && (
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#FFFFFF', 
            fontSize: '13px',
            fontWeight: '600',
            padding: '8px 0'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#0B1F3B',
              animation: 'pulse 1.5s infinite'
            }} />
            assistant is thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '16px 20px',
        borderTop: '2px solid #0B1F3B',
        display: 'flex',
        gap: '10px',
        background: 'linear-gradient(135deg, #0f172a 0%, #0B1F3B 100%)',
        flexShrink: 0,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.2)'
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          placeholder="Ask me anything..."
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid #0B1F3B',
            background: 'rgba(15,23,42,0.8)',
            color: '#FFFFFF',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            fontWeight: '500'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#FFFFFF'
            e.target.style.boxShadow = '0 0 0 4px rgba(96,165,250,0.15)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#0B1F3B'
            e.target.style.boxShadow = 'none'
          }}
          disabled={isLoading}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          style={{
            padding: '12px 20px',
            background: (input.trim() && !isLoading) 
              ? '#0B1F3B' 
              : 'rgba(29,78,216,0.5)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            cursor: (input.trim() && !isLoading) ? 'pointer' : 'not-allowed',
            fontWeight: '700',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxShadow: (input.trim() && !isLoading) 
              ? '0 4px 16px rgba(29,99,255,0.3)' 
              : 'none',
            minWidth: '70px'
          }}
          onMouseEnter={(e) => { 
            if (input.trim() && !isLoading) {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 24px rgba(29,99,255,0.4)'
            }
          }}
          onMouseLeave={(e) => { 
            if (input.trim() && !isLoading) {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 16px rgba(29,99,255,0.3)'
            }
          }}
        >
          {isLoading ? '...' : <IconChat size={18} />}
        </button>
      </div>
    </div>
  )
}


