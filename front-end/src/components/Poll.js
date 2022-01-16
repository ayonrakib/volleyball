// import Navigation from "./Navigation"
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from "react";
// import Navigation from './Navigation';
import ValidateUser from './ValidateUser';
// import ToggleButtons from "../methods/ToggleButtons";
// import ControlledToggleButton from "../components/ControlledToggleButton"
import UnControlledToggleButtons from './UnControlledToggleButtons';
// import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// var _ = require('lodash')

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
export default function Poll(props){
    ValidateUser()
    var crossIcon = <FontAwesomeIcon icon={faTimes} onClick={() => props.deleteCallback(props.props.pollId) }/>
    console.log("rendering poll component, props is: ",props.props)


    function showVoters(){
        console.log("arrived in showVoters method!")
        console.log("the poll id of the current show voters poll is: ",props.props.pollId)
        axios({
            method: "POST",
            url: "http://localhost:8080/show-voters",
            data: {
                id: props.props.pollId
            }
        }).then(response => {
            console.log("response from show voters url is: ",response.data)
        })
    }


    return (
        <div key = {props.props.key} className = "poll">
            <div id = {props.props.pollId} className = "pollBackground font-white">
                <div id='pollIdAndCrossIcon'>
                    <div id='pollIdBlock'>
                        poll Id: {props.props.pollId}
                    </div>
                    <div id='crossIconBlock' >
                        {crossIcon}
                    </div>
                </div>

                <div className = "font-white matchLocationBlock">
                    {props.props.currentDay}, {props.props.currentMonth} {props.props.currentDate} at Cedar Park
                </div>

                <div className = "matchType font-white">
                    Friendly match
                </div>
                <div className = "matchLocation font-white">
                    Cedar Park Recreation Center
                    
                </div>
                <div id='weatherAndViewVotersBlock'>
                    <div className = "weatherDetails">
                        {props.props.weatherIcon} {props.props.tempInFahrenheit} F {props.props.weatherText}
                    </div>
                    <div className='viewVotersButton'>
                        <Button variant='primary' onClick={showVoters}>View Voters</Button>
                    </div>
                </div>

                
                <div className = "grayBar">

                </div>
                <div id = {props.props.pollId} className = "pollButtons">
                    <UnControlledToggleButtons id = {props.props.pollId}/>
                </div>
            </div>
        </div>
    )
}