
import { Accordion } from 'react-bootstrap';
import { faqData } from '../../assets/tableaux/faqData';

function FaqAccordion() {
  return (
    <div className="py-5">
      <h2 className="text-3xl font-bold text-center mb-4">Questions Fréquentes</h2>
      <p className="text-center mb-5 text-gray-600">Retrouvez les réponses aux questions les plus posées</p>
      <div className="accordion-container">
        <Accordion defaultActiveKey="0" flush>
          {faqData.map((faq, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>
                {faq.answer}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FaqAccordion;
