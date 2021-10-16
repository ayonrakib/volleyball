const axios = require('axios');

const api = axios.create({
    baseURL: `http://localhost:8080/`
})

export default function Axios(){
    api.get('/').then(
        function getResponse(response){
            console.log("response is: ",response.data);
            console.log("tile is: ",response.data.title);
            console.log("description is: ",response.data.description);
            console.log("movies list is: ",response.data.movies);
            console.log("first movie element is: ",response.data.movies[0])
        });
    return(
        <div>
            Axios
        </div>
    )
}