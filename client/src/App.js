
import './App.scss';
import { Header } from "./components/Header.js";
import { CovidInfoCard } from './components/CovidInfoCard.js';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './components/Menu.js';
import { Container, Row, Col } from 'reactstrap';
import "./App.scss";
import React, { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(true);

  const handleChangeMode = (e) => {
    const changeTheme = !!e.target.checked;
    window.localStorage.setItem("theme", changeTheme);
    setTheme(changeTheme);
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`App ${themeChanged ? "dark" : "light"}`}>
      <Header onChange={handleChangeMode} mode={themeChanged} toggleMenu={handleMenu} />
      <BrowserRouter>
        <Container className="justify-content-left" fluid={true}>
          <Row>
            <Col className="menu-col pl-0" md="2">
              <Menu mode={themeChanged} isOpen={isOpen} />
            </Col>
            <Col className="content-col mt-3" md="10">
              <Row className="covid-info justify-content-center">
                <CovidInfoCard mode={themeChanged}/>
              </Row>
              <Row className="covid-content ml-5 mr-5">
                <p>Liste, graph etc ici</p>
              </Row>
            </Col>
          </Row>


        </Container>

      </BrowserRouter>
    </div>
  );
}

export default App;
