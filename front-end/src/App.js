import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Home from './components/Home';
import Login from './components/Login';
import CreateUser from './components/Create-User';
import Poll from './components/Poll';
import Navigation from './components/Navigation';
import Announcements from './components/Announcements';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faSun } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee, faSun)


export default function App() {
  return (
          
          <Router>
            <Navigation/>
            <div className="home">
              
                <Switch>
                    <Route exact path='/home'>
                      <Home/>
                    </Route>
                    <Route exact path = '/'>
                      <Login/>
                    </Route>
                    <Route exact path = '/register'>
                      <CreateUser/>
                    </Route>
                    <Route exact path = "/poll"> 
                      <Poll/>
                    </Route>
                    <Route exact path = "/announcements"> 
                      <Announcements/>
                    </Route>
                </Switch>
            </div>
          </Router>

  );
}
