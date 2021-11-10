
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie/es6';
// const router = require('../routers/router');
const cookies = new Cookies();


export default function Profile(){
    return(
        <div>
            <Navigation/>
            Hello user
        </div>
    )
}