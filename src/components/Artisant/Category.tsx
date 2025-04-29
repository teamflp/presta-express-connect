
import React, { useEffect, useRef, useState } from 'react';
import { Job } from '../../assets/tableaux/jobs';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CategoryProps {
  title: string;
  jobs: Job[];
}

const Category: React.FC<CategoryProps> = ({ title, jobs }) => {
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

  // Diviser les jobs en groupes de 3
  const jobGroups = [];
  for (let i = 0; i < jobs.length; i += 3) {
    jobGroups.push(jobs.slice(i, i + 3));
  }

  return (
    <div className="category my-5">
      <h3 className="mb-4 fw-bold">{title}</h3>
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
          {jobGroups.map((group, index) => (
            <div className="carousel-group" key={index}>
              {group.map((job) => (
                <div className="card mx-2 mb-3 job-card border-0" key={job.id}>
                  <img
                    className="img-fluid job-image"
                    src={job.image}
                    alt={job.name}
                  />
                  <div className="card-body">
                    <a
                      href="#"
                      className="card-link"
                    >
                      {job.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {jobGroups.map((group, index) => (
            <div className="carousel-group" key={`clone-${index}`}>
              {group.map((job) => (
                <div className="card mx-2 mb-3 job-card border-0" key={`${job.id}-clone`}>
                  <img
                    className="img-fluid job-image"
                    src={job.image}
                    alt={job.name}
                  />
                  <div className="card-body">
                    <a
                      href="#"
                      className="card-link"
                    >
                      {job.name}
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

export default Category;
