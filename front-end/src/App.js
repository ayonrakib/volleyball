import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Home from './components/Home';
import Login from './components/Login';


export default function App() {
  return (
          <Router>
            <div className="home">
              <Navbar/>
                <Switch>
                    <Route exact path='/home'>
                      <Home/>
                    </Route>
                    <Route exact path = '/'>
                      <Login/>
                    </Route>
                </Switch>
            </div>
          </Router>

  );
}
