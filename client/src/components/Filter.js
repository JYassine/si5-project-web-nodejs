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
import "./Filter.scss";
import axios from "axios";
import configServer from "../configServer.json";
import { useQuery } from "react-query";

export const Filter = ({
  mode,
  onChange,
  changeData,
  onLoadingData,
  onError,
}) => {
  const [dropdownOpenMonth, setDropdownOpenMonth] = useState(false);
  const [months, setMonths] = useState([""]);
  const [dropdownOpenYear, setDropdownOpenYear] = useState(false);
  const [dropdownOpenRegion, setDropdownOpenRegion] = useState(false);
  const [dropdownOpenAge, setDropdownOpenAge] = useState(false);
  const [genderFilter, setGenderFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState(2020);
  const [regions, setRegions] = useState([""]);
  const fetchRegions = async () => {
    let queryAllRegions = "/regions";

    console.log(configServer.urlServer + "" + queryAllRegions);
    const allRegions = await axios
      .get(serverUrl + "" + queryAllRegions)
      .catch((err) => {
        throw Error(err);
      });
    allRegions.data.push("");
    return allRegions.data;
  };
  const fetchMonths = async () => {
    let queryAllMonths = "/months/" + yearFilter;

    console.log(configServer.urlServer + "" + queryAllMonths);
    const allMonths = await axios
      .get(serverUrl + "" + queryAllMonths)
      .catch((err) => {
        throw Error(err);
      });
    allMonths.data.push("");
    return allMonths.data;
  };
  const fetchDataCovid = async () => {
    let result = undefined;
    let filter =
      "?gender=" +
      genderFilter +
      "&month=" +
      monthFilter +
      "&age=" +
      ageFilter +
      "&year=" +
      yearFilter +
      "&region=" +
      regionFilter;
    console.log(configServer.urlServer + "" + filter);
    result = await axios.get(serverUrl + "" + filter).catch((err) => {
      throw Error(err);
    });

    result.data.forEach((data) => {
      if (data.P_h) {
        data.P_h = parseInt(data.P_h);
      }
      if (data.P_f) {
        data.P_f = parseInt(data.P_f);
      }
      if (data.P) {
        data.P = parseInt(data.P);
        delete data.P_f;
        delete data.P_h;
      }
    });
    return result.data;
  };
  const monthQuery = useQuery(["fetchMonthsKey"], fetchMonths, {
    manual: true,
  });

  const regionsQuery = useQuery(["fetchRegionsQuery"], fetchRegions, {
    manual: true,
  });

  const dataCovidQuery = useQuery(["fetchDataCovidQuert"], fetchDataCovid, {
    manual: true,
  });

  const serverUrl =
    process.env.NODE_ENV === "production"
      ? configServer.urlServerProd
      : configServer.urlServer;

  const classAges = [
    { age: 0, text: "All age" },
    { age: 19, text: "10-19" },
    { age: 29, text: "20-29" },
    { age: 39, text: "30-39" },
    { age: 49, text: "40-49" },
    { age: 59, text: "50-59" },
    { age: 69, text: "60-69" },
    { age: 79, text: "70-79" },
    { age: 89, text: "80-89" },
    { age: 90, text: "90+" },
  ];

  useEffect(async () => {
    await monthQuery.refetch();
    await dataCovidQuery.refetch();
    await dataCovidQuery.refetch();

    try {
      setRegions(regionsQuery.data);
      setMonths(monthQuery.data);
      onChange(dataCovidQuery.data);
    } catch (err) {
      console.error(err);
    }
    changeData(
      !monthQuery.isError ||
        !regionsQuery.isError ||
        !monthQuery.isLoading ||
        !regionsQuery.isLoading ||
        !dataCovidQuery.isError ||
        !dataCovidQuery.isLoading
    );
    onLoadingData(
      !regionsQuery.isLoading ||
        !monthQuery.isLoading ||
        !dataCovidQuery.isLoading
    );
    onError(
      dataCovidQuery.isError || regionsQuery.isError || monthQuery.isError
    );
  }, [
    genderFilter,
    monthFilter,
    ageFilter,
    yearFilter,
    regionFilter,
    regionsQuery.data,
    monthQuery.data,
    dataCovidQuery.data,
  ]);

  const toggleMonth = () => setDropdownOpenMonth((prevState) => !prevState);

  const toggleYear = () => setDropdownOpenYear((prevState) => !prevState);

  const toggleRegion = () => setDropdownOpenRegion((prevState) => !prevState);

  const toggleAge = () => setDropdownOpenAge((prevState) => !prevState);

  const handleGenderFilter = async (e) => {
    setGenderFilter(e.target.value);
  };

  const handleMonthFilter = async (e) => {
    setMonthFilter(e.target.value);
  };

  const handleAgeFilter = async (e) => {
    setAgeFilter(e.target.value);
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

  function AgeSelect() {
    const listClassAge = classAges.map((age) => {
      return (
        <DropdownItem
          key={classAges.indexOf(age)}
          onClick={handleAgeFilter}
          value={age.age}
        >
          {age.text}
        </DropdownItem>
      );
    });
    return <DropdownMenu>{listClassAge}</DropdownMenu>;
  }

  return (
    <div className={`filter ${mode ? "dark" : "light"}`}>
      {
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
                    { gender: "All", value: "", key: 0, color: "#F51604" },
                    { gender: "Male", value: "h", key: 1, color: "#1014DE" },
                    { gender: "Female", value: "f", key: 2, color: "#C71585" },
                  ]}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Age</h2>
                <Dropdown isOpen={dropdownOpenAge} toggle={toggleAge}>
                  <DropdownToggle caret> {ageFilter}</DropdownToggle>
                  <AgeSelect />
                </Dropdown>
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
                    <DropdownItem
                      key={1}
                      onClick={handleYearFilter}
                      value={2020}
                    >
                      {2020}
                    </DropdownItem>

                    <DropdownItem
                      key={2}
                      onClick={handleYearFilter}
                      value={2021}
                    >
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
      }
    </div>
  );
};
