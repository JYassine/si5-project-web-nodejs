import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import './MenuItem.scss';

export const MenuItem = ({ name, url, mode }) => {
    return (
        <NavLink className={`menu-item text-center
        ${mode ? 'dark' : 'light'}`}
            tag={Link} to={url}>
            {name}
        </NavLink>
    )
};


