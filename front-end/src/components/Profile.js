
import Navigation from './Navigation';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Cookies from 'universal-cookie/es6';
// const router = require('../routers/router');
// const cookies = new Cookies();


export default function Profile(){
    return(
        <div >
            <Navigation/>
            <Container className = "profilePage">
                <Row>
                    <Col className = "profilePictureBlock" lg = "3">
                        <Row className = "profilePicture">

                        </Row>
                    </Col>
                    <Col lg="1">
                    </Col>
                    <Col className = "profileDetails" lg = "6">
                        2nd col
                    </Col>
                </Row>
                
            </Container>
        </div>
    )
}