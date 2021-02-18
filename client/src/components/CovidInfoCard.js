import { useState, useEffect } from 'react';
import { Card, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import moment from 'moment';
import "moment/locale/fr";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './CovidInfoCard.scss';

export const CovidInfoCard = ({ mode }) => {
    const [totalCases, setTotalCases] = useState(-1);
    const [isLoaded, setIsLoaded] = useState(false);
    const urlToFetch = "https://coronavirusapi-france.now.sh/FranceLiveGlobalData";

    const renderLoadingOrNumber = () => {
        if (isLoaded === false) return <FontAwesomeIcon icon={faSpinner} className="fa fa-spinner fa-spin"/>;
        else return totalCases;
    }

    useEffect(() => {
        setIsLoaded(false);
        fetch(urlToFetch)
            .then(result => result.json())
            .then(data => {
                setTotalCases(data.FranceGlobalLiveData[0].casConfirmes);
                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
                setIsLoaded(true);
            });
    }, []);

    return (
        <Card className={`covid-info-card p-3 mb-3 text-center
        ${mode ? 'dark' : 'light'}`}>
            <CardTitle tag="h4">Nombre de cas en France</CardTitle>
            <CardText>
                {renderLoadingOrNumber()}
            </CardText>
            <CardSubtitle>
                <em>Au {moment().format('LL')}</em>
            </CardSubtitle>
        </Card>
    )
}