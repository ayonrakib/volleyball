import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie/es6';
import Navigation from './Navigation';
import { useHistory } from 'react-router';
import ValidateUser from './ValidateUser';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios'
const cookies = new Cookies();

 

export default function Home(){
    console.log("came in home component")
    const history = useHistory();
    const session = cookies.get('session')
    if((session === "") || (session === undefined)){
        history.push('/')
    }
    else if(session){
        console.log("existing session is: ",session);
        // how to use getUserWithEmail middleware here?
        ValidateUser();
    }
    axios({
        method: 'PUT',
        url: 'http://localhost:8080/put-method',
        data:{
            name: "Ayon"
        }
    }).then(response => console.log("response from put nodejs is: ",response.data))
    return(
        <div>
            <Navigation/>
            <Container>
                <Row>

                </Row>
            </Container>
        </div>
    )
}