import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import FaqData from '../../assets/tableaux/faqData';

// Définir l'interface pour les éléments FAQ
interface FaqItem {
  id: number;
  question: string;
  response: string;
}

const FaqAccordion = () => {
  return (
    <div className="row">
      {/* Utiliser un accordéon pour afficher les FAQs, en occupant 12 colonnes sur petits écrans et 9 colonnes sur moyens et grands écrans */}
      <Accordion flush className="col-12 col-md-9 accordion-container">
        {/* Mapping de chaque élément FAQ pour créer des items d'accordéon */}
        {FaqData.map((faqItem: FaqItem, index: number) => (
          <Accordion.Item key={faqItem.id} eventKey={index.toString()}>
            <Accordion.Header>
              <div className="fw-bolder border-accordion">
                {faqItem.question}
              </div>
            </Accordion.Header>
            <Accordion.Body>{faqItem.response}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      {/* Ajout d'une carte publicitaire à côté de l'accordéon, en occupant 12 colonnes sur petits écrans et 3 colonnes sur moyens et grands écrans */}
      <Card
        className="col-12 col-md-3 bg-white border-0 shadow-sm p-3"
        style={{
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '25px 1px 25px 25px',
        }}
      >
        <div className="text-center">
          <div className="card-body">
            <h5 className="title2">Publicité</h5>
            <p className="card-text"></p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FaqAccordion;
