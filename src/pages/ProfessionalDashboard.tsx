
import { useState, useEffect } from 'react';

function ProfessionalDashboard() {
  const [userData, setUserData] = useState({
    name: 'Jean Dupont',
    profession: 'Plombier',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    memberSince: '2022-01-15',
    clients: 45,
    projects: 67,
    revenue: 24500,
    rating: 4.8
  });

  useEffect(() => {
    // Fetch professional data from API in a real application
    console.log('Professional dashboard loaded');
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Tableau de bord Professionnel</h1>
      
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
              <p className="text-muted">{userData.profession}</p>
              <div className="mb-2">
                <span>★</span>
                <span>{userData.rating}</span>
              </div>
              <p className="mb-2">{userData.email}</p>
              <p className="mb-0">{userData.phone}</p>
            </div>
          </div>
          
          <div className="list-group mb-4">
            <a href="#" className="list-group-item list-group-item-action active">Tableau de bord</a>
            <a href="#" className="list-group-item list-group-item-action">Mon profil</a>
            <a href="#" className="list-group-item list-group-item-action">Projets</a>
            <a href="#" className="list-group-item list-group-item-action">Clients</a>
            <a href="#" className="list-group-item list-group-item-action">Calendrier</a>
            <a href="#" className="list-group-item list-group-item-action">Finances</a>
            <a href="#" className="list-group-item list-group-item-action">Paramètres</a>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h2>{userData.clients}</h2>
                  <p className="text-muted mb-0">Clients</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h2>{userData.projects}</h2>
                  <p className="text-muted mb-0">Projets</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h2>{userData.revenue.toLocaleString('fr-FR')} €</h2>
                  <p className="text-muted mb-0">Revenus</p>
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
                      <th>Projet</th>
                      <th>Client</th>
                      <th>Statut</th>
                      <th>Date</th>
                      <th>Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Rénovation salle de bain</td>
                      <td>Marie Martin</td>
                      <td><span className="badge bg-success">Terminé</span></td>
                      <td>15/04/2023</td>
                      <td>1 200 €</td>
                    </tr>
                    <tr>
                      <td>Installation chauffe-eau</td>
                      <td>Pierre Durand</td>
                      <td><span className="badge bg-warning">En cours</span></td>
                      <td>10/05/2023</td>
                      <td>450 €</td>
                    </tr>
                    <tr>
                      <td>Réparation fuite</td>
                      <td>Sophie Lefebvre</td>
                      <td><span className="badge bg-info">Planifié</span></td>
                      <td>25/05/2023</td>
                      <td>180 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Calendrier des rendez-vous</h5>
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Installation chauffe-eau</h6>
                    <small className="text-muted">Aujourd'hui, 14:00</small>
                  </div>
                  <p className="mb-1">Pierre Durand</p>
                  <small className="text-muted">12 Rue des Lilas, Lyon</small>
                </div>
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Réparation fuite</h6>
                    <small className="text-muted">Demain, 10:30</small>
                  </div>
                  <p className="mb-1">Sophie Lefebvre</p>
                  <small className="text-muted">8 Avenue Victor Hugo, Lyon</small>
                </div>
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Devis rénovation cuisine</h6>
                    <small className="text-muted">20 Mai, 16:00</small>
                  </div>
                  <p className="mb-1">Jean Martin</p>
                  <small className="text-muted">24 Rue de la République, Lyon</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionalDashboard;
