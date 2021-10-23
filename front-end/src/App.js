import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Home from './components/Home';
import Login from './components/Login';
import CreateUser from './components/Create-User';


export default function App() {
  return (
          <Router>
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
                </Switch>
            </div>
          </Router>

  );
}
