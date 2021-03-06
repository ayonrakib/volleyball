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
    const [profilePicture, setProfilePicture] = useState("");
    const history = useHistory();
    function goBackToLogin(e){
        e.preventDefault();
        history.push('/')

    }
    
    function assignProfilePicture(e){
        e.preventDefault();
        console.log("file name is: ",e.target.files[0])
        setProfilePicture(e.target.files[0])
    }

    function createUser(e){
        e.preventDefault();
        console.log("User create method");
        console.log("first name is: ",firstName);
        console.log("last name is: ",lastName);
        console.log("email is: ",email);
        console.log("password is: ",password);
        console.log("profile pic is: ",profilePicture)
        var formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profilePicture", profilePicture);
        if ((firstName !== "") && (lastName !== "") && (email !== "") && (password !== "") && (profilePicture !== "")) {
            axios({
                method: 'POST',
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                url: 'http://localhost:8080/register',
                data: formData
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
                    <Form.Group className = "mb-3" controlId = "formBasicFirstName" aria-required = "true">
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
                    <Form.Group controlId="formFile" className="mb-3" onChange = {(e) => assignProfilePicture(e)}>
                        <Form.Label>Default file input example</Form.Label>
                        <Form.Control type="file" />
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