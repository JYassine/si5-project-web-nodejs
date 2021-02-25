import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Row, Col } from "reactstrap";
import { Slider } from "@material-ui/core";
import "./Filter.scss";
import axios from "axios";
import configServer from "../configServer.json";

export const Filter = ({ mode, onChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [genderFilter, setGenderFilter] = useState("h");
  const [monthFilter, setMonthFilter] = useState("6");
  const [ageFilter, setAgeFilter] = useState(10);

  useEffect(async () => {
    const resultFiltered = await fetchDataCovid();
    onChange(resultFiltered);
    return resultFiltered;
  }, [genderFilter, monthFilter, ageFilter]);

  const fetchDataCovid = async () => {
    let result = undefined;
    let month = monthFilter < 10 ? "0" + monthFilter : monthFilter;
    let age =
      (ageFilter === 90) | (ageFilter === 0)
        ? ageFilter
        : parseInt(ageFilter) + 9;
    let filter = "?gender=" + genderFilter + "&month=" + month + "&age=" + age;
    console.log(configServer.urlServer + "" + filter);
    result = await axios
      .get(configServer.urlServer + "" + filter)
      .catch((err) => {
        console.error(err);
      });
    result.data.forEach((data) => {
      data.P_h = parseInt(data.P_h);
      data.P_f = parseInt(data.P_f);
      data.P = parseInt(data.P);
    });
    return result.data;
  };

  const handleGenderFilter = async (e) => {
    setGenderFilter(e.target.value);
  };

  const handleMonthFilter = async (e) => {
    setMonthFilter(e.target.value);
  };

  const handleAgeFilter = async (e, val) => {
    setAgeFilter(val);
  };

  function GendersButton(props) {
    const genders = props.genders;
    const listGenders = genders.map((gender) => {
      return (
        <Button
          style={{ backgroundColor: gender.color }}
          key={gender.key}
          onClick={handleGenderFilter}
          value={gender.value}
        >
          {gender.gender}
        </Button>
      );
    });
    return <ButtonGroup>{listGenders}</ButtonGroup>;
  }

  function MonthsSelect(props) {
    const months = props.months;
    const listMonths = months.map((month) => {
      return (
        <DropdownItem
          key={months.indexOf(month) + 1}
          onClick={handleMonthFilter}
          value={months.indexOf(month) + 1}
        >
          {month}
        </DropdownItem>
      );
    });
    return <DropdownMenu>{listMonths}</DropdownMenu>;
  }

  function valuetext(value) {
    return `${value}°C`;
  }

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
              <GendersButton
                genders={[
                  { gender: "Male", value: "h", key: 1, color: "#1014DE" },
                  { gender: "Female", value: "f", key: 2, color: "#C71585" },
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2> Age </h2>
              <Slider
                className="filter-slider"
                defaultValue={0}
                onChange={handleAgeFilter}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={90}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <h2>Month</h2>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret> {monthFilter}</DropdownToggle>
                <MonthsSelect months={months} />
              </Dropdown>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
