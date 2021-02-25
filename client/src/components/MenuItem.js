import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faChartBar, faMap, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import './MenuItem.scss';

export const MenuItem = ({ name, url, mode, isOpen }) => {
    const renderIcons = (url) => {
        switch (url) {
            case '/':
                return <FontAwesomeIcon icon={faHome} className="fa faHome" />
            case '/list':
                return <FontAwesomeIcon icon={faList} className="fa faList" />
            case '/graph':
                return <FontAwesomeIcon icon={faChartBar} className="fa faChartBar" />
            case '/map':
                return <FontAwesomeIcon icon={faMap} className="fa faMap" />
            case '/contact':
                return <FontAwesomeIcon icon={faEnvelopeOpen} className="fa faEnvelopeOpen" />
            default:
                console.log("MenuItem Error: url invalid");

        }
    }

    return (
        <NavLink className={`menu-item text-left
        ${mode ? 'dark' : 'light'}
        ${isOpen ? 'open' : 'closed'}`}
            tag={Link} to={url}>
            {renderIcons(url)}
            <span id="menu-text">{name}</span>
        </NavLink>
    )
};


