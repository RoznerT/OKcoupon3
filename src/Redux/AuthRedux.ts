import { ActionType } from "../Actions/ActionType";
import { UserCred } from "../Model/UserCred";

//app state
export class AuthState {
  public userName: string = "";
  //public userPass: string = "";
  //public clientType: string = "";
  public jwt: string = "";
}

//Action
export interface AuthAction {
  type: ActionType;
  payload?: any;
}

//functions for different actions
export function tryAdminLogin(cred: UserCred): AuthAction {
  return { type: ActionType.ADMIN_LOGIN, payload: cred };
}

export function tryCustomerLogin(cred: UserCred): AuthAction {
  return { type: ActionType.CUSTOMER_LOGIN, payload: cred };
}

function tryCompanyLoginLogin(cred: UserCred): AuthAction {
  return { type: ActionType.COMPANY_LOGIN, payload: cred };
}

function tryLogout(): AuthAction {
  return { type: ActionType.LOGOUT, payload: null };
}

function tryJwtUpdate(jwt: string): AuthAction {
  return { type: ActionType.JWT_UPDATE, payload: jwt };
}

//reducer
export function AuthReducer(
  currentState: AuthState = new AuthState(),
  action: AuthAction
): AuthState {
  //get a copy of current state
  const newState = { ...currentState };

  switch (action.type) {
    case ActionType.ADMIN_LOGIN:
      
      break;

    case ActionType.COMPANY_LOGIN:
      //do somthing

      break;

    case ActionType.CUSTOMER_LOGIN:
      //do somthing

      break;

    case ActionType.LOGOUT:
      //newState.jwt = "";

      break;

    case ActionType.JWT_UPDATE:
      //newState.jwt = action.payload;
      //console.log("redux have a new JWT token");
      break;
  }

  return newState;
  
}

