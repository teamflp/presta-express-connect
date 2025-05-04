
import { Link } from 'react-router-dom';
import { Job } from '../../assets/tableaux/jobs';

interface CategoryProps {
  job: Job;
}

function Category({ job }: CategoryProps) {
  return (
    <div className="card hover-card">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{job.title}</h5>
        <p className="card-text text-muted">
          {job.servicesList.join(', ')}
        </p>
        <Link to={`/professionnels/${job.id}`} className="card-link mt-auto">
          Voir les artisans
        </Link>
      </div>
    </div>
  );
}

export default Category;
