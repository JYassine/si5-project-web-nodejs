import { Nav, NavItem } from 'reactstrap';
import {useState} from 'react';
import {MenuItem} from "./MenuItem.js";
import './Menu.scss';

export const Menu = ({isOpen, mode}) => {
    const [listItems] = useState([
        {
            name: "Accueil",
            url: '/',
            id: 1
        },
        {
            name: "Liste",
            url: '/list',
            id: 2
        },
        {
            name: "Graphiques",
            url: '/graph',
            id: 3
        },
        {
            name: "Carte",
            url: '/map',
            id: 4
        }
    ]);

    return (
        <div className={`menu ${mode ? 'dark' : 'light'}`}>
            <Nav vertical className="list-unstyled justify-content-right" >
                {listItems.map(item => 
                <NavItem key={item.id}>
                    <MenuItem name={item.name} url={item.url} mode={mode}/>
                </NavItem>)}
            </Nav>
        </div>
    )
};
