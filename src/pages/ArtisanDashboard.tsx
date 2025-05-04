
import { useState, useEffect } from 'react';

function ArtisanDashboard() {
  const [userData, setUserData] = useState({
    name: 'Jean Dupont',
    job: 'Plombier',
    rating: 4.8,
    reviewCount: 124,
    city: 'Lyon',
    pendingProjects: 3,
    completedProjects: 78
  });

  useEffect(() => {
    // Fetch artisan data from API in a real application
    console.log('Artisan dashboard loaded');
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Tableau de bord Artisan</h1>
      
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-4">
            <div className="card-body text-center">
              <div className="mb-3">
                <img 
                  src="/src/assets/images/plomberie.jpg" 
                  className="rounded-circle" 
                  alt="Profil" 
                  style={{width: '100px', height: '100px', objectFit: 'cover'}}
                />
              </div>
              <h5>{userData.name}</h5>
              <p className="text-muted">{userData.job}</p>
              <div className="mb-2">
                <span className="me-1">★</span>
                <span>{userData.rating} ({userData.reviewCount} avis)</span>
              </div>
              <p className="mb-0">{userData.city}</p>
            </div>
          </div>
          
          <div className="list-group mb-4">
            <a href="#" className="list-group-item list-group-item-action active">Tableau de bord</a>
            <a href="#" className="list-group-item list-group-item-action">Mon profil</a>
            <a href="#" className="list-group-item list-group-item-action">Projets</a>
            <a href="#" className="list-group-item list-group-item-action">Messages</a>
            <a href="#" className="list-group-item list-group-item-action">Avis</a>
            <a href="#" className="list-group-item list-group-item-action">Paramètres</a>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Mes projets</h5>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="border rounded p-3 text-center">
                    <h2>{userData.pendingProjects}</h2>
                    <p className="text-muted mb-0">Projets en cours</p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="border rounded p-3 text-center">
                    <h2>{userData.completedProjects}</h2>
                    <p className="text-muted mb-0">Projets terminés</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Projets récents</h5>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Marie Martin</td>
                      <td>Réparation fuite</td>
                      <td>10/05/2023</td>
                      <td><span className="badge bg-warning">En cours</span></td>
                    </tr>
                    <tr>
                      <td>Pierre Durand</td>
                      <td>Installation douche</td>
                      <td>05/05/2023</td>
                      <td><span className="badge bg-success">Terminé</span></td>
                    </tr>
                    <tr>
                      <td>Sophie Lefebvre</td>
                      <td>Changement robinet</td>
                      <td>01/05/2023</td>
                      <td><span className="badge bg-success">Terminé</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Derniers avis</h5>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between">
                  <span>Marie Martin</span>
                  <small className="text-muted">10/05/2023</small>
                </div>
                <div>
                  <span className="me-1">★★★★★</span>
                  <span className="text-muted">5.0</span>
                </div>
                <p className="mt-2 mb-0">Travail impeccable et très professionnel. Je recommande vivement.</p>
              </div>
              
              <div>
                <div className="d-flex justify-content-between">
                  <span>Pierre Durand</span>
                  <small className="text-muted">05/05/2023</small>
                </div>
                <div>
                  <span className="me-1">★★★★☆</span>
                  <span className="text-muted">4.0</span>
                </div>
                <p className="mt-2 mb-0">Bon travail, mais un peu de retard sur la livraison.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtisanDashboard;
