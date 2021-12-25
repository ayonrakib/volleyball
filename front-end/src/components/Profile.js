// import UploadProfilePicture from '../methods/uploadProfilePicture';
import Navigation from './Navigation';
import { Container, Row, Col, Image, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import React, { useRef } from 'react';
// import getProfilePictureURL from '../methods/getProfilePictureMethod';
import { useState } from 'react';
import Cookies from 'universal-cookie/es6';
import GetFullProfileForm from './FullProfileForm';
import GetEditProfileForm from './GetEditProfileForm';
import GetModalForBadprofileInputs from './GetModalForBadprofileInputs';
// const router = require('../routers/router');
const cookies = new Cookies();


export default function Profile(){
    // console.log("rebuilding dom")
    const profilePicture = useRef("")
    const [profilePictureUrl, setProfilePictureUrl] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [modifiedFirstName, setModifiedFirstName] = useState("");
    const [modifiedLastName, setModifiedLastName] = useState("");
    const [needToLoadEditProfileForm, setNeedToLoadEditProfileForm] = useState(false);
    const showModalReference = React.createRef();
    const [modalBodyText, setModalBodyText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [stateForCurrentTime, setStateForCurrentTime] = useState(Date.now());
    var session = cookies.get('session')
    // console.log("state firstName is: ",firstName);
    // console.log("state lastName is: ",lastName)
    // const [password, setPassword] = useState("");
    if (profilePictureUrl === ""){
        console.log("came in profilePicture check === block")
        console.log("return value from getProfilePictureURL method is: ",getProfilePictureURL())
        console.log("updated profile pic url is: ", profilePictureUrl)
    }
    
    function UploadProfilePicture(e, profilePicture){
        e.preventDefault();
        // console.log("upload profile pic!")
        // console.log("profilePicture value: ",profilePicture)
    }
    
    function getProfilePictureURL(){
        console.log("came in getProfilePictureURL method")
        axios({
            method: "GET",
            url: "http://localhost:8080/get-profile-picture-url",
            data: ""
        }).then(response => {
            console.log("profile picture url from getProfilePictureURL is: ",response.data.data)
            if(profilePictureUrl === ""){
                setProfilePictureUrl(response.data.data)
            }
        })
    }

    getProfileDetails()

    function getProfileDetails(){
        // console.log("came in getProfileDetails method");
        var session = cookies.get('session');
        // console.log("session is: ",session)
        axios({
            method: "POST",
            url: "http://localhost:8080/get-profile-details",
            data: {
                session: session
            }
        }).then(response => {
            // console.log("firstname response from get-profile-details url is: ",response.data.data.firstName)
            // console.log("lastName response from get-profile-details url is: ",response.data.data.lastName)
            // console.log("email response from get-profile-details url is: ",response.data.data.email)
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

    function saveEditedProfileInfo(e){
        e.preventDefault();
        // console.log("came in saveEditedProfileInfo method")
        // console.log("firstName is: ",modifiedFirstName)
        // console.log("last name is: ",modifiedLastName)
        axios({
            method: "POST",
            url: "http://localhost:8080/save-profile-details",
            data:{
                firstName: modifiedFirstName,
                lastName: modifiedLastName,
                session: session
            }
        }).then(response => {
            // console.log("response from save-edited-profile-info is: ",response.data.data)
            // console.log("error message is: ",response.data.message.errorMessage)
            if(response.data.message.errorCode === 1000){
                // console.log("Please insert a valid first name!")
                setModalBodyText(response.data.message.errorMessage)
                setShowModal(true);
                setStateForCurrentTime(Date.now())
            }
            if(response.data.message.errorCode === 2000){
                // console.log("Please insert a valid last name!")
                setModalBodyText(response.data.message.errorMessage)
                setShowModal(true);
                setStateForCurrentTime(Date.now())
            }
        })
    }

    function toggleNeedToLoadEditProfileFormState(){
        if(needToLoadEditProfileForm){
            setNeedToLoadEditProfileForm(false);
        }
        else{
            setNeedToLoadEditProfileForm(true);
        }
        
        // console.log("needToLoadEditProfileForm state is: ", needToLoadEditProfileForm)
    }

    function getProfileForm(){
        var profileForm = "";
        if (needToLoadEditProfileForm === false) {
            profileForm = <GetFullProfileForm toggleNeedToLoadEditProfileFormState = {toggleNeedToLoadEditProfileFormState} firstName = {firstName} lastName = {lastName} email = {email}/>;
        }
        else{
            profileForm = <GetEditProfileForm toggleNeedToLoadEditProfileFormState = {toggleNeedToLoadEditProfileFormState} firstName = {modifiedFirstName} lastName = {modifiedLastName} saveEditedProfileInfo = {saveEditedProfileInfo}
                                              setModifiedFirstName = {setModifiedFirstName} setModifiedLastName = {setModifiedLastName}/>
        }
        return profileForm;
    }


    // console.log("showModal state before return is: ",showModal)
    return(
        <div >
            <Navigation/>
            <Container className = "profilePage">
                <Row>
                    <Col className = "profilePictureBlock" lg = "3">
                        <Row className = "profilePicture" ref={profilePicture}>
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
                        {getProfileForm()}
                        <GetModalForBadprofileInputs showModal = {showModal} modalBodyText = {modalBodyText} key = {stateForCurrentTime}/>
                    </Col>
                </Row>
                       
            </Container>
        </div>
    )
}