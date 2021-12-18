// import UploadProfilePicture from '../methods/uploadProfilePicture';
import Navigation from './Navigation';
import { Container, Row, Col, Image, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import React, { useRef } from 'react';
import getProfilePictureURL from '../methods/getProfilePictureMethod';
import { useState } from 'react';
import Cookies from 'universal-cookie/es6';
// const router = require('../routers/router');
const cookies = new Cookies();


export default function Profile(){
    console.log("rebuilding dom")
    const profilePicture = useRef("")
    const [profilePictureUrl, setProfilePictureUrl] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [modifiedFirstName, setModifiedFirstName] = useState("");
    const [modifiedLastName, setModifiedLastName] = useState("");
    // const [fullProfileForm, setFullprofileForm] = useState(getFullProfileForm())
    var session = cookies.get('session')
    console.log("state firstName is: ",firstName);
    console.log("state lastName is: ",lastName)
    // const [password, setPassword] = useState("");
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

    getProfileDetails()

    // function getFullProfileForm(){
    //     console.log("getFullProfileForm called")
    //     console.log("state firstName in getFullProfileForm is: ",firstName)
    //     console.log("state lastName in getFullProfileForm is: ",lastName)
    //     return(
    //         <>
    //             <Form>
    //                 <Form.Group className="mb-3" controlId="formFirstName">
    //                     <Form.Label>First Name</Form.Label>
    //                     <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setModifiedFirstName(e.target.value)} />
    //                 </Form.Group>
    //                 <Form.Group className="mb-3" controlId="formLastName">
    //                     <Form.Label>Last Name</Form.Label>
    //                     <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setModifiedLastName(e.target.value)}/>
    //                 </Form.Group>
    //                 <Form.Group className="mb-3" controlId="formBasicEmail">
    //                     <Form.Label>Email address</Form.Label>
    //                     <Form.Control type="email" placeholder="Enter email" readOnly value={email}/>
    //                     <Form.Text className="text-muted">
    //                     We'll never share your email with anyone else.
    //                     </Form.Text>
    //                 </Form.Group>

    //                 <Row>
    //                     <Col>
    //                         <Button variant="secondary" type="button" onClick={showEditProfileForm}>
    //                             Edit
    //                         </Button>
    //                     </Col>
    //                 </Row>

    //             </Form>
    //         </>
    //     )
    // }

    function getProfileDetails(){
        console.log("came in getProfileDetails method");
        var session = cookies.get('session');
        console.log("session is: ",session)
        axios({
            method: "POST",
            url: "http://localhost:8080/get-profile-details",
            data: {
                session: session
            }
        }).then(response => {
            console.log("firstname response from get-profile-details url is: ",response.data.data.firstName)
            console.log("lastName response from get-profile-details url is: ",response.data.data.lastName)
            console.log("email response from get-profile-details url is: ",response.data.data.email)
            if (firstName === ""){
                setFirstName(response.data.data.firstName)
            }
            if(lastName === ""){
                setLastName(response.data.data.lastName)
            }
            if(email === ""){
                setEmail(response.data.data.email)
            }
        })
    }

    function editProfile(e){
        e.preventDefault();
        console.log("came in edit profile method")
        console.log("firstName is: ",modifiedFirstName)
    }

    // function goBackToFullProfileForm(){
    //     setFullprofileForm(getFullProfileForm())
    // }

    // function showEditProfileForm(e){
    //     e.preventDefault();
    //     console.log("showEditProfileForm button is clicked!")
    //     console.log("state firstName in showEditProfileForm method is: ",firstName)
    //     console.log("state lastName in showEditProfileForm method is: ",lastName)
    //     setFullprofileForm(<>
    //         <Form onSubmit={editProfile}>
    //             <Form.Group className="mb-3" controlId="formFirstName">
    //                 <Form.Label>First Name</Form.Label>
    //                 <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setModifiedFirstName(e.target.value)} />
    //             </Form.Group>
    //             <Form.Group className="mb-3" controlId="formLastName">
    //                 <Form.Label>Last Name</Form.Label>
    //                 <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setModifiedLastName(e.target.value)}/>
    //             </Form.Group>
    //             <Row>
    //                 <Col sm="2">
    //                     <Button variant="primary" type="submit">
    //                         Save
    //                     </Button>   
    //                 </Col>
    //                 <Col>
    //                     <Button variant="secondary" type="button" onClick={goBackToFullProfileForm}>
    //                         Back
    //                     </Button>
    //                 </Col>
    //             </Row>

    //         </Form>
    //     </>)
    // }
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
                        <>
                            <Form>
                                <Form.Group className="mb-3" controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setModifiedFirstName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setModifiedLastName(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" readOnly value={email}/>
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                {/* <Row>
                                    <Col>
                                        <Button variant="secondary" type="button" onClick={showEditProfileForm}>
                                            Edit
                                        </Button>
                                    </Col>
                                </Row> */}

                            </Form>
                        </>
                    </Col>
                </Row>
                
            </Container>
        </div>
    )
}