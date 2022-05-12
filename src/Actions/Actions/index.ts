import { ActionType } from "../ActionType";

interface LoginAction {
    type: ActionType.LOGIN;
    payload?:any;
}

interface AdminLoginAction {
    type: ActionType.ADMIN_LOGIN;
    payload?:any;
}

interface CustomerLoginAction {
    type: ActionType.CUSTOMER_LOGIN;
    payload?:any;

}

interface CompanyLoginAction {
    type: ActionType.COMPANY_LOGIN;
    payload?:any;

}

interface LogoutAction {
    type: ActionType.LOGOUT;
    payload?:any;
}

interface JwtUpdate {
    type: ActionType.JWT_UPDATE;
    payload?:string;
}


export type Action = 
| LoginAction
| AdminLoginAction
| CustomerLoginAction
| CompanyLoginAction
| LogoutAction
| JwtUpdate;
