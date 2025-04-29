import React, { useEffect, useRef, useState } from 'react';
import cities from '../../assets/tableaux/cityData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CityProps {
  ville: string;
  backgroundImage: string;
}

const City: React.FC<CityProps> = ({ ville, backgroundImage }) => {
  const carouselContentRef = useRef<HTMLDivElement>(null);
  let autoScrollIntervalId: NodeJS.Timeout | null = null;
  let autoScrollTimeoutId: NodeJS.Timeout | null = null;
  const [scrollInterval, setScrollInterval] = useState(25);
  const [scrollStep, setScrollStep] = useState(1);

  useEffect(() => {
    const carouselContent = carouselContentRef.current;
    let scrollAmount = 0;

    function autoScroll() {
      if (carouselContent) {
        scrollAmount += scrollStep;
        if (scrollAmount >= carouselContent.scrollWidth / 2) {
          scrollAmount = 0;
        }
        carouselContent.style.transform = `translateX(-${scrollAmount}px)`;
      }
    }

    autoScrollIntervalId = setInterval(autoScroll, scrollInterval);

    return () => {
      if (autoScrollIntervalId) {
        clearInterval(autoScrollIntervalId);
      }
    };
  }, [scrollInterval, scrollStep]);

  const stopAutoScroll = () => {
    if (autoScrollIntervalId) {
      clearInterval(autoScrollIntervalId);
      autoScrollIntervalId = null;
    }
    if (autoScrollTimeoutId) {
      clearTimeout(autoScrollTimeoutId);
      autoScrollTimeoutId = null;
    }
  };

  const resumeAutoScroll = () => {
    stopAutoScroll();
    setScrollInterval(25); // Ajustez l'intervalle de défilement
    autoScrollTimeoutId = setTimeout(() => {
      autoScrollIntervalId = setInterval(() => {
        const carouselContent = carouselContentRef.current;
        if (carouselContent) {
          let scrollAmount = parseInt(carouselContent.style.transform.replace('translateX(-', '').replace('px)', ''), 10) || 0;
          setScrollStep(1);
          if (scrollAmount >= carouselContent.scrollWidth / 2) {
            scrollAmount = 0;
          }
          carouselContent.style.transform = `translateX(-${scrollAmount}px)`;
        }
      }, scrollInterval);
    }, 3000); // Reprendre le défilement automatique après 3 secondes
  };

  const handlePrevious = () => {
    setScrollInterval(5);
    setScrollStep(5);
    resumeAutoScroll();
  };

  const handleNext = () => {
    setScrollInterval(5);
    setScrollStep(-5);
    resumeAutoScroll();
  };

  // Inverser l'ordre des jobs
  const reversedCities = [...cities].reverse();

  // Diviser les jobs en groupes de 3
  const cityGroups = [];
  for (let i = 0; i < reversedCities.length; i += 3) {
    cityGroups.push(reversedCities.slice(i, i + 3));
  }

      
  // Style pour le fond du titre
 /*  const backgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond noir avec opacité de 50%
        height: '100%', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px 0px 20px 20px',
    }; */

  return (
    <div className="city container my-5">
      <div className="carousel-wrapper">
        <button className="carousel-button prev" onClick={handlePrevious}>
          <FiChevronRight className="icon" />
        </button>
        <div className="carousel-content" ref={carouselContentRef}>
          {cityGroups.map((group, index) => (
            <div className="carousel-group" key={index}>
              {group.map((city) => (
                <div
                  className="card mb-1 border-0 mx-2 cardCarousel job-card"
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
                  className="card mx-2 mb-1 border- cardCarousel job-card"
                  key={`${city.id}-clone`}
                  style={{ 
                    backgroundImage: `url(${city.backgroundImage})`,
                    height: '100%',
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
        <button className="carousel-button next" onClick={handleNext}>
          <FiChevronLeft className="icon" style={{ fontSize: '15px', verticalAlign: 'middle' }} />
        </button>
      </div>
    </div>
  );
};

export default City;


