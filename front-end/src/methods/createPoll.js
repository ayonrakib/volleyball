import axios from "axios";

export default function createPoll(e){
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