import axios from "axios";
import { deleteSession } from "./deleteSession";
import Cookies from "universal-cookie/es6";
const cookies = new Cookies();


export function LogOut(history){
    console.log('logout!');
        console.log("session id from cookie is: ",cookies.get('session'));
        axios({
            method: 'POST',
            url: 'http://localhost:8080/logout',
            data:{
                session: cookies.get('session')
            } 
        }).then(response =>{
            console.log("response from logout isL: ",response.data);
            if (response.data.data) {
                history.push('/');
            } else {
                console.log(response.data.error.errorMessage);
            }
            deleteSession();
        })
}