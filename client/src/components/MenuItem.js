import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";

export const MenuItem = ({name, url}) => {
    return (
        <NavLink className="menu-item bg-light text-dark border-bottom border-right" tag={Link} to={url}>
            <p>{name}</p>
        </NavLink>
    )
};
