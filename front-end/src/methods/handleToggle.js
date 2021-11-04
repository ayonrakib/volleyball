import axios from "axios";
export default function handleToggle(e){
    e.preventDefault();
    console.log("id of the toggle button is: ",e.target.id)
    var pollChoice = e.target.id
    var parentsId = e.target.parentNode.parentNode.getAttribute("id");
    console.log("parent class is: ",parentsId)
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