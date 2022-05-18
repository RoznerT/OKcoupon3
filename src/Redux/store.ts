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


//const xyz = store.getState().catState.cats;

export type State = ReturnType<typeof store.getState>

export default store;