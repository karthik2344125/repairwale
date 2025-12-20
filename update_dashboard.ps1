# Read the file
$file = "C:\Users\Lenovo\Desktop\CAPSTONE\repairwale\client\src\pages\CustomerDashboard.jsx"
$content = Get-Content $file -Raw

# Update header member info
$content = $content -replace 'Premium Customer • ID: #\{user\?\.email\?\.slice\(0, 8\) \|\| ''XXXXXXXX''\}', 'Premium Customer • Member since {new Date().toLocaleDateString(''en-US'', { month: ''short'', year: ''numeric'' })}'

# Update AI chatbot intelligence
$oldAI = @'
  const handleSendMessage = \(\) => \{
    if \(!chatInput\.trim\(\)\) return
    
    const userMessage = \{ id: Date\.now\(\), sender: 'user', text: chatInput, time: new Date\(\)\.toLocaleTimeString\(\) \}
    setChatMessages\(\[\.\.\.chatMessages, userMessage\]\)
    setChatInput\(''\)

    setTimeout\(\(\) => \{
      const botResponses = \[
        'I can help you find the nearest mechanic\. Would you like me to search for one\?',
        'Based on your vehicle\\''s service history, I recommend scheduling an oil change soon\.',
        'I found 3 highly-rated mechanics near you\. Check the map for their locations!',
        'Your last service was 2 months ago\. Would you like to book a maintenance checkup\?',
        'I can help you with emergency roadside assistance\. Should I contact a mechanic\?'
      \]
      const botMessage = \{ 
        id: Date\.now\(\) \+ 1, 
        sender: 'bot', 
        text: botResponses\[Math\.floor\(Math\.random\(\) \* botResponses\.length\)\],
        time: new Date\(\)\.toLocaleTimeString\(\)
      \}
      setChatMessages\(prev => \[\.\.\.prev, botMessage\]\)
    \}, 1000\)
  \}
'@

$newAI = @'
  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    
    const userMessage = { id: Date.now(), sender: 'user', text: chatInput, time: new Date().toLocaleTimeString() }
    setChatMessages([...chatMessages, userMessage])
    const userQuery = chatInput.toLowerCase()
    setChatInput('')

    setTimeout(() => {
      let botResponse = ''
      
      if (userQuery.includes('mechanic') || userQuery.includes('find') || userQuery.includes('near')) {
        botResponse = `I found 3 highly-rated mechanics near you:\n\n🔧 Raj Sharma (4.9★) - 2.3 km away\n⚡ Priya Singh (4.8★) - 3.1 km away\n🛠️ Amit Patel (4.7★) - 5.2 km away\n\nWould you like to request service from any of them?`
      } else if (userQuery.includes('emergency') || userQuery.includes('sos') || userQuery.includes('urgent')) {
        botResponse = '🚨 For emergency assistance, click the red "EMERGENCY SOS" button in the header. It will immediately alert the nearest mechanics and roadside assistance team.'
      } else if (userQuery.includes('service') || userQuery.includes('repair') || userQuery.includes('maintenance')) {
        botResponse = `Based on your ${vehicles[0]?.name || 'vehicle'}, I recommend:\n\n✅ Oil Change - Due in 500 km\n⚠️ Tire Rotation - Overdue\n✓ Battery Check - Good condition\n\nWould you like to schedule a service?`
      } else if (userQuery.includes('price') || userQuery.includes('cost') || userQuery.includes('charge')) {
        botResponse = '💰 Our pricing:\n\n• Oil Change: ₹500-800\n• Tire Repair: ₹300-600\n• Battery Check: ₹200-400\n• Full Service: ₹2000-3500\n\nPrices may vary based on vehicle type.'
      } else if (userQuery.includes('vehicle') || userQuery.includes('car') || userQuery.includes('bike')) {
        botResponse = `You have ${vehicles.length} vehicle${vehicles.length > 1 ? 's' : ''} registered:\n\n${vehicles.map((v, i) => `${i + 1}. ${v.name} (${v.plate}) - ${v.year}`).join('\n')}\n\nWould you like to add or manage vehicles?`
      } else if (userQuery.includes('hello') || userQuery.includes('hi') || userQuery.includes('hey')) {
        botResponse = `Hello ${user?.name || 'there'}! 👋 I'm your RepairWale AI assistant. I can help you find mechanics, schedule services, check history, and more. What can I do for you?`
      } else {
        botResponse = `I understand you're asking about "${chatInput}". I can help you with finding mechanics, booking services, checking vehicle history, or emergency assistance. Could you be more specific?`
      }
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString()
      }
      setChatMessages(prev => [...prev, botMessage])
    }, 800)
  }
'@

$content = $content -replace [regex]::Escape($oldAI), $newAI

# Save the file
$content | Set-Content $file -NoNewline

Write-Host "Dashboard updated successfully!" -ForegroundColor Green
