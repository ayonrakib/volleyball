import Cookies from "universal-cookie/es6";
const cookies = new Cookies();

export function deleteSession(){
    cookies.set('session',"");
}