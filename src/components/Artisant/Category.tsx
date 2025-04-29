
import React from 'react';
import { Job } from '../../assets/tableaux/jobs';

interface CategoryProps {
  title: string;
  jobs: Job[];
}

const Category: React.FC<CategoryProps> = ({ title, jobs }) => {
  return (
    <div className="category-detail">
      <h3 className="mb-4 fw-bold">{title}</h3>
      <div className="jobs-grid">
        {jobs.map((job) => (
          <div className="job-item" key={job.id}>
            <div className="card job-card border-0">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
