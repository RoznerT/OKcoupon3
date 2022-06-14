import { ActionType } from "../Actions/ActionType";

//app state
export class AuthState {
  public userName: string = "";
  //public userPass: string = "";
  public clientType: string = "";
  public jwt: string = "";
}

//Action
export interface AuthAction {
  type: ActionType;
  payload?: any;
}

//functions for different actions
export function tryAdminLogin(cred: AuthState): AuthAction {
  return { type: ActionType.ADMIN_LOGIN, payload: cred };
}

export function tryCustomerLogin(cred: AuthState): AuthAction {
  return { type: ActionType.CUSTOMER_LOGIN, payload: cred };
}

export function tryCompanyLogin(cred: AuthState): AuthAction {
  return { type: ActionType.COMPANY_LOGIN, payload: cred };
}

export function tryLogout(): AuthAction {
  return { type: ActionType.LOGOUT, payload: null };
}

export function tryJwtUpdate(jwt: string): AuthAction {
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
      newState.userName=action.payload.userName;
      newState.jwt=action.payload.jwt;
      newState.clientType = "ADMIN";
      const userLogged = {
        userName: action.payload.userName,
        jwt: action.payload.jwt,
        clientType: "ADMIN",
      }
      localStorage.setItem('token', action.payload.jwt)
      localStorage.setItem('clientType', "ADMIN")
      //localStorage.setItem('userLogged', JSON.stringify(userLogged))
      /*
      const userData = JSON.parse(localStorage.getItem('userLogged')!);
      console.log('userData: ', userData.jwt)
      */
      break;

    case ActionType.COMPANY_LOGIN:
      newState.userName = action.payload.userName;
      newState.jwt=action.payload.jwt;
      newState.clientType = "COMPANY";
      localStorage.setItem('token', action.payload.jwt)
      localStorage.setItem('clientType', "COMPANY")
      break;

    case ActionType.CUSTOMER_LOGIN:
      newState.userName = action.payload.userName;
      newState.jwt=action.payload.jwt;
      newState.clientType = "CUSTOMER";
      localStorage.setItem('token', action.payload.jwt)
      localStorage.setItem('clientType', "CUSTOMER")
      break;

    case ActionType.LOGOUT:
      newState.jwt = "user Logged out";
      localStorage.setItem('token', "user Logged out");
      localStorage.setItem('clientType', "guest");
      //localStorage.setItem('userLogged', JSON.stringify(action.payload))
      break;

    case ActionType.JWT_UPDATE:
      newState.jwt=action.payload.jwt;
      newState.clientType="guest";
      localStorage.setItem('token', action.payload.jwt)
      break;
  }

  return newState;
  
}

