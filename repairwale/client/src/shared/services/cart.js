// Simple cart service persisted in localStorage
const CART_KEY = 'rw_cart'

export function getCart(){
  try{ const v = localStorage.getItem(CART_KEY); return v? JSON.parse(v): {items:[], currency:'INR'} }catch{ return {items:[], currency:'INR'} }
}

export function saveCart(cart){
  try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)) }catch{}
}

export function addItem(item){
  const cart = getCart()
  const idx = cart.items.findIndex(i => i.id === item.id)
  if(idx>=0){ cart.items[idx].qty += item.qty || 1 }
  else { cart.items.push({...item, qty: item.qty || 1}) }
  saveCart(cart)
  return cart
}

export function removeItem(id){
  const cart = getCart()
  cart.items = cart.items.filter(i => i.id !== id)
  saveCart(cart)
  return cart
}

export function updateQty(id, qty){
  const cart = getCart()
  const it = cart.items.find(i => i.id === id)
  if(it){ it.qty = Math.max(1, qty) }
  saveCart(cart)
  return cart
}

export function clearCart(){
  const cart = {items:[], currency:'INR'}
  saveCart(cart)
  return cart
}

export function total(){
  const cart = getCart()
  const sum = cart.items.reduce((acc, i)=> acc + (i.price || 0) * (i.qty || 1), 0)
  return { amount: sum, currency: cart.currency }
}


