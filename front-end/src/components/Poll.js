// import Navigation from "./Navigation"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import Navigation from './Navigation';
import ValidateUser from './ValidateUser';
// import ToggleButtons from "../methods/ToggleButtons";
// import ControlledToggleButton from "../components/ControlledToggleButton"
import UnControlledToggleButtons from './UnControlledToggleButtons';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
var _ = require('lodash')

// method Poll
// return: jodi kono poll na thake, create poll button return. noile poll gula return.
// method:
//      1. Fahrenheit temp er hook banabo
//      2. weather text er hook
//      3. weather icon er hook
//      4. poll data er hook
//      5. week er 7 days er dict banabo
//      6. year er 12 month er dict
//      7. library theke ajker day month date ber korbo
//      8. open weather map API call korbo:
//          8.1. response e pabo K te temp
//          8.2. K temp ke F e convert korbo
//          8.3. weather text hook e assign korbo
//          8.4. weather icon assign korbo
//      9. method createPoll
//      10. parameter: event
//      11. return: kisui na, shudhu new poll create korbo db te
//      12. method:
//          12.1. button click korar default behavior thamabo
//          12.2. create poll url e API call korbo
//          12.3. response paile:
//              12.3.1. response log korbo
//      13. method getPollJSX
//      14. input: props dict
//      15. return: ekta poll er JSX expression
//      16. method:
//          16.1. poll ke centar align korar class
//          16.2. poll id insert korbo 
//          16.3. current day month and date at a location
//          16.4. Friendly match
//          16.5. weather details
//          16.6. gray bar
//          16.7. toggle buttons
//          16.8. create poll button
//      17. empty polls list
//      18. get all polls e API call
//      19. response paile:
//          19.1. check korbo respinse data and pollData eki list kina
//          19.2. same na hoile:
//              19.2.1. polLData hook e assign korbo response er poll gula
//      20. pollData er sob gula index er jonno:
//          20.1. props dict banabo with pollid, current day and date, weather icon, text and temp
//          20.2. polls list e append getPollJSX(props)
//          20.3. orthat, polls list e append korbo sob gula poll with unique data
//      21. jodi pollData empty list hoy:
//          21.1. create poll button er JSX return korbo
//      22. noile:
//          22.1. navigation bar
//          22.2. sob poll
//          22.3. create poll button return
export default function Poll(){
    ValidateUser()
    console.log("rendering poll component")
    const [tempInFahrenheit, setTempInFahrenheit] = useState(0);
    const [weatherText, seatWeatherText] = useState("");
    const [weatherIcon, setWeatherIcon] = useState("");
    const [pollData, setpollData] = useState([]);
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
        if((weatherText === "overcast clouds") && (weatherIcon === "")){
            // setWeatherIcon(<FontAwesomeIcon icon={["fas", "sun"]} />)
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
    }

    function getPollJSX(props){
        return (
            <div key = {Math.random()} className = "poll">
                <div id = {props.pollId} className = "pollBackground font-white">
                    <div className = "font-white">
                        {props.currentDay}, {props.currentMonth} {props.currentDate} at Cedar Park
                    </div>
                    <div className = "matchType font-white">
                        Friendly match
                    </div>
                    <div className = "matchLocation font-white">
                        Cedar Park Recreation Center
                        
                    </div>
                    <div className = "weatherDetails">
                        {props.weatherIcon} {props.tempInFahrenheit} F {props.weatherText}
                    </div>
                    
                    <div className = "grayBar">
    
                    </div>
                    <div id = {props.pollId} className = "pollButtons">
                        <UnControlledToggleButtons id = {props.pollId}/>
                    </div>
                </div>
            </div>
        )
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
        var props = {
                        pollId : `${pollData[pollIndex]._id}`,
                        currentDay : `${currentDay}`,
                        currentMonth: `${currentMonth}`,
                        currentDate : `${currentDate}`,
                        weatherIcon : weatherIcon,
                        tempInFahrenheit : `${tempInFahrenheit}`,
                        weatherText : `${weatherText}`
                    }
        polls.push(getPollJSX(props));
    }
    console.log("polls are: ",polls)
    if (_.isEqual(pollData,[])) {
        return(
            <div className = "poll">
                <Button variant = "primary" onClick = {(e) => createPoll(e)}>
                    Create Poll
                </Button>
            </div>
        )

    } else {
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

}