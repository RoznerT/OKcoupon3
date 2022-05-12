import axios from "axios";
import store from "../Redux/store";

const jwtAxios = axios.create();


//request interceptor - מה אנו רוצים לבצע בכל שליחת בקשה לשרת
jwtAxios.interceptors.request.use(request=>{
    request.headers={"authorization":"Bearer "+store.getState().authState.jwt}
    return request;
});

jwtAxios.interceptors.response.use(response=>{
    store.getState().authState.jwt = response.headers.authorization;       
    return response;
});

export default jwtAxios;

