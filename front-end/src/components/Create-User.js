import {Button, Row, Col, Image, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Cookies from 'universal-cookie/es6';
const cookies = new Cookies();

export default function CreateUser(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    function goBackToLogin(e){
        e.preventDefault();
        history.push('/')

    }
    
    function createUser(e){
        e.preventDefault();
        console.log("User created");
        console.log("first name is: ",firstName);
        console.log("last name is: ",lastName);
        console.log("email is: ",email);
        console.log("password is: ",password);
        if ((firstName !== "") && (lastName !== "") && (email !== "") && (password !== "")) {
            axios({
                method: 'POST',
                url: 'http://localhost:8080/register',
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }
            }).then(response => {
                console.log("response from registering user is: ",response.data.data);
                cookies.set('session',response.data.data);
                history.push('/home');
            }) 
        } else {
            
        }

    }
    
    return (
        <Row className = "justify-content-md-center">
            <Col lg="6">
                <Image style= {{width:"30rem"}} src = {process.env.PUBLIC_URL + "/images/volleyball.png"} ></Image>
            </Col>
            <Col lg="5">
                <Form onSubmit = {createUser}>
                    <Form.Group className = "mb-3" controlId = "formBasicFirstName">
                        <Form.Label> First Name</Form.Label>
                        <Form.Control type = "text" placeholder = "First Name" onChange = {(e) => setFirstName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className = "mb-3" controlId = "formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' placeholder = "Last name" onChange = {(e) => setLastName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className = "mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder = "Enter email" onChange = {(e) => setEmail(e.target.value)}></Form.Control>
                        <Form.Text className = "text-muted">
                            We will never share you email with anyone else
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className = "mb-3" controlId = "formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type = "password" placeholder = "password" onChange = {(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    <div>
                        <div className = "similarRowButtons">
                            <Button variant="primary" type="submit">Create</Button>
                        </div>
                        <div className = "similarRowButtons">
                            <Button variant="primary" type="submit" onClick = {goBackToLogin}>Back to login</Button>
                        </div>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}