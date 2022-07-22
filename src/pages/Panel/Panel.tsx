import React from 'react';
import {Outlet} from "react-router-dom";
import './Panel.scss'

export const Panel = () => {
    return (
        <div>


            <Outlet/>
        </div>
    );
};

