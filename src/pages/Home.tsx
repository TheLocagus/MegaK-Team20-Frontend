import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

export const Home = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><NavLink to={'available'}>Dostępni kursanci</NavLink></li>
                    <li><NavLink to={'conversations'}>Do rozmowy</NavLink></li>
                </ul>
            </nav>


            <Outlet/>
        </div>
    );
};

