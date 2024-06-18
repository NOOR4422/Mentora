import React from 'react';
import { items } from "../../data/items";
import "./Sidebar.css";
import { Link } from 'react-router-dom';

function Sidebar() {
    console.log(window.location.pathname);
    return (
        <div className='sidebar'>
            <ul>
                {items.map(item => (
                    <Link to={item.item_name2?  `/${item.item_name}%20${item.item_name2}`   :`/${item.item_name}`} key={item.id}>
                        <li className={window.location.pathname === `/${item.item_name}`| window.location.pathname === `/${item.item_name}%20${item.item_name2}`  ? 'active' : ''} >
                            {window.location.pathname === `/${item.item_name}`| window.location.pathname === `/${item.item_name}%20${item.item_name2}` ? item.icon2 : item.icon}
                            <p>{item.item_name}  {item.item_name2?item.item_name2:''}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
