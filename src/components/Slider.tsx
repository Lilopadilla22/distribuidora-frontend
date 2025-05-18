import  { useState, useEffect } from 'react';
import '../styles/Slider.css'

export interface SliderItem {
  id: string | number;
  image: string;
  title: string;
  description: string;
  link?: string; 
}

interface SliderProps {
  items: SliderItem[];
  autoPlayInterval?: number; 
  showIndicators?: boolean; 
  showArrows?: boolean; 
}

const Slider = ({ 
  items, 
  autoPlayInterval = 5000, 
  showIndicators = true,
  showArrows = true 
}: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const goToNext = (): void => {
    if (isTransitioning || items.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    
   
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); 
  };

  const goToPrev = (): void => {
    if (isTransitioning || items.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index: number): void => {
    if (isTransitioning || index === currentIndex || items.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };


  useEffect(() => {
    if (items.length <= 1 || autoPlayInterval <= 0) return;
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNext();
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, isTransitioning, items.length]);

  if (!items || items.length === 0) {
    return null;
  }

  if (items.length === 1) {
    const item = items[0];
    return (
      <div className="slider-container">
        <div className="slide active">
          <img src={item.image} alt={item.title} className="slide-image" />
          <div className="slide-text-container">
            <h2 className="slide-title">{item.title}</h2>
            <p className="slide-description">{item.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="slider-container">
      <div className="slider-content">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ transform: `translateX(${100 * (index - currentIndex)}%)` }}
          >
            {item.link ? (
              <a href={item.link} className="slide-link">
                <img src={item.image} alt={item.title} className="slide-image" />
                <div className="slide-text-container">
                  <h2 className="slide-title">{item.title}</h2>
                  <p className="slide-description">{item.description}</p>
                </div>
              </a>
            ) : (
              <>
                <img src={item.image} alt={item.title} className="slide-image" />
                <div className="slide-text-container">
                  <h2 className="slide-title">{item.title}</h2>
                  <p className="slide-description">{item.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {showArrows && items.length > 1 && (
        <>
          <button 
            type="button"
            className="slider-btn prev-btn" 
            onClick={goToPrev}
            aria-label="Anterior"
            disabled={isTransitioning}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            type="button"
            className="slider-btn next-btn" 
            onClick={goToNext}
            aria-label="Siguiente"
            disabled={isTransitioning}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </>
      )}

      {showIndicators && items.length > 1 && (
        <div className="slider-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a diapositiva ${index + 1}`}
              disabled={isTransitioning}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slider;