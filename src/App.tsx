import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {AvailableStudents} from "./pages/AvailableStudents";
import {Conversations} from "./pages/Conversations";

export const App = () => {

  return (
    <BrowserRouter>
      <Routes>
          <Route path={'/'} element={<Home/>}>
            <Route path={'available'} element={<AvailableStudents/>}/>
            <Route path={'conversations'} element={<Conversations/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}


