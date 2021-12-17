// import UploadProfilePicture from '../methods/uploadProfilePicture';
import Navigation from './Navigation';
import { Container, Row, Col, Image, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import React, { useRef } from 'react';
import getProfilePictureURL from '../methods/getProfilePictureMethod';
import { useState } from 'react';
// import Cookies from 'universal-cookie/es6';
// const router = require('../routers/router');
// const cookies = new Cookies();


export default function Profile(){
    const profilePicture = useRef("")
    const [profilePictureUrl, setProfilePictureUrl] = useState("")
    if (profilePictureUrl === ""){
        console.log("came in profilePicture check === block")
        setProfilePictureUrl(getProfilePictureURL());
        console.log("return value from getProfilePictureURL method is: ",getProfilePictureURL())
        console.log("updated profile pic url is: ", profilePictureUrl)
    }
    
    function UploadProfilePicture(e, profilePicture){
        e.preventDefault();
        // console.log("upload profile pic!")
        // console.log("profilePicture value: ",profilePicture)
    }

    return(
        <div >
            <Navigation/>
            <Container className = "profilePage">
                <Row>
                    <Col className = "profilePictureBlock" lg = "3">
                        <Row className = "profilePicture">
                            <Image src = {profilePictureUrl} roundedCircle></Image>
                        </Row>
                        <div>
                            <br></br>
                        </div>
                        <Row>
                            <Col lg = "4">
                            </Col>
                            <input ref  = { profilePicture } type="file" name = "html input"/>
                            <Col lg = "4">
                                <Form>
                                    <Form.Group  controlId = "profilePicture" className = "profilePicture" style = {{"display": "block"}}>
                                        <Form.Label>Please upload profile picutre</Form.Label>
                                        <Form.Control type = "file"/>
                                    </Form.Group>
                                   
                                    <Button variant = "primary" onClick = {(e, profilePicture) => UploadProfilePicture(e, profilePicture)}> Upload </Button>
                                </Form>
                            </Col>
                            <Col lg = "4">
                            </Col>

                        </Row>
                    </Col>
                    <Col lg="1">
                    </Col>
                    <Col className = "profileDetails" lg = "6">
                        <Form>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" value={ "a12"} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                
            </Container>
        </div>
    )
}