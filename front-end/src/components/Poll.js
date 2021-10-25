// import Navigation from "./Navigation"
import { Container, Row, Col } from "react-bootstrap"
import YesPollBar from "./YesPollBar"
import NoPollBar from "./NoPollBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from "react";

export default function Poll(){
    return (
        <Container>
            <div className="text-center">
                Let's play Volleyball on Monday 10/28 at Cedar Park from 8-10 pm
            </div>
            
            <br/> <br/> <br/>
            <Row>
                <Col sm="1" className="text-center">
                    <input type="checkbox"/>
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
                    <input type="checkbox"/>
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