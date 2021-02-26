import { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { TablePagination } from './TablePagination.js';
import { Filter } from './../Filter.js';

export const TableComponent = ({ mode }) => {
    const [data, setData] = useState([]);
    const [dataFiltered, setDataFiltered] = useState();
    const [pagesCount, setPagesCount] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);
    const urlToFetch = 'http://localhost:4000/incidentRates';

    const nbResultsPerPage = 12;

    useEffect(() => {
        fetch(urlToFetch)
            .then(response => response.json())
            .then(json => {
                const filteredJson = json.filter((el) => el.cl_age90 === "0")
                setData(filteredJson);
                setPagesCount(Math.ceil(filteredJson.length / nbResultsPerPage));
            })
            .catch(err => console.log(err));
    }, []);

    const handleSelected = (newPage) => {
        setCurrentPage(newPage);
    }

    const sliceAndRender = () => {
        return data.slice((currentPage - 1) * nbResultsPerPage, currentPage * nbResultsPerPage)
            .map(el => {
                return (
                    <tr key={el._id}>
                        <td>{el.jour}</td>
                        <td>{el.P}</td>
                        <td>{el.P_h}</td>
                        <td>{el.P_f}</td>
                    </tr>
                )
            })
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Row className="justify-content-center">
                        <Table responsive dark={mode}>
                            <thead>
                                <tr>
                                    <th>Jour</th>
                                    <th>Taux d'incidence</th>
                                    <th>Taux d'incidence Hommes</th>
                                    <th>Taux d'incidence Femmes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sliceAndRender()}
                            </tbody>
                        </Table>
                    </Row>
                    <Row className="justify-content-center">
                        {pagesCount !== -1 && <TablePagination pagesCount={pagesCount} currentPage={currentPage}
                            onSelect={handleSelected} />}
                    </Row>
                </Col>
                <Col md="auto">
                    <Filter mode={mode} onChange={setDataFiltered} />
                </Col>
            </Row>
         
        </Container>
    )
}