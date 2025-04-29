
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

// Définir l'interface pour les éléments FAQ
interface FaqItem {
  id: number;
  question: string;
  response: string;
}

const FaqAccordion = () => {
  // Données FAQ améliorées avec du contenu réel
  const FaqData: FaqItem[] = [
    {
      id: 1,
      question: "Comment fonctionne Presta Express ?",
      response: "Presta Express met en relation les particuliers avec des artisans qualifiés. Déposez votre demande, recevez des devis gratuits, comparez les offres et choisissez le professionnel qui correspond le mieux à vos besoins et à votre budget."
    },
    {
      id: 2,
      question: "Les artisans sont-ils vérifiés ?",
      response: "Oui, tous les artisans présents sur notre plateforme sont soumis à un processus de vérification rigoureux. Nous contrôlons leurs qualifications, assurances professionnelles et antécédents pour vous garantir des prestataires fiables et compétents."
    },
    {
      id: 3,
      question: "Combien coûte l'utilisation du service ?",
      response: "L'utilisation de Presta Express est totalement gratuite pour les particuliers. Vous ne payez que pour les services des artisans que vous engagez, aux tarifs convenus directement avec eux."
    },
    {
      id: 4,
      question: "Que faire en cas de problème avec un artisan ?",
      response: "En cas de difficulté avec un artisan, notre service client est à votre disposition. Contactez-nous immédiatement et nous interviendrons pour trouver une solution adaptée. Notre garantie satisfaction vous protège pour chaque projet."
    },
  ];

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <h2 className="fw-bold title1 text-center mb-4">Questions fréquentes</h2>
        <p className="text-center mb-5 fs-5">Des réponses à vos questions les plus courantes</p>
      </div>
      <Accordion flush className="col-12 col-md-9 accordion-container">
        {FaqData.map((faqItem: FaqItem, index: number) => (
          <Accordion.Item 
            key={faqItem.id} 
            eventKey={index.toString()}
            className="mb-3 shadow-sm"
            style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #eaeaea" }}
          >
            <Accordion.Header>
              <div className="fw-bold py-2">
                {faqItem.question}
              </div>
            </Accordion.Header>
            <Accordion.Body className="bg-white">{faqItem.response}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      
      <Card
        className="col-12 col-md-3 bg-white border-0 shadow-sm p-4"
        style={{
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.08)',
          borderRadius: '25px 1px 25px 25px',
        }}
      >
        <div className="text-center">
          <div className="card-body">
            <h5 className="title2 fw-bold mb-3">Besoin d'aide ?</h5>
            <p className="card-text mb-4">Notre équipe de support est disponible pour répondre à toutes vos questions du lundi au vendredi, de 9h à 18h.</p>
            <a 
              href="/contact" 
              className="btn"
              style={{
                backgroundColor: '#C63E46',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px 0px 20px 20px',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b73840';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#C63E46';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Contactez-nous
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FaqAccordion;
