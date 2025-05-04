
import { useState, useEffect } from 'react';

function AdminDashboard() {
  const [userData, setUserData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    lastLogin: '2023-05-20'
  });

  useEffect(() => {
    // Fetch admin data from API in a real application
    console.log('Admin dashboard loaded');
  }, []);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Tableau de bord Administrateur</h1>
      
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Profil</h5>
              <p className="mb-1"><strong>Nom:</strong> {userData.name}</p>
              <p className="mb-1"><strong>Email:</strong> {userData.email}</p>
              <p className="mb-1"><strong>Rôle:</strong> {userData.role}</p>
              <p className="mb-1"><strong>Dernière connexion:</strong> {userData.lastLogin}</p>
            </div>
          </div>
          
          <div className="list-group mb-4">
            <a href="#" className="list-group-item list-group-item-action active">Tableau de bord</a>
            <a href="#" className="list-group-item list-group-item-action">Utilisateurs</a>
            <a href="#" className="list-group-item list-group-item-action">Artisans</a>
            <a href="#" className="list-group-item list-group-item-action">Rapports</a>
            <a href="#" className="list-group-item list-group-item-action">Paramètres</a>
          </div>
        </div>
        
        <div className="col-md-9">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Statistiques</h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="border rounded p-3 text-center">
                    <h2>152</h2>
                    <p className="text-muted mb-0">Utilisateurs</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="border rounded p-3 text-center">
                    <h2>87</h2>
                    <p className="text-muted mb-0">Artisans</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="border rounded p-3 text-center">
                    <h2>243</h2>
                    <p className="text-muted mb-0">Projets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Activités récentes</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Nouvel artisan inscrit</strong>
                    <p className="mb-0 text-muted">Pierre Durand</p>
                  </div>
                  <small className="text-muted">Il y a 2 heures</small>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Projet validé</strong>
                    <p className="mb-0 text-muted">Rénovation appartement</p>
                  </div>
                  <small className="text-muted">Il y a 5 heures</small>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Nouveau commentaire</strong>
                    <p className="mb-0 text-muted">Sur le profil de Jean Dupont</p>
                  </div>
                  <small className="text-muted">Il y a 1 jour</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
