import {Button, Row, Col, Image, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    if(email!==""){
        console.log("email is: ",email);
    }
    if(password!==""){
        console.log("password is: ",password);
    }
    function handleLogin(e){
        e.preventDefault();
        console.log("submit was clicked!");
        if((email === "ayon@gmail.com") && (password === "ayon")){
            console.log("authenticated");
        }
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
      </Row>
    )
}