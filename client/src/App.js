import "./App.scss";
import { Header } from "./components/Header.js";
import { CovidInfoCard } from "./components/CovidInfoCard.js";
import { BrowserRouter, Route } from "react-router-dom";
import { Menu } from "./components/Menu.js";
import { TableComponent } from "./components/table/TableComponent.js";
import { HomePageComponent } from "./components/HomePageComponent.js";
import { Container, Row, Col } from "reactstrap";
import "./App.scss";
import React, { useState } from "react";
import { GraphicComponent } from "./components/GraphicComponent";

function App() {
  const [themeChanged, setTheme] = useState(() => {
    let theme = JSON.parse(window.localStorage.getItem("theme"));
    let themeExist = theme !== null;
    let lightMode = false;
    if (themeExist) {
      return theme;
    }
    return lightMode;
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeMode = (e) => {
    const changeTheme = !!e.target.checked;
    window.localStorage.setItem("theme", changeTheme);
    setTheme(changeTheme);
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`App ${themeChanged ? "dark" : "light"}`}>
      <Header
        onChange={handleChangeMode}
        mode={themeChanged}
        toggleMenu={handleMenu}
      />
      <BrowserRouter>
        <Container className="justify-content-left" fluid={true}>
          <Row>
            <Col
              className={`menu-col pl-0 col-12 ${
                isOpen ? "col-lg-2" : "col-lg-1"
              }`}
            >
              <Menu mode={themeChanged} isOpen={isOpen} />
            </Col>
            <Col className="content-col mt-3 col-10">
              <Row className="covid-info justify-content-center">
                <CovidInfoCard mode={themeChanged} name="totalCases" />
              </Row>
              <Row className="covid-content ml-5 mr-5">
                <Route exact path="/list">
                  <TableComponent mode={themeChanged} />
                </Route>
                <Route exact path="/graph">
                  <GraphicComponent mode={themeChanged} />
                </Route>
                <Route exact path="/">
                  <HomePageComponent mode={themeChanged} />
                </Route>
              </Row>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
