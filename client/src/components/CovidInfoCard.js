import { useState, useEffect } from 'react';
import { Card, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import moment from 'moment';
import "moment/locale/fr";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './CovidInfoCard.scss';

export const CovidInfoCard = ({ mode, name, data }) => {
    const [dataNumber, setDataNumber] = useState(-1);
    const [title, setTitle] = useState();
    const urlToFetch = "https://www.trackcorona.live/api/countries/FR";

    const renderLoadingOrNumber = () => {
        // if (isLoaded === false) return <FontAwesomeIcon icon={faSpinner} className="fa fa-spinner fa-spin" />;
        if (dataNumber === -1 && data === -1) return <FontAwesomeIcon icon={faSpinner} className="fa fa-spinner fa-spin" />;
        else return name === 'totalCases' ?
            new Intl.NumberFormat('fr-FR').format(dataNumber)  
            :
            new Intl.NumberFormat('fr-FR').format(data);
    }

    useEffect(() => {
        switch (name) {
            case 'totalCases':
                fetch(urlToFetch)
                    .then(result => result.json())
                    .then(json => setDataNumber(json.data[0].confirmed))
                    .catch(err => console.log(err));
                setTitle('Nombre de cas en France');
                break;
            case 'deces':
                setTitle('Nombre de décès');
                break;
            case 'decesEhpad':
                setTitle('Nombre de décès en Ehpad');
                break;
            case 'hospitalises':
                setTitle('Nombre d\'hospitalisations');
                break;
            case 'reanimation':
                setTitle('Nombre de cas en réanimation');
                break;
            case 'gueris':
                setTitle('Nombre de cas guéris');
                break;
            case 'casEhpad':
                setTitle('Nombre de cas en Ehpad');
                break;
            default:
                setDataNumber(-1);
        }
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