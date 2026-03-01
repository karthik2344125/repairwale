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

      <style>{`
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
      `}</style>
    </div>
  )
}

