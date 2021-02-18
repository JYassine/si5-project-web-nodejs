import { Nav, NavItem, Collapse } from 'reactstrap';
import { useState } from 'react';
import { MenuItem } from "./MenuItem.js";
import './Menu.scss';

export const Menu = ({ isOpen, mode }) => {
    const [collapse, setCollapse] = useState(false);
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

    // const toggle = () => {
    //     setCollapse(!collapse);
    // }

    return (
        <div className={`menu ${mode ? 'dark' : 'light'} ${isOpen ? 'open' : 'closed'}`}>
            {/* <Collapse isOpen={collapse}> */}
            <Nav vertical className="list-unstyled" >
                {listItems.map(item =>
                    <NavItem key={item.id}>
                        <MenuItem name={item.name} url={item.url} mode={mode} isOpen={isOpen}/>
                    </NavItem>)}
            </Nav>
            {/* </Collapse> */}

        </div>
    )
};
