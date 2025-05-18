import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from '../../components/header';
import ProductCard from '../../components/ProductCard';
import type { Category, Product } from '../../types/products/products';
import { fetchRecommendedProducts } from '../../api/products/fetchRecommendedProducts';
import Slider from '../../components/Slider';
import banners from '../../mocks/banners';
import PromoCard from '../../components/PromoCard';
import promotions from '../../mocks/promotions';
import { fetchCategories } from '../../api/categories/fetchCategories';
import categoryPolloImage from '../../assets/categoryPollo.png';


const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecommendedProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchRecommendedProducts();
        setFeaturedProducts(products);
        setError(null);
      } catch (err) {
        console.error('Error cargando productos recomendados:', err);
        setError('No se pudieron cargar los productos recomendados. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const categoriesData = await fetchCategories();
        const activeCategories = categoriesData.filter(category => category.activa);
        setCategories(activeCategories);
        setCategoriesError(null);
      } catch (err) {
        console.error('Error cargando categorías:', err);
        setCategoriesError('No se pudieron cargar las categorías. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoadingCategories(false);
      }
    };

    loadRecommendedProducts();
    loadCategories();
  }, []);

  return (
    <div className="home-container">
      <Header />

      <section className="main-banner">
        <Slider items={banners} />
      </section>

      <div className="content-wrapper">
        <section className="categories-section">
          <h2 className="section-title">Nuestras Categorías</h2>
          
          {loadingCategories && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando categorías...</p>
            </div>
          )}
          
          {categoriesError && (
            <div className="error-container">
              <i className="fas fa-exclamation-circle"></i>
              <p>{categoriesError}</p>
              <button
                type="button"
                className="retry-btn"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </div>
          )}
          
          {!loadingCategories && !categoriesError && categories.length === 0 && (
            <div className="empty-container">
              <p>No hay categorías disponibles en este momento.</p>
            </div>
          )}
          
          {!loadingCategories && !categoriesError && categories.length > 0 && (
            <div className="categories-slider">
              {categories.map((category) => (
                <Link 
                  //to={`/categoria/${category.slug}`} 
                  to={''}
                  key={category._id} 
                  className="category-card"
                >
                  <div className="category-image-container">
                    <img 
                      //src={`/images/category-${category.slug}.png`} 
                      alt={category.nombre}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = categoryPolloImage
                      }}
                    />
                  </div>
                  <h3>{category.nombre}</h3>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="featured-products">
          <h2 className="section-title">Productos Recomendados</h2>

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando productos recomendados...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <i className="fas fa-exclamation-circle"></i>
              <p>{error}</p>
              <button
                type="button"
                className="retry-btn"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && featuredProducts.length === 0 && (
            <div className="empty-container">
              <p>No hay productos recomendados disponibles en este momento.</p>
            </div>
          )}

          {!loading && !error && featuredProducts.length > 0 && (
            <>
              <div className="products-grid">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="view-more-container">
                <Link to="/productos" className="view-more-btn">Ver todos los productos</Link>
              </div>
            </>
          )}
        </section>

        <section className="promotions-section">
          <h2 className="section-title">Promociones Especiales</h2>
          
          <div className="promotions-slider">
            {promotions.map((promo) => (
              <PromoCard key={promo.id} promo={promo} />
            ))}
          </div>
          
          <Link to="/promociones" className="promo-mobile-button">
            <i className="fas fa-gift"></i>
            <span>Ven disfruta de tus promociones</span>
            <i className="fas fa-chevron-right"></i>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Home;
