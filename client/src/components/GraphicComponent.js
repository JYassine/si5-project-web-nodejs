import React, { useState } from "react";
import { Graph } from "./graph/Graph";
import { Filter } from "./Filter";
import { Container, Row, Col } from "reactstrap";

export const GraphicComponent = ({ mode }) => {
  const [dataFiltered, setDataFiltered] = useState();

  const [showData, setData] = useState(false);
  const [errorData, setErrorData] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  return (
    <Container>
      <Row>
        <Col>
          <Graph
            mode={mode}
            dataFilter={dataFiltered}
            onShowData={showData}
            loadData={loadingData}
            error={errorData}
          />
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
  );
};
