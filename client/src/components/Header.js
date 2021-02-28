import "./Header.scss";
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ToggleModeNight } from "./ToggleModeNight";

export const Header = ({ mode, onChange, toggleMenu }) => {
  return (
    <header className="header-bar">
      <Button className="menu-button shadow-none" size="lg" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className="fa faBars" />
      </Button>
      <p className="app-title">COVID 19 INFO</p>
      <ToggleModeNight onChange={onChange} mode={mode}></ToggleModeNight>
    </header>
  );
};
