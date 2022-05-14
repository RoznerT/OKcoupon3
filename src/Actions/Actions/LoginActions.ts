import { ActionType } from "../ActionType";

interface AdminLoginAction {
    type: ActionType.ADMIN_LOGIN;
    payload?: any;
}

interface CustomerLoginAction {
    type: ActionType.CUSTOMER_LOGIN;
    payload?: any;
}

interface CompanyLoginAction {
    type: ActionType.COMPANY_LOGIN;
    payload?: any;
}

interface LogoutAction {
    type: ActionType.LOGOUT;
    payload?: any;
}

interface JwtUpdate {
    type: ActionType.JWT_UPDATE;
    payload?: any;
}


export type Action = 
| AdminLoginAction
| CustomerLoginAction
| CompanyLoginAction
| LogoutAction
| JwtUpdate;
