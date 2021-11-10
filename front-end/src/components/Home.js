
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie/es6';
import Navigation from './Navigation';
import axios from 'axios';
import { useHistory } from 'react-router';
const cookies = new Cookies();
 

export default function Home(){
    const history = useHistory();
    var session = cookies.get('session');
    console.log("cookies in home url is: ",session)
    if((session === "") || (session === undefined)){
        history.push('/')
    }
    else if(session){
        console.log("existing session is: ",session);
        // how to use getUserWithEmail middleware here?
        axios({
            method: 'POST',
            url: 'http://localhost:8080/validate',
            data: {
                session: session
            }
        }).then(response => {
            if(!response){
                history.push('/login');
            }
            else{
                history.push('/home');
            }
        })
    }
    return(
        <div>
            <Navigation/>
        </div>
    )
}