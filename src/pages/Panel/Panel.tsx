import React from 'react';
import {Outlet} from "react-router-dom";
import './Panel.scss'
import Header from "../../components/Header/Header";

export const Panel: React.FC = () => {
    return (
        <main>
            {/* <Header/> */}

            <Outlet/>
        </main>
    );
};

