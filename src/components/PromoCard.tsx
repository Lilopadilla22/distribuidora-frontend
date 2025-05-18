import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PromoCard.css';

export interface Promo {
  id: string | number;
  title: string;
  description: string;
  image: string;
  backgroundColor?: string;
  textColor?: string;
  buttonText?: string;
  link?: string;
  expiryDate?: string;
}

interface PromoCardProps {
  promo: Promo;
  className?: string;
  mobileView?: boolean; 
  mobileButtonText?: string; 
  mobileButtonLink?: string; 
}

const PromoCard = ({ 
  promo, 
  className = '',
  mobileView = true,
  mobileButtonText = "Ven disfruta de tus promociones",
  mobileButtonLink = "/promociones"
}: PromoCardProps) => {
  const { 
    title, 
    description, 
    image, 
    backgroundColor = '#FF5733', 
    textColor = 'white',
    buttonText = 'Ver Promoción',
    link = '#',
    expiryDate
  } = promo;

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const cardStyle = {
    backgroundColor,
    color: textColor,
  };

  const buttonStyle = {
    backgroundColor: textColor,
    color: backgroundColor,
  };

  if (isMobile && mobileView) {
    return (
      <div className="promo-mobile-container">
        <Link to={mobileButtonLink} className="promo-mobile-button">
          <i className="fas fa-gift"></i>
          <span>{mobileButtonText}</span>
          <i className="fas fa-chevron-right"></i>
        </Link>
      </div>
    );
  }

  const renderContent = () => (
    <>
      <div className="promo-image-container">
        <img src={image} alt={title} className="promo-image" />
      </div>
      <div className="promo-content">
        <h3 className="promo-title">{title}</h3>
        <p className="promo-description">{description}</p>
        {expiryDate && (
          <p className="promo-expiry">
            <i className="fas fa-clock"></i>{' '}
            Válida hasta: {new Date(expiryDate).toLocaleDateString()}
          </p>
        )}
        <button 
          type="button"
          className="promo-btn" 
          style={buttonStyle}
        >
          {buttonText}
        </button>
      </div>
    </>
  );

  return (
    <div className={`promo-card ${className}`} style={cardStyle}>
      {link && link !== '#' ? (
        <Link to={link} className="promo-card-link">
          {renderContent()}
        </Link>
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default PromoCard;