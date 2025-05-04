
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../components/Header/partials/NavBar';
import Footer from '../components/Footer/Footer';
import { jobs, Job } from '../assets/tableaux/jobs';

function CategoryDetails() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Job | null>(null);
  const jobList = jobs as Job[];

  useEffect(() => {
    // Find the category by ID
    const foundCategory = jobList.find((j) => j.id === Number(id));
    if (foundCategory) {
      setCategory(foundCategory);
    }
  }, [id, jobList]);

  if (!category) {
    return (
      <div className="App">
        <NavBar />
        <div className="container my-5 text-center">
          <h2>Catégorie non trouvée</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <NavBar />
      
      <div className="container my-5">
        <div className="row mb-5">
          <div className="col-md-5">
            <img 
              src={category.image} 
              alt={category.title} 
              className="img-fluid rounded shadow-sm" 
              style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-7">
            <h1 className="title1">{category.title}</h1>
            <hr className="redLineContainer mb-4" />
            
            <h5 className="mb-3">Services proposés:</h5>
            <ul className="list-group list-group-flush mb-4">
              {category.servicesList.map((service, index) => (
                <li key={index} className="list-group-item bg-transparent">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default CategoryDetails;
