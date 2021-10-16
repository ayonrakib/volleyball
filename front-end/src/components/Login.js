import {Button, Row, Col, Image, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Cookies from 'universal-cookie/es6';
// import { response } from 'express';
const cookies = new Cookies();

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userStatus, setuserStatus] = useState("user didnt login!");
    const history = useHistory();
    if(email!==""){
        console.log("email is: ",email);
        
    }
    if(password!==""){
        console.log("password is: ",password);
    }
    var session = cookies.get('session');
    console.log("cookie in login react is: ",session);
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
                history.push('/');
            }
            else{
                history.push('/home');
            }
        })
    }
    function handleLogin(e){
        e.preventDefault();
        
        console.log("submit was clicked!");
        axios({
            method: 'post',
            url: 'http://localhost:8080/authenticate',
            data: {
                email: email,
                password: password
            }
        }).then(response =>{
            if (response.data.data) {
                console.log("user is authenticated!");
                // cookies.set('session',response.data.data)
                console.log("session id is: ",response.data.data);
                cookies.set('session',response.data.data);
                history.push('/home');
            } else {
                console.log("user is NOT authenticated!");
                setuserStatus("user is NOT authenticated!");
            }
        })
    }
    function createUser(e){
        e.preventDefault();
        console.log("entered create user method")
    }
    return (
        <Row className="justify-content-md-center">
            <Col lg="6">
                <Image style = {{width:"30rem"}} src = {process.env.PUBLIC_URL + "/images/volleyball.png"}></Image>
            </Col>
            
            <Col lg="5">
                <Form onSubmit = {handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange = {(e) => setEmail(e.target.value)}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange = {(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Row>
                        <Col sm="2">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Col>
                        <Col sm="3">
                            <Button variant="primary" type="submit" onClick = {createUser}>
                                Create User
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col>
                {userStatus}
            </Col>
      </Row>
    )
}