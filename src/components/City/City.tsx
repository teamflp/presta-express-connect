
import React, { useEffect, useRef, useState } from 'react';
import cities from '../../assets/tableaux/cityData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CityProps {
  ville?: string;
  backgroundImage?: string;
}

const City: React.FC<CityProps> = () => {
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour faire défiler automatiquement
  const startAutoScroll = () => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    
    autoScrollRef.current = setInterval(() => {
      if (autoScrollActive) {
        setCurrentPosition(prev => {
          const carouselContent = carouselContentRef.current;
          if (!carouselContent) return prev;
          
          const newPosition = prev + 1;
          if (newPosition >= carouselContent.scrollWidth / 2) {
            return 0;
          }
          return newPosition;
        });
      }
    }, 30);
  };

  // Appliquer la position de défilement
  useEffect(() => {
    const carouselContent = carouselContentRef.current;
    if (carouselContent) {
      carouselContent.style.transform = `translateX(-${currentPosition}px)`;
    }
  }, [currentPosition]);

  // Démarrer le défilement automatique au chargement
  useEffect(() => {
    startAutoScroll();
    
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [autoScrollActive]);

  // Fonction pour accélérer le défilement
  const handleScroll = (direction: 'next' | 'prev') => {
    setAutoScrollActive(false);
    
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    
    scrollIntervalRef.current = setInterval(() => {
      setCurrentPosition(prev => {
        const step = 10;
        if (direction === 'next') {
          return prev + step;
        } else {
          return Math.max(0, prev - step);
        }
      });
    }, 10);
  };

  // Arrêter l'accélération et reprendre le défilement automatique
  const handleScrollStop = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
    
    setTimeout(() => {
      setAutoScrollActive(true);
    }, 1000);
  };

  // Diviser les villes en groupes de 3
  const cityGroups = [];
  for (let i = 0; i < cities.length; i += 3) {
    cityGroups.push(cities.slice(i, i + 3));
  }

  return (
    <div className="city container my-5">
      <h3 className="mb-4 fw-bold">Explorez nos destinations</h3>
      <div className="carousel-wrapper">
        <button
          className="carousel-button prev"
          onMouseDown={() => handleScroll('prev')}
          onMouseUp={handleScrollStop}
          onMouseLeave={handleScrollStop}
          aria-label="Défiler vers la gauche"
        >
          <FiChevronLeft className="icon" />
        </button>
        <div className="carousel-content" ref={carouselContentRef}>
          {cityGroups.map((group, index) => (
            <div className="carousel-group" key={index}>
              {group.map((city) => (
                <div
                  className="card mb-3 border-0 mx-2 cardCarousel job-card"
                  key={city.id}
                  style={{ 
                    backgroundImage: `url(${city.backgroundImage})`,
                    height: '200px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    borderRadius: '20px 0px 20px 20px',
                   }}
                >
                  <div className="card-body d-flex justify-content-start align-items-end">
                    <a href="#" className="card-link-city">
                      {city.ville}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {cityGroups.map((group, index) => (
            <div className="carousel-group" key={`clone-${index}`}>
              {group.map((city) => (
                <div
                  className="card mx-2 mb-3 border-0 cardCarousel job-card"
                  key={`${city.id}-clone`}
                  style={{ 
                    backgroundImage: `url(${city.backgroundImage})`,
                    height: '200px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    borderRadius: '20px 0px 20px 20px'
                   }}
                >
                  <div className="card-body d-flex justify-content-start align-items-end">
                    <a href="#" className="card-link-city">
                      {city.ville}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          className="carousel-button next"
          onMouseDown={() => handleScroll('next')}
          onMouseUp={handleScrollStop}
          onMouseLeave={handleScrollStop}
          aria-label="Défiler vers la droite"
        >
          <FiChevronRight className="icon" />
        </button>
      </div>
    </div>
  );
};

export default City;
