import React, { useState } from "react";
import { Graph } from "./graph/Graph";
import { Filter } from "./Filter";
import { Container, Row, Col } from "reactstrap";

export const GraphicComponent = ({ mode }) => {
  const [dataFiltered, setDataFiltered] = useState();
  return (
    <Container>
      <Row>
        <Col>
          <Graph mode={mode} dataFilter={dataFiltered} />
        </Col>
        <Col md="auto">
          <Filter mode={mode} onChange={setDataFiltered} />
        </Col>
      </Row>
    </Container>
  );
};
