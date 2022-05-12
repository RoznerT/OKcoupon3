import { combineReducers, createStore } from "redux";
import { AuthReducer, AuthState } from "./AuthRedux";

//multiplicate reducers
//we will put here all our reducers :)
const reducers = combineReducers({authState:AuthReducer}); 
//for getting data from store in multi reducers type
const store = createStore(reducers);

export default store;