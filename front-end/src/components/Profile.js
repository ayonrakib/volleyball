import { Nav, Container, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';
import { useHistory } from 'react-router';
// const router = require('../routers/router');
const cookies = new Cookies();
import Home from './Home';

export default function Profile(){
    return(
        <div>
            <Home/>
            Hello user
        </div>
    )
}