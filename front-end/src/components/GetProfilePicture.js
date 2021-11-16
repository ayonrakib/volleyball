import axios from "axios";
import Cookies from "universal-cookie/es6";
const cookies = new Cookies();

export default function GetProfilePicture(){
    const session = cookies.get('session');
    axios({
        method: 'GET',
        url: "http://localhost:8080/get-profile-picture",
        data: {
            session: session
        }
    })
}