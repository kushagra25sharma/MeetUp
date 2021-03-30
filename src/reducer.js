// initial state defines how the data layout looks initially when the app starts
export const initialState = { user: null }; // we want the user to be logged out when we start the app

// the actions help us to push information in data layout we do it by using dispatch
export const actionTypes = { SET_USER: "SET_USER" };


const reducer = (state, action) => {
    //console.log(action);
    // whatever we return shows how we intend to change the state of data layout
    switch (action.type){
        case actionTypes.SET_USER:
            return {...state, user: action.user,};// keep everything as it is in the state and just change the user to what we have dispatch
        default:
            return state;
    }
};

export default reducer;