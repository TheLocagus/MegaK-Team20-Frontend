import React from 'react';
import './App.css';
import {TestInterface} from 'types';

export const App = () => {

  const foo: TestInterface = {
    x: 5,
  }

  return (
      <div className="App">
        <h1>{foo.x}</h1>
      </div>
  );
}


