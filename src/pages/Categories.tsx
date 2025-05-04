
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { jobs, Job } from '../assets/tableaux/jobs';

function Categories() {
  const [searchTerm, setSearchTerm] = useState('');
  const jobList = jobs as Job[];

  const filteredJobs = jobList.filter(
    (job) => job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <NavBar />
      
      <div className="container my-5">
        <h1 className="title1 text-center mb-5">Catégories d'artisans</h1>
        
        <div className="input-group mb-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Rechercher une catégorie..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="row">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="col-md-4 mb-4">
                <div className="card hover-card h-100">
                  <img 
                    src={job.image} 
                    className="card-img-top" 
                    alt={job.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text text-muted">
                      {job.servicesList.join(', ')}
                    </p>
                    <Link 
                      to={`/professionnels/${job.id}`} 
                      className="btn btn-primary mt-auto"
                    >
                      Voir les artisans
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>Aucune catégorie trouvée.</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Categories;
