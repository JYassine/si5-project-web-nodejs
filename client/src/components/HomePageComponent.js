import { Container, Row, Col } from 'reactstrap';
import { CovidInfoCard } from './CovidInfoCard.js'

export const HomePageComponent = ({ mode }) => {

    return (
        <Container>
            <Row >
                <Col className="mt-5">
                    <CovidInfoCard name="deces" mode={mode}/>
                </Col>
                <Col className="mt-5">
                    <CovidInfoCard name="gueris" mode={mode}/>
                </Col>
            </Row >
            <Row >
                <Col className="mt-5">
                    <CovidInfoCard name="hospitalises" mode={mode}/>
                </Col>
                <Col className="mt-5">
                    <CovidInfoCard name="reanimation" mode={mode}/>
                </Col>
            </Row>
        </Container>
    )
}