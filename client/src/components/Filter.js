import React from "react";
import { Button, Card, CardBody, ButtonGroup } from "reactstrap";
import { Row, Col } from "reactstrap";
import { Slider } from "@material-ui/core";
import "./Filter.scss";

export const Filter = ({ mode }) => {
  return (
    <div className={`filter ${mode ? "dark" : "light"}`}>
      <Card className={`filter-card ${mode ? "dark" : "light"}`}>
        <CardBody>
          <Row>
            <Col>
              <h1>Filter</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2>Gender</h2>
            </Col>
            <Col>
              <ButtonGroup>
                <Button>Male</Button>
                <Button>Female</Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2> Age </h2>

              <Slider
                className="filter-slider"
                defaultValue={30}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={90}
              />
            </Col>
          </Row>

          <Button>Save</Button>
        </CardBody>
      </Card>
    </div>
  );
};
