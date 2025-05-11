
import { Link } from 'react-router-dom';
import { Job } from '../../assets/tableaux/jobs';

interface CategoryProps {
  job: Job;
}

function Category({ job }: CategoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full hover-card">
      <div className="p-6 flex flex-col h-full">
        <h5 className="text-xl font-semibold mb-3 text-gray-800">{job.title}</h5>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">
          {job.servicesList.join(', ')}
        </p>
        <Link 
          to={`/professionnels/${job.id}`} 
          className="mt-auto text-primary font-medium hover:underline inline-flex items-center"
        >
          Voir les artisans
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Category;
