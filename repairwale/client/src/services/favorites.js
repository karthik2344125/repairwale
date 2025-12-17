export const FAVORITES_KEY = 'rw_favorites'

function read() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function write(list) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list))
    window.dispatchEvent(new Event('favoritesUpdated'))
  } catch {}
}

export function getFavorites() {
  return read()
}

export function isFavorite(id) {
  return read().some(f => f.id === id)
}

export function addFavorite(item) {
  const list = read()
  if (!list.some(f => f.id === item.id)) {
    list.push({ id: item.id, title: item.title, price: item.price, category: item.category || null, image: item.image || null })
    write(list)
  }
  return list
}

export function removeFavorite(id) {
  const list = read().filter(f => f.id !== id)
  write(list)
  return list
}

export function toggleFavorite(item) {
  return isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item)
}
