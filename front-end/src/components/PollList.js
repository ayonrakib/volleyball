import Poll from "./Poll";
import Navigation from "./Navigation";
import ValidateUser from "./ValidateUser";
import axios from "axios";
import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmog, faCross } from "@fortawesome/free-solid-svg-icons";
var _ = require('lodash')

export default function PollList(){
    ValidateUser();
    // const [polls, setPolls] = useState("");
    const [tempInFahrenheit, setTempInFahrenheit] = useState(0);
    const [weatherText, setWeatherText] = useState("");
    const [weatherIcon, setWeatherIcon] = useState("");
    const [pollData, setpollData] = useState([]);
    const [needToReloadPolls, setNeedToReloadPolls] = useState(false);
    var daysInAWeek = {
        0 : "Sunday",
        1 : "Monday",
        2 : "Tuesday",
        3 : "Wednesday",
        4 : "Thursday",
        5 : "Friday",
        6 : "Saturday"
    };
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
    };
    var today = new Date();
    var date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
    // console.log("date is: ",date)
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
            setWeatherText(response.data.weather[0].description);
        }
        
        if((weatherText === "clear sky") && (weatherIcon === "")){
            setWeatherIcon(<FontAwesomeIcon icon="sun" />)
        }
        if((weatherText === "overcast clouds") && (weatherIcon === "")){
            // setWeatherIcon(<FontAwesomeIcon icon={["fas", "sun"]} />)
        }
        if((weatherText === "few clouds") && (weatherIcon === "")){
            setWeatherIcon(<FontAwesomeIcon icon="sun" />)
        }
        if((weatherText === "mist") && (weatherIcon === "")){
            setWeatherIcon(<FontAwesomeIcon icon={faSmog} />)
        }
        console.log("the temp in F is: ",tempInFahrenheit);
    })
    function createPoll(e){
        e.preventDefault();
        console.log("id of the create poll button is: ",e.target.id);
        axios({
            method: "GET",
            url: "http://localhost:8080/create-poll",
            data:{
                data: ""
            }
        }).then(response => {
            console.log("id of the poll is: ",response.data.data._id);
        })
        window.location.reload()
    }

    function deletePoll(currentPollId){
        console.log("came in deletePoll method with pollId: ",currentPollId);
    }
    var polls = [];
    axios({
        method: "GET",
        url: "http://localhost:8080/get-all-polls",
        data:""
    }).then(response => {
        console.log("all polls are: ",response.data)
        if(!(_.isEqual(pollData, response.data.data))){
            setpollData(response.data.data)
        }
    })
    for(var pollIndex = 0; pollIndex < pollData.length; pollIndex++){
        console.log("current poll is: ",pollData[pollIndex])
        console.log("pollid being sent in props is: ",`${pollData[pollIndex]._id}`);
        
        var props = {
                        key: Math.random(),
                        
                        pollId : `${pollData[pollIndex]._id}`,
                        currentDay : `${currentDay}`,
                        currentMonth: `${currentMonth}`,
                        currentDate : `${currentDate}`,
                        weatherIcon : weatherIcon,
                        tempInFahrenheit : `${tempInFahrenheit}`,
                        weatherText : `${weatherText}`
                    }
        polls.push(<Poll props = {props} deleteCallback = {deletePoll}/>);
    }
    console.log("polls are: ",polls)
    if (_.isEqual(pollData,[])) {
        polls = ""
    } 
    return(
            <div>
                
                <Navigation/>
                {polls}
                <div className = "poll">
                    <Button variant = "primary" onClick = {(e) => createPoll(e)}>
                        Create Poll
                    </Button>
                </div>
            </div>
    )
}