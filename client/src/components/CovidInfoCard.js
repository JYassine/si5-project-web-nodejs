import { useState, useEffect } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';
import './CovidInfoCard.scss';

export const CovidInfoCard = ({ mode }) => {
    const [totalCases, setTotalCases] = useState(-1);
    const urlToFetch = "https://coronavirusapi-france.now.sh/FranceLiveGlobalData";

    useEffect(() => {
        fetch(urlToFetch)
            .then(result => {
                return result.json()
            })
            .then(data => {
                setTotalCases(data.FranceGlobalLiveData[0].casConfirmes);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <Card className={`covid-info-card p-3 mb-3 text-center
        ${mode ? 'dark' : 'light'}`}>
            <CardTitle tag="h4">Nombre de cas en France</CardTitle>
            <CardText>{totalCases}</CardText>
        </Card>
    )
}