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

  const [dropdownOpenRegion, setDropdownOpenRegion] = useState(false);
  const [genderFilter, setGenderFilter] = useState("h");
  const [regionFilter, setRegionFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState(2020);
  const [regions, setRegions] = useState([""]);

  useEffect(async () => {
    fetchRegions();
    fetchMonths();
    onChange(await fetchDataCovid());
  }, [genderFilter, monthFilter, ageFilter, yearFilter, regionFilter]);

  const fetchRegions = async () => {
    let queryAllRegions = "/regions";

    console.log(configServer.urlServer + "" + queryAllRegions);
    const allRegions = await axios
      .get(configServer.urlServer + "" + queryAllRegions)
      .catch((err) => {
        console.error(err);
      });
    allRegions.data.push("");
    setRegions(allRegions.data);
  };
  const fetchMonths = async () => {
    let queryAllMonths = "/months/" + yearFilter;

    console.log(configServer.urlServer + "" + queryAllMonths);
    const allMonths = await axios
      .get(configServer.urlServer + "" + queryAllMonths)
      .catch((err) => {
        console.error(err);
      });
    allMonths.data.push("");
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
      yearFilter +
      "&region=" +
      regionFilter;
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

  const toggleRegion = () => setDropdownOpenRegion((prevState) => !prevState);

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

  const handleRegionFilter = async (e) => {
    setRegionFilter(e.target.value);
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
          value={month}
        >
          {month === "" ? "All Month" : month}
        </DropdownItem>
      );
    });
    return <DropdownMenu>{listMonths}</DropdownMenu>;
  }

  function RegionsSelect(props) {
    const regions = props.regions;
    const listRegions = regions.map((region) => {
      return (
        <DropdownItem
          key={regions.indexOf(region) + 1}
          onClick={handleRegionFilter}
          value={region}
        >
          {region === "" ? "All Region" : region}
        </DropdownItem>
      );
    });
    return <DropdownMenu>{listRegions}</DropdownMenu>;
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

            <Col>
              <h2>Region</h2>
              <Dropdown isOpen={dropdownOpenRegion} toggle={toggleRegion}>
                <DropdownToggle caret> {regionFilter}</DropdownToggle>
                <RegionsSelect regions={regions} />
              </Dropdown>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
