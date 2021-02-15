import { Nav, NavItem, NavLink } from 'reactstrap';
import {useState} from 'react';
import {MenuItem} from "./MenuItem.js";

export const Menu = ({isOpen}) => {
    const [listItems] = useState([
        {
            name: "Liste",
            url: '/list'
        },
        {
            name: "Graphiques",
            url: '/graph'
        },
        {
            name: "Carte",
            url: '/carte'
        }
    ]);

    return (
        <div className="menu">
            <p>Navigation</p>
            <Nav vertical className="list-unstyled pb-3" >
                {listItems.map(item => 
                <NavItem>
                    <MenuItem name={item.name} url={item.url}/>
                </NavItem>)}
            </Nav>
        </div>
    )
};
