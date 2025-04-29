import React, { useEffect, useRef, useState } from 'react';
import { Job } from '../../assets/tableaux/jobs';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CategoryProps {
  title: string;
  jobs: Job[];
}

const Category: React.FC<CategoryProps> = ({ title, jobs }) => {
  const carouselContentRef = useRef<HTMLDivElement>(null);
  const scrollIntervalId = useRef<NodeJS.Timeout | null>(null);
  const autoScrollTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const autoScrollIntervalId = useRef<NodeJS.Timeout | null>(null);

  const resumeAutoScroll = () => {
    if (autoScrollTimeoutId.current) {
      clearTimeout(autoScrollTimeoutId.current);
    }
    autoScrollTimeoutId.current = setTimeout(() => {
      if (autoScrollIntervalId.current) {
        clearInterval(autoScrollIntervalId.current);
      }
      autoScrollIntervalId.current = setInterval(() => {
        const carouselContent = carouselContentRef.current;
        if (carouselContent) {
          let currentScrollAmount = parseInt(carouselContent.style.transform.replace('translateX(-', '').replace('px)', ''), 10) || 0;
          currentScrollAmount += 1; // Step de 1
          if (currentScrollAmount >= carouselContent.scrollWidth / 2) {
            currentScrollAmount = 0;
          }
          carouselContent.style.transform = `translateX(-${currentScrollAmount}px)`;
        }
      }, 25); // Vitesse de 25ms
    }, 1000); // Reprendre le défilement automatique après 1 seconde
  };

  const accelerateScroll = (direction: 'next' | 'prev') => {
    const carouselContent = carouselContentRef.current;
    if (carouselContent) {
      const speed = 1;
      const step = 20; // Augmenter cette valeur pour accélérer davantage
      let currentScrollAmount = parseInt(carouselContent.style.transform.replace('translateX(-', '').replace('px)', ''), 10) || 0;
      if (direction === 'next') {
        currentScrollAmount += step;
      } else {
        currentScrollAmount -= step;
      }
      carouselContent.style.transform = `translateX(-${currentScrollAmount}px)`;
    }
  };

  const handleMouseDown = (direction: 'next' | 'prev') => {
    scrollIntervalId.current = setInterval(() => {
      accelerateScroll(direction);
    }, 100); // Ajustez l'intervalle selon vos besoins
  };

  const handleMouseUp = () => {
    if (scrollIntervalId.current) {
      clearInterval(scrollIntervalId.current);
      scrollIntervalId.current = null;
    }
  };

  useEffect(() => {
    resumeAutoScroll();
    return () => {
      if (autoScrollTimeoutId.current) {
        clearTimeout(autoScrollTimeoutId.current);
      }
      if (autoScrollIntervalId.current) {
        clearInterval(autoScrollIntervalId.current);
      }
    };
  }, [carouselContentRef]);



  // Inverser l'ordre des jobs
  const reversedJobs = [...jobs].reverse();

  // Diviser les jobs en groupes de 3
  const jobGroups = [];
  for (let i = 0; i < reversedJobs.length; i += 3) {
    jobGroups.push(reversedJobs.slice(i, i + 3));
  }

  return (
    <div className="category my-5">
      <h3>{title}</h3>
      <div className="carousel-wrapper">
      <button
        className="carousel-button next"
        onMouseDown={() => handleMouseDown('next')}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Pour arrêter le défilement si la souris quitte le bouton
      >
        <FiChevronRight className="icon" />
      </button>
        <div className="carousel-content" ref={carouselContentRef}>
          {jobGroups.map((group, index) => (
            <div className="carousel-group" key={index}>
              {group.map((job) => (
                <div className="card mx-2 mb-2 job-card border-0" key={job.id}>
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
                <div className="card mx-2 mb-2 job-card border-0" key={`${job.id}-clone`}>
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
        className="carousel-button prev"
        onMouseDown={() => handleMouseDown('prev')}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Pour arrêter le défilement si la souris quitte le bouton
      >
        <FiChevronLeft className="icon"  style={{ fontSize: '15px', verticalAlign: 'middle' }} />
      </button>
      </div>
    </div>
  );
};

export default Category;