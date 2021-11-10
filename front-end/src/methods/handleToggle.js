import axios from "axios";
export default function handleToggle(e){
    console.log("index of the toggle button is: ",e.target.id.search("-"))
    var pollChoice = e.target.id
    var parentsId = e.target.parentNode.parentNode.getAttribute("id");
    console.log("id of the poll is: ",parentsId)
    axios({
        method: 'POST',
        url: "http://localhost:8080/save-selection-in-poll-database",
        data:{
            id: parentsId,
            pollOption: pollChoice
        }
    }).then(response =>{
        console.log("response from handle poll toggle is: ",response.data)
    })
}