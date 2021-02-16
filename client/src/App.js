
import './App.scss';
import { Header } from "./components/Header.js";
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './components/Menu.js';
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
  const handleChangeMode = (e) => {
    const changeTheme = !!e.target.checked;
    window.localStorage.setItem("theme", changeTheme);
    setTheme(changeTheme);
  };
  return (
    <div className={`App ${themeChanged ? "dark" : "light"}`}>
      <Header onChange={handleChangeMode} mode={themeChanged} />
      <BrowserRouter>
        <Menu mode={themeChanged}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
