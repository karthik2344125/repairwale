import React, { useEffect, useState } from 'react'
import Button from '../../shared/components/Button'
import { getFavorites, removeFavorite } from '../../shared/services/favorites'
import { showSuccess } from '../../shared/services/toast'
import { getCart as loadCart, saveCart } from '../../shared/services/cart'

export default function Favorites(){
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    setFavorites(getFavorites())
    const onUpdate = () => setFavorites(getFavorites())
    window.addEventListener('favoritesUpdated', onUpdate)
    window.addEventListener('storage', onUpdate)
    return () => {
      window.removeEventListener('favoritesUpdated', onUpdate)
      window.removeEventListener('storage', onUpdate)
    }
  }, [])

  const addToCart = (fav) => {
    try {
      const cart = loadCart()
      const exists = cart.find(i => i.id === fav.id)
      if (exists) {
        exists.qty += 1
      } else {
        cart.push({ id: fav.id, title: fav.title, price: fav.price, qty: 1 })
      }
      saveCart(cart)
      window.dispatchEvent(new Event('cartUpdated'))
      showSuccess(`Added ${fav.title} to cart`)
    } catch {}
  }

  const remove = (id) => {
    removeFavorite(id)
    setFavorites(getFavorites())
    showSuccess('Removed from favorites')
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">♥ Favorites</h1>
        <p className="page-subtitle">Your saved services • {favorites.length} items</p>
      </div>

      <div className="card">
        {favorites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">♥</div>
            <p className="empty-text">No favorites yet. Tap ♥ on any service to save it here.</p>
          </div>
        ) : (
          <div className="item-list">
            {favorites.map(fav => (
              <div key={fav.id} className="item">
                <div className="item-row">
                  {fav.image ? (
                    <img className="item-thumb" src={fav.image} alt={fav.title} />
                  ) : (
                    <div className="item-thumb" style={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:32}}>★</div>
                  )}
                  <div className="item-content">
                    <h4 className="item-title">{fav.title}</h4>
                    <p className="item-desc">Saved from your browsing</p>
                    <div className="item-meta">
                      <span className="item-chip">Quick reorder</span>
                      {fav.category && <span className="item-chip">{fav.category}</span>}
                    </div>
                  </div>
                  <div className="item-actions">
                    <div className="item-price">₹{fav.price}</div>
                    <Button size="sm" variant="primary" onClick={() => addToCart(fav)}>Add to Cart</Button>
                    <button className="btn btn-sm btn-danger" onClick={() => remove(fav.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

