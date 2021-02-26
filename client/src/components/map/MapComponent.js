import HeatMap from './HeatMap'
import { MonthFilter } from './MonthFilter.js';
import { Container, Col, Row } from 'reactstrap';
import { useState } from 'react';

export const MapComponent = () => {
    const [month, setMonth] = useState('12')

    const changeMonthFilter = (value) => {
        setMonth(value);
    }

    return (
        <Container>
            <Row>
                <Col className="col-9" align="center">
                    <HeatMap month={month}/>
                </Col>
                <Col md="auto" align="left">
                <MonthFilter changeMonthFilter={changeMonthFilter}/>
                </Col>
            </Row>
        </Container>

    )
}