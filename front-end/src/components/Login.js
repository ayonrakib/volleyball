import React from 'react';
import {Button, Row, Col, Image, Form, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Cookies from 'universal-cookie/es6';
import GetModal from './GetModal';
// import { response } from 'express';
const cookies = new Cookies();

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalShow, setModalShow] = React.useState(false);
    const [modalHeading, setModalHeading] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const history = useHistory();
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
            console.log("response in login validate is: ",response)
            if(!(response.data)){
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
        if((email === "") && (password === "")){
            setModalHeading("Error!");
            setModalTitle("Email and password both empty!")
            setModalBody("PLEASE INSERT VALID USERNAME AND PASSWORD!")
            setModalShow(true);
        }
        else if(email === ""){
            setModalHeading("Error!");
            setModalTitle("Username is empty!")
            setModalBody("PLEASE INSERT VALID USERNAME!")
            setModalShow(true);
        }
        else if(password === ""){
            setModalHeading("Error!");
            setModalTitle("Password field is empty!")
            setModalBody("PLEASE INSERT VALID PASSWORD!")
            setModalShow(true);
        }

        axios({
            method: 'post',
            url: 'http://localhost:8080/authenticate',
            data: {
                email: email,
                password: password
            }
        }).then(response =>{
            if (response.data.data) {
                console.log("session id is: ",response.data.data);
                cookies.set('session',response.data.data,{expires: new Date(Date.now()+1000000000)});
                history.push('/home');
            } else {
                console.log("user is NOT authenticated!");
                setModalHeading("Error!");
                setModalTitle("Wrong username or password!")
                setModalBody("PLEASE INSERT CORRECT USERNAME OR PASSWORD!")
                setModalShow(true);
                
            }
        })
    }
    function createUser(e){
        e.preventDefault();
        console.log("entered create user method")
        history.push('/register')
    }
    return (
            <Container className = "loginForm">
                <GetModal show={modalShow} onHide={() => setModalShow(false)} modalHeading={modalHeading} modalTitle={modalTitle} modalBody={modalBody}/>
                <Row className="justify-content-md-center marginTop">
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
                            <div>
                                <div className = "similarRowButtons">
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button> 
                                </div>
                                <div className = "similarRowButtons">
                                    <Button variant="primary" type="submit" onClick = {createUser}>
                                        Create User
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>

    )
}