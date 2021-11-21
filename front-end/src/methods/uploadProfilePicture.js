import axios from "axios";

export default function UploadProfilePicture(e, profilePicture){
    e.preventDefault();
    console.log("upload profile pic!")
    profilePicture.current?.click()
}