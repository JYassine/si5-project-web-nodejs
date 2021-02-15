import React, { useState } from "react";
import "./App.scss";
import { Header } from "./components/Header.js";

function App() {
  const [themeChanged, setTheme] = useState(() => {
    return JSON.parse(window.localStorage.getItem("theme"));
  });
  const handleChangeMode = (e) => {
    const changeTheme = !!e.target.checked;
    window.localStorage.setItem("theme", changeTheme);
    setTheme(changeTheme);
  };
  return (
    <div className={`App ${themeChanged ? "dark" : "light"}`}>
      <Header onChange={handleChangeMode} mode={themeChanged} />
    </div>
  );
}

export default App;
