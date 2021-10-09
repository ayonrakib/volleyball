import {Button, Row, Col, Image, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isUserCreated, setIsUserCreated] = useState("user not authenticated");
    if(email!==""){
        console.log("email is: ",email);
    }
    if(password!==""){
        console.log("password is: ",password);
    }
    function handleLogin(e){
        e.preventDefault();
        console.log("submit was clicked!");
        fetch("http://localhost:8080/authenticate",{
            method: 'POST',
            headers:{
                'Content-type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({email: email, password: password})
        }).then(res => res.json()).then(response => {
            if(response){
                setIsUserCreated("User authenticated!");
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
                {isUserCreated}
            </Col>
      </Row>
    )
}