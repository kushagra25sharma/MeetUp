import React, { createContext, useContext, useReducer} from "react";

export const StateContext = createContext();// this is where our data layout lives (creating the data layout) creating the context

export const StateProvider = ({reducer, initialState, children}) => ( // this is called higher order component
    // this help us to set-up our data layout
    // it contains single prop called value which is stored in context and that value is available to all the components present in the children prop(we will be render those components)
    <StateContext.Provider value = {useReducer(reducer, initialState)}>{children}</StateContext.Provider> // children is the App component which we passed in index.js file
            // useReducer takes 2 parameters reducer and action and returns an array containing state and dispatch
            // whenever action changes the reducer will return a new state
);

export const useStateValue = () => useContext(StateContext); // allow us to pull information from the data layout