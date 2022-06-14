import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, createStore } from "redux";
import { AuthReducer, AuthState } from "./AuthRedux";
import { couponsReducer } from "./CouponRedux";

//multiplicate reducers
//we will put here all our reducers :)
// const reducers = combineReducers({authState:AuthReducer, couponState: couponsReducer}); 
//for getting data from store in multi reducers type
const store = configureStore({
    reducer: {
        authState: AuthReducer,
        couponState: couponsReducer
    }
});

//to get the state of state
export type State = ReturnType<typeof store.getState>

export default store;


//store.subscribe(() => {saveState(store.getState())})

// function saveState(arg0: { authState: AuthState; couponState: import("./CouponRedux").CouponAppState; }) {
//     throw new Error("Function not implemented.");
// }
