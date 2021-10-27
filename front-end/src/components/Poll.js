// import Navigation from "./Navigation"
import { Container, Row, Col, Button } from "react-bootstrap"
import YesPollBar from "./YesPollBar"
import NoPollBar from "./NoPollBar";
import MaybePollBar from "./MaybePollBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState } from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
const cookies = new Cookies()


export default function Poll(){
    const [tempInFahrenheit, setTempInFahrenheit] = useState(0);
    const [weatherText, seatWeatherText] = useState("");
    const [weatherIcon, setWeatherIcon] = useState("");
    var daysInAWeek = {
        1 : "Monday",
        2 : "Tuesday",
        3 : "Wednesday",
        4 : "Thursday",
        5 : "Friday",
        6 : "Saturday",
        7 : "Sunday"
    }
    var monthsInAYear = {
        0 : "January",
        1 : "February",
        2 : "March",
        3 : "April",
        4 : "May",
        5 : "June",
        6 : "July",
        7 : "August",
        8 : "September",
        9 : "October",
        10 : "November",
        11 : "December"
    }
    var today = new Date();
    var date = today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
    console.log(date);
    var currentDay = daysInAWeek[today.getDay()];
    var currentMonth = monthsInAYear[today.getMonth()];
    var currentDate = today.getDate();
    console.log("current date is: ",currentDate)
    console.log("current month is: ",currentMonth)
    console.log("current day is: ",currentDay)
    axios({
        method: 'GET',
        url: "https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=1b6a9c43f4c7125af9f430ff79f20599"
    }).then(response => {
        var tempInKelvin = response.data.main.temp;
        if(tempInFahrenheit === 0){
            setTempInFahrenheit(Math.ceil((tempInKelvin - 273) * (9/5)) + 32);
        }
        if(weatherText === ""){
            seatWeatherText(response.data.weather[0].description);
        }
        
        if((weatherText === "clear sky") && (weatherIcon === "")){
            setWeatherIcon(<FontAwesomeIcon icon="sun" />)
        }
        console.log("the temp in F is: ",tempInFahrenheit);
    })
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
        <div>
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
            <br/>
            <Row>
                <Col sm="1" className="text-center">
                    <input id="1" type="checkbox" onClick = {(e) => handleCheckBox(e)}/>
                </Col>
                <Col sm="2" className="text-center">
                    No
                </Col>
                <Col sm = "9">
                    <MaybePollBar/>
                </Col>
            </Row>
        </Container>
        <Container className = "pollBackground font-white">
            <div className = "font-white">
                {currentDay}, {currentMonth} {currentDate} at Cedar Park
            </div>
            <div className = "font-white">
                Friendly match
            </div>
            <div className = "font-white">
                Cedar Park Recreation Center
                
            </div>
            {weatherIcon} {tempInFahrenheit} F {weatherText}
            <div className = "grayBar">

            </div>
            <Button>Going</Button>
        </Container>
        </div>
    )
}