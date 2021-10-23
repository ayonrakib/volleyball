import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { LogOut } from "../methods/logOut";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router";

export default function Navigation(){
  const history = useHistory()
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">Volleyball</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/profile">profile</Nav.Link>
                <Nav.Link href="/poll">poll</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link onClick = {() => this.LogOut(history)}>
                    Logout
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}