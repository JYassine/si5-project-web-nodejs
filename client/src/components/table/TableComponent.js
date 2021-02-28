import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { TablePagination } from "./TablePagination.js";
import { Filter } from "./../Filter.js";

import { Alert, Spinner } from "reactstrap";

export const TableComponent = ({ mode }) => {
  const [dataFiltered, setDataFiltered] = useState([1]);
  const [showData, setData] = useState(false);
  const [error, setErrorData] = useState(false);
  const [loadData, setLoadingData] = useState(false);
  const [pagesCount, setPagesCount] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const nbResultsPerPage = 12;
  console.log(dataFiltered);

  useEffect(() => {
    setPagesCount(Math.ceil(dataFiltered.length / nbResultsPerPage));
  }, [dataFiltered]);

  const handleSelected = (newPage) => {
    setCurrentPage(newPage);
  };

  const sliceAndRender = () => {
    return dataFiltered
      .slice(
        (currentPage - 1) * nbResultsPerPage,
        currentPage * nbResultsPerPage
      )
      .map((el) => {
        return (
          <tr key={el._id}>
            <td>{el.jour}</td>
            {dataFiltered[0].P !== undefined && <td>{el.P}</td>}
            {dataFiltered[0].P_h !== undefined && <td>{el.P_h}</td>}
            {dataFiltered[0].P_f !== undefined && <td>{el.P_f}</td>}
          </tr>
        );
      });
  };

  return (
    <>
      {error && (
        <Alert color="danger">
          {error.message || "Une erreur est survenue"}
        </Alert>
      )}
      {!loadData && <Spinner color="primary" />}

      <Container>
        <Row>
          <Col>
            <Row className="justify-content-center">
              {showData && (
                <Table responsive dark={mode} hover>
                  <thead>
                    <tr>
                      <th>Jour</th>
                      {dataFiltered[0].P !== undefined && (
                        <th>Taux d'incidence</th>
                      )}
                      {dataFiltered[0].P_h !== undefined && (
                        <th>Taux d'incidence Hommes</th>
                      )}
                      {dataFiltered[0].P_f !== undefined && (
                        <th>Taux d'incidence Femmes</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>{sliceAndRender()}</tbody>
                </Table>
              )}
            </Row>
            <Row className="justify-content-center">
              {pagesCount !== -1 && (
                <TablePagination
                  pagesCount={pagesCount}
                  currentPage={currentPage}
                  onSelect={handleSelected}
                />
              )}
            </Row>
          </Col>

          <Col md="auto">
            <Filter
              mode={mode}
              onChange={setDataFiltered}
              changeData={setData}
              onLoadingData={setLoadingData}
              onError={setErrorData}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
