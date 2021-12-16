import axios from "axios"
export default function getProfilePictureURL(){
    console.log("came in getProfilePictureURL method")
    axios({
        method: "GET",
        url: "http://localhost:8080/get-profile-picture-url",
        data: ""
    }).then(response => {
        console.log("profile picture url from getProfilePictureURL is: ",response.data.data)
        return response.data.data;
    })
}