import React, { createContext, useContext, useReducer} from "react";

export const StateContext = createContext();// this is where our data layout lives (creating the data layout)

export const StateProvider = ({reducer, initialState, children}) => ( // this is called higher order component
    // this help us to set-up our data layout
    <StateContext.Provider value = {useReducer(reducer, initialState)}>{children}</StateContext.Provider> // children is the App component which we passed in index.js file
);

export const useStateValue = () => useContext(StateContext); // allow us to pull information from the data layout