import { Notyf } from "notyf";

class Notify{
    private notification = new Notyf({duration:4000,position:{x:"center" , y:"top"}})

    public success(message:string){
        this.notification.success(message);
    }

    public error(message:string){
        console.log("error notify");
        this.notification.error(message);
    }
}

//create instance of our Notify Class
const notify = new Notify();

export default notify;