import { combineReducers, createStore } from "redux";
import { couponsReducer } from "../Model/CouponModel";
import { AuthReducer, AuthState } from "./AuthRedux";

//multiplicate reducers
//we will put here all our reducers :)
const reducers = combineReducers({authState:AuthReducer, couponState: couponsReducer}); 
//for getting data from store in multi reducers type
const store = createStore(reducers);


//const xyz = store.getState().catState.cats;

export default store;