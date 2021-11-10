
import { LogOut } from "../methods/logOut";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router";

export default function Navigation(){
  const history = useHistory()
  console.log("current history is: ",history);
  // var historyButton = <></>;
  // for(var historyLength = 0; historyLength < history.length; historyLength++){
  //   historyButton += <Button>Go back {historyLength} times</Button>
  // }
  // const list = <li>
  //   <ul>
  //     home
  //   </ul>
  //   <ul>
  //     page
  //   </ul>
  //   <Button>Home</Button>
  // </li>
    return (
      <div>
        
        <Navbar className = "navigationBar" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/home">Volleyball</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="/profile">profile</Nav.Link>
                <Nav.Link href="/poll">poll</Nav.Link>
                <Nav.Link href="/announcements">announcements</Nav.Link>
                </Nav>
                <Nav>
                <Nav.Link onClick = {() => LogOut(history)}>
                    Logout
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Button onClick = {() => goBackToPreviousHistory(history)}>Go back to previous url</Button> */}
      {/* {historyButton} */}
      </div>

      
    )
}