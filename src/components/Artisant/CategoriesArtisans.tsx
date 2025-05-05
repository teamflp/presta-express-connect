
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Catégories d'artisans</h2>
        <div className="flex space-x-2">
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
            onClick={handlePrevious}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-colors"
            onClick={handleNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobList.slice(currentIndex, currentIndex + jobsPerSlide).map((job) => (
          <div key={job.id}>
            <Category job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesArtisans;
