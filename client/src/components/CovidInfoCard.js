import { useState, useEffect } from 'react';
import { Card, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import moment from 'moment';
import "moment/locale/fr";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './CovidInfoCard.scss';

export const CovidInfoCard = ({ mode, name }) => {
    const [dataNumber, setDataNumber] = useState(-1);
    const [title, setTitle] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const urlToFetch = "https://coronavirusapi-france.now.sh/FranceLiveGlobalData";

    const renderLoadingOrNumber = () => {
        if (isLoaded === false) return <FontAwesomeIcon icon={faSpinner} className="fa fa-spinner fa-spin" />;
        else return dataNumber;
    }

    useEffect(() => {
        setIsLoaded(false);
        fetch(urlToFetch)
            .then(result => result.json())
            .then(data => {
                console.log(data)
                switch (name) {
                    case 'totalCases':
                        setDataNumber(data.FranceGlobalLiveData[0].casConfirmes);
                        setTitle('Nombre de cas en France');
                        break;
                    case 'deces':
                        setDataNumber(data.FranceGlobalLiveData[0].deces);
                        setTitle('Nombre de décès');
                        break;
                    case 'decesEhpad':
                        setDataNumber(data.FranceGlobalLiveData[0].decesEhpad);
                        setTitle('Nombre de décès en Ehpad');
                        break;
                    case 'hospitalises':
                        setDataNumber(data.FranceGlobalLiveData[0].hospitalises);
                        setTitle('Nombre d\'hospitalisations');
                        break;
                    case 'reanimation':
                        setDataNumber(data.FranceGlobalLiveData[0].reanimation);
                        setTitle('Nombre de cas en réanimation');
                        break;
                    case 'gueris':
                        setDataNumber(data.FranceGlobalLiveData[0].gueris);
                        setTitle('Nombre de cas guéris');
                        break;
                    case 'casEhpad':
                        setDataNumber(data.FranceGlobalLiveData[0].casConfirmesEhpad);
                        setTitle('Nombre de cas en Ehpad');
                        break;
                    default:
                        setDataNumber(-1);
                }

                setIsLoaded(true);
            })
            .catch(err => {
                console.log(err);
                setIsLoaded(true);
            });
    }, [name]);

    return (
        <Card className={`covid-info-card p-3 mb-3 text-center
        ${mode ? 'dark' : 'light'}`}>
            <CardTitle tag="h4">{title}</CardTitle>
            <CardText>
                {renderLoadingOrNumber()}
            </CardText>
            {name === 'totalCases' && <CardSubtitle>
                <em>Au {moment().format('LL')}</em>
            </CardSubtitle>}

        </Card>
    )
}