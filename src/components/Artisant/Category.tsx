
import { Link } from 'react-router-dom';
import { Job } from '../../assets/tableaux/jobs';
import { ChevronRight } from 'lucide-react';

interface CategoryProps {
  job: Job;
}

function Category({ job }: CategoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <h5 className="text-xl font-semibold mb-2">{job.title}</h5>
        <p className="text-gray-600 mb-4">
          {job.servicesList.join(', ')}
        </p>
        <Link 
          to={`/professionnels/${job.id}`} 
          className="text-primary font-medium hover:underline inline-flex items-center"
        >
          Voir les artisans
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}

export default Category;
