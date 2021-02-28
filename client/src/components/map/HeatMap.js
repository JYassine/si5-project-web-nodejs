import React, { useEffect, useState } from 'react'
import { GoogleMap, useLoadScript, Circle } from '@react-google-maps/api';
import googleApi from './../../googleApi.json';
import configServer from './../../configServer.json';
import { libraries } from './libraries.js'


const HeatMap = ({ month }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: googleApi.apiKey,
        libraries: libraries
    })
    const [data, setData] = useState();
    const serverUrl = process.env.NODE_ENV === 'production' ?
        configServer.urlServerProd
        :
        configServer.urlServer;

    const params = `?month=${month}&age=0&average=true`;

    const coordinates = {
        '11': {
            lat: 48.84051059586292,
            long: 2.322042744663157
        },
        '24': {
            lat: 47.438793155432144,
            long: 1.6146537820552078
        },
        '27': {
            lat: 47.16950456947948,
            long: 4.814427470914424
        },
        '28': {
            lat: 49.09624232388728,
            long: 0.14882080153294394
        },
        '32': {
            lat: 49.99701289431568,
            long: 2.81676033897014
        },
        '44': {
            lat: 48.74703024322381,
            long: 5.623237147696003
        },
        '52': {
            lat: 47.43477888283212,
            long: -0.9279824806218117
        },
        '53': {
            lat: 48.27723164415506,
            long: -3.617171379101211
        },
        '75': {
            lat: 45.3190559604141,
            long: 0.08939171941823029
        },
        '76': {
            lat: 43.65421835569659,
            long: 2.4168127921145905
        },
        '84': {
            lat: 45.40013808574252,
            long: 4.575336206481321
        },
        '93': {
            lat: 43.6208090851592,
            long: 6.757194298129175
        },
        '94': {
            lat: 42.16601573648623,
            long: 9.082767713327666
        }
    }

    useEffect(() => {
        fetch(serverUrl + params)
            .then(response => response.json())
            .then(result => {
                setData(result)
            })
            .catch(err => console.log(err))
    }, [params, serverUrl]);


    const containerStyle = {
        'max-width': '700px',
        'min-width': '300px',
        'height': '700px'
    };

    const center = {
        lat: 46.84516431925359,
        lng: 2.504882731590444
    };

    const renderCircles = () => {
        let content = [];
        for (let i in data) {
            content.push(
                <Circle
                    radius={data[i]}
                    center={new window.google.maps.LatLng(coordinates[i].lat, coordinates[i].long)}
                    key={data[i]}
                >
                </Circle>
            )
        }
        return content;

    }


    const renderMap = () => {
        return (
            <GoogleMap
                // onLoad={loadHandler}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={6}
                onLoad={() => console.log('google maps loaded')}
            >

                {renderCircles()}

                {/* <Circle
                    radius={50000}
                    center={new window.google.maps.LatLng(43.69729123602956, 7.270098548574758)}
                >

                </Circle> */}

            </GoogleMap>
        )
    }



    return isLoaded ? renderMap() : <p>Ok</p>
}

export default React.memo(HeatMap);