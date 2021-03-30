import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";


ReactDOM.render(
  // StateProvider wraps our app creating a data layout and we can pull data from it from any component
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}><App /></StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

