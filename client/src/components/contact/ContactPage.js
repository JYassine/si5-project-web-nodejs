import { ContactForm } from './ContactForm.js';
import { Container, Col, Row } from 'reactstrap';

export const ContactPage = () => {

    return (
        <Container>
            <Row className="justify-content-center pb-3">
                <Col className="col-12 col-sm-9">
                    <h3>Contact</h3>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="col-12 col-sm-9">
                    <ContactForm />
                </Col>
            </Row>
        </Container>

    )
};