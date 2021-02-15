import React, { useState } from "react";
import "./App.scss";
import { Header } from "./components/Header.js";

function App() {
  const [themeChanged, setTheme] = useState(() => {
    return JSON.parse(window.localStorage.getItem("theme"));
  });
  const handleChangeMode = (e) => {
    console.log(e.target.checked);
    const changeTheme = !!e.target.checked;
    window.localStorage.setItem("theme", changeTheme);
    setTheme(changeTheme);
  };
  return (
    <div className={`App ${themeChanged ? "dark" : "light"}`}>
      {console.log("heyyyooo" + window.localStorage.getItem("theme"))}
      <Header onChange={handleChangeMode} mode={themeChanged} />
    </div>
  );
}

export default App;
