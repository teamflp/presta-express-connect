import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillGithub,
} from 'react-icons/ai';
import { FaHome, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa';

const FooterComponent: React.FC = () => {
  return (
    <footer className="text-center text-lg-start bg-dark text-white">
      <section
        className="container d-flex justify-content-center justify-content-lg-between p-4 text-white"
        style={{ borderBottom: '1px solid #C63E46' }}
      >
        <div className="me-5 d-none d-lg-block">
          <span>Retrouvez-nous sur nos réseaux sociaux:</span>
        </div>

        <div>
          <a
            href="https://www.facebook.com/"
            className="me-4 text-reset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillFacebook />
          </a>
          <a
            href="https://twitter.com/"
            className="me-4 text-reset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineTwitter />
          </a>
          <a
            href="https://plus.google.com/"
            className="me-4 text-reset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGoogleCircle />
          </a>
          <a
            href="https://www.instagram.com/"
            className="me-4 text-reset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram />
          </a>
          <a
            href="https://www.linkedin.com/"
            className="me-4 text-reset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://github.com/"
            className="me-4 text-reset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </a>
        </div>
      </section>

      <section className="mb-4">
        <Container>
          <Row className="mt-3">
            <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Cadre légal</h6>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Mentions légales
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Conditions générales
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Données personnelles
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Utilisation des cookies
                </a>
              </p>
            </Col>

            <Col md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Cadre légal</h6>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Mentions légales
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Conditions générales
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Données personnelles
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Utilisation des cookies
                </a>
              </p>
            </Col>

            <Col md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Presta Express</h6>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Recrutement
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Notre engagement qualité
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Espace presse
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset text-decoration-none">
                  Publicité
                </a>
              </p>
            </Col>

            <Col md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <FaHome className="me-3" />
                69008 Lyon
              </p>
              <p>
                <FaEnvelope className="me-3" />
                info@prestaExpress.com
              </p>
              <p>
                <FaPhone className="me-3" />+ 01 234 567 88
              </p>
              <p>
                <FaPrint className="me-3" />+ 01 234 567 89
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div
        className="container text-center p-3 bg-dark "
        style={{ borderTop: '1px solid #C63E46' }}
      >
        <div className="text-white">
          © {new Date().getFullYear()} prestaExpress.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
