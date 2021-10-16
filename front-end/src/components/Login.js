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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
            <Col>
                {userStatus}
            </Col>
      </Row>
    )
}