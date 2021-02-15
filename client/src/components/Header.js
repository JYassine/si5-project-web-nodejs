import "./Header.css";
import { ToggleModeNight } from "./ToggleModeNight";

export const Header = ({ mode, onChange }) => {
  return (
    <header className="header-bar">
      <p className="app-title">COVID 19 INFO</p>
      <ToggleModeNight onChange={onChange} mode={mode}></ToggleModeNight>
    </header>
  );
};
