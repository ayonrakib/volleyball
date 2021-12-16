import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie/es6';
import Navigation from './Navigation';
import { useHistory } from 'react-router';
import ValidateUser from './ValidateUser';
import { Image, Container, Row, Col } from 'react-bootstrap';
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
    return(
        <div>
            <Navigation/>
            <Container>
                <Row>
                    <Col lg = "4">
                        <Image src = "%PUBLIC_URL%/images/volleyball.png"></Image>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}