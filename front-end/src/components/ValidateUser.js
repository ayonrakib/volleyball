import { useHistory } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie/es6";
const cookies = new Cookies();

export default function ValidateUser(){
    var session = cookies.get('session');
    const history = useHistory();
    axios({
        method: 'POST',
        url: 'http://localhost:8080/validate',
        data: {
            session: session
        }
    }).then(response => {
        console.log("cookie validation response is: ",response)
        if(!(response.data)){
            cookies.remove('session')
            history.push('/');
        }
    })
}
