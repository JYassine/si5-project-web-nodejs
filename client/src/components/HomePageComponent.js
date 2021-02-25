import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { CovidInfoCard } from './CovidInfoCard.js'

export const HomePageComponent = ({ mode }) => {
    const [globalData, setGlobalData] = useState({
        gueris: -1,
        hospitalises: -1,
        reanimations: -1
    });
    const [deces, setDeces] = useState(-1);
    const firstUrlToFetch = "https://coronavirusapi-france.now.sh/FranceLiveGlobalData";
    const secondUrlToFetch = "https://www.trackcorona.live/api/countries/FR";

    useEffect(() => {
        fetch(firstUrlToFetch)
        .then(result => result.json())
        .then(data => {
            setGlobalData({
                gueris: data.FranceGlobalLiveData[0].gueris,
                hospitalises: data.FranceGlobalLiveData[0].hospitalises,
                reanimations: data.FranceGlobalLiveData[0].reanimation
            })
        })
        .catch(err => console.log(err));
        fetch(secondUrlToFetch)
        .then(result => result.json())
        .then(data => {
            setDeces(data.data[0].dead)
        })
        .catch(err => console.log(err));
    })


    return (
        <Container>
            <Row >
                <Col className="mt-5">
                    <CovidInfoCard name="deces" mode={mode} data={deces}/>
                </Col>
                <Col className="mt-5">
                    <CovidInfoCard name="gueris" mode={mode} data={globalData.gueris}/>
                </Col>
            </Row >
            <Row >
                <Col className="mt-5">
                    <CovidInfoCard name="hospitalises" mode={mode} data={globalData.hospitalises}/>
                </Col>
                <Col className="mt-5">
                    <CovidInfoCard name="reanimation" mode={mode} data={globalData.reanimations}/>
                </Col>
            </Row>
        </Container>
    )
}