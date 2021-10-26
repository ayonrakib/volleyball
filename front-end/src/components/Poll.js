// import Navigation from "./Navigation"
import { Container, Row, Col } from "react-bootstrap"
import YesPollBar from "./YesPollBar"
import NoPollBar from "./NoPollBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
const cookies = new Cookies()


export default function Poll(){
    function handleCheckBox(e){
        var isChecked = e.target.checked;
        var id = e.target.id
        console.log(isChecked)
        console.log(id)
        var session = cookies.get('session')
        console.log("cookies is: ",session)
        axios({
            method: 'POST',
            url: "http://localhost:8080/get-user-with-poll-choice",
            data:{
                session: session
            }
        }).then(response =>{
            console.log("response from get-user-with-poll-choice is: ",response)
            if (response !== null) {
                var user = response.data;
                console.log("found user with session in Poll: ",response.data)
                axios({
                    method: 'POST',
                    url: 'http://localhost:8080/save-selection-in-poll-database',
                    data:{
                        user: user,
                        id: id,
                        isChecked: isChecked
                    }
                }).then(response => {
                    console.log("response from save-selection-in-poll-database is: ",response)
                })
            } else {
                console.log("could not find user in Poll")
            }
        })
    }
    return (
        <Container>
            <div className="text-center">
                Let's play Volleyball on Monday 10/28 at Cedar Park from 8-10 pm
            </div>
            
            <br/> <br/> <br/>
            <Row>
                <Col sm="1" className="text-center">
                    <input id = "1" type="checkbox" onClick = {(e) => handleCheckBox(e)}/>
                </Col>
                <Col sm="2" className="text-center">
                    Yes
                </Col>
                <Col sm = "9">
                    <YesPollBar/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col sm="1" className="text-center">
                    <input id="1" type="checkbox" onClick = {(e) => handleCheckBox(e)}/>
                </Col>
                <Col sm="2" className="text-center">
                    No
                </Col>
                <Col sm = "9">
                    <NoPollBar/>
                </Col>
            </Row>
        </Container>
    )
}