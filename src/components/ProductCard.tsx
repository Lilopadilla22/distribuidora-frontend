import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css'
import type { Product } from '../types/products/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = (): void => {
    alert(`Producto ${product.nombre} agregado al carrito. Cantidad: ${quantity}`);
  }

  const incrementQuantity = (): void => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const price = product.unidad === 'kilo' ? product.precio_por_kilo : product.precio_por_unidad;
  
  const placeholderImage = `/images/placeholder-${product.categoria.nombre.toLowerCase()}.png`;

  return (
    <div className={`product-card ${!product.disponible ? 'product-unavailable' : ''}`}>
      {!product.disponible && <div className="unavailable-badge">No Disponible</div>}
      
      <Link to={`/producto/${product._id}`} className="product-image-container">
        <img src={placeholderImage} alt={product.nombre} className="product-image" />
      </Link>
      
      <div className="product-details">
        <Link to={`/producto/${product._id}`} className="product-name">{product.nombre}</Link>
        <p className="product-category">{product.categoria.nombre.toUpperCase()}</p>
        <p className="product-description">{product.descripcion}</p>
        
        <div className="product-price-container">
          <span className="product-price">${price.toLocaleString()}</span>
          <span className="product-unit">/ {product.unidad}</span>
        </div>
        
        {product.disponible && (
          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                type="button"
                className="quantity-btn" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className="quantity-value" aria-live="polite">{quantity}</span>
              <button 
                type="button"
                className="quantity-btn" 
                onClick={incrementQuantity}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            
            <button 
              type="button"
              className="add-to-cart-btn" 
              onClick={handleAddToCart}
            >
              <i className="fas fa-shopping-cart"></i>{' '}
              Agregar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
