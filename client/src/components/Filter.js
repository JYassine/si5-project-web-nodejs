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
  const [dropdownOpenMonth, setDropdownOpenMonth] = useState(false);
  const [months, setMonths] = useState([""]);
  const [dropdownOpenYear, setDropdownOpenYear] = useState(false);
  const [genderFilter, setGenderFilter] = useState("h");
  const [monthFilter, setMonthFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState(10);
  const [yearFilter, setYearFilter] = useState(2020);

  useEffect(async () => {
    await fetchMonths();
    onChange(await fetchDataCovid());
  }, [genderFilter, monthFilter, ageFilter, yearFilter]);

  const fetchMonths = async () => {
    let queryAllMonths = "/months/" + yearFilter;

    console.log(configServer.urlServer + "" + queryAllMonths);
    const allMonths = await axios
      .get(configServer.urlServer + "" + queryAllMonths)
      .catch((err) => {
        console.error(err);
      });
    setMonths(allMonths.data);
  };
  const fetchDataCovid = async () => {
    let result = undefined;
    let age =
      (ageFilter === 90) | (ageFilter === 0)
        ? ageFilter
        : parseInt(ageFilter) + 9;
    let filter =
      "?gender=" +
      genderFilter +
      "&month=" +
      monthFilter +
      "&age=" +
      age +
      "&year=" +
      yearFilter;
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

  const toggleMonth = () => setDropdownOpenMonth((prevState) => !prevState);

  const toggleYear = () => setDropdownOpenYear((prevState) => !prevState);

  const handleGenderFilter = async (e) => {
    setGenderFilter(e.target.value);
  };

  const handleMonthFilter = async (e) => {
    setMonthFilter(e.target.value);
  };

  const handleAgeFilter = async (e, val) => {
    setAgeFilter(val);
  };

  const handleYearFilter = async (e) => {
    setYearFilter(e.target.value);
    setMonthFilter("");
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
        <DropdownItem key={month} onClick={handleMonthFilter} value={month}>
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
              <Dropdown isOpen={dropdownOpenMonth} toggle={toggleMonth}>
                <DropdownToggle caret> {monthFilter}</DropdownToggle>
                <MonthsSelect months={months} />
              </Dropdown>
            </Col>
            <Col>
              <h2>Year</h2>
              <Dropdown isOpen={dropdownOpenYear} toggle={toggleYear}>
                <DropdownToggle caret> {yearFilter}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem key={1} onClick={handleYearFilter} value={2020}>
                    {2020}
                  </DropdownItem>

                  <DropdownItem key={2} onClick={handleYearFilter} value={2021}>
                    {2021}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
