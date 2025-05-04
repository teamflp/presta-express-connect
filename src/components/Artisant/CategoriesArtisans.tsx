
import { useState } from 'react';
import { CaretLeft, CaretRight } from 'lucide-react';
import Category from './Category';
import { jobs, Job } from '../../assets/tableaux/jobs';

function CategoriesArtisans() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const jobsPerSlide = 4;
  const jobList = jobs as Job[];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, jobList.length - jobsPerSlide) : Math.max(0, prevIndex - jobsPerSlide)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + jobsPerSlide >= jobList.length ? 0 : prevIndex + jobsPerSlide
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-baseline mb-4">
        <h2 className="title2 mt-0">Catégories d'artisans</h2>
        <div className="d-flex">
          <button className="carousel-button me-2" onClick={handlePrevious}>
            <CaretLeft className="icon" />
          </button>
          <button className="carousel-button" onClick={handleNext}>
            <CaretRight className="icon" />
          </button>
        </div>
      </div>
      <div className="row">
        {jobList.slice(currentIndex, currentIndex + jobsPerSlide).map((job) => (
          <div key={job.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <Category job={job} />
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoriesArtisans;
