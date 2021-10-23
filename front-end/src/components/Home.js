import { Nav, Container, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import { useHistory } from 'react-router';
import Navigation from './Navigation';
import { deleteSession } from '../methods/deleteSession';
import { LogOut } from '../methods/logOut';
// const router = require('../routers/router');
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
    function logOut(){
        
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
    return(
        <Navigation/>
        
    )
}