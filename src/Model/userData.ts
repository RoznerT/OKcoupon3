
export class UserData{
    public userName: string;
    public jwt: string;
    public isLogged:boolean;

    constructor(userName: string, jwt: string, isLogged: boolean){
        this.userName = userName;
        this.jwt = jwt;
        this.isLogged = isLogged;
    }
}

//need userId?
