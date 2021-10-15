// import {Button, Row, Col, Image, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
const cookies = new Cookies();


export default function Home(){
    function deleteSession(){
        cookies.set('session',"");
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
            console.log("response from logout isL: ",response)
            deleteSession();
        })
        
    }
    return(
        <div>
            Hello world!
            <button type = "button" onClick={logOut}>Log out!</button>
        </div>
        
    )
}