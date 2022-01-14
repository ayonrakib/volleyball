import { Button, Row, Col, Container } from "react-bootstrap";

export default function GetFullProfileForm(props){
    return(
        <>
                {/* <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" value={props.firstName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" value={props.lastName} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" readOnly value={props.email}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group> */}
                <Container>
                    <Row>
                        <Col lg = "3">
                            First Name:
                        </Col>
                        <Col>
                            {props.firstName}
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col lg = "3">
                            Last Name:
                        </Col>
                        <Col>
                            {props.lastName}
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col lg = "3">
                            Email: 
                        </Col>
                        <Col lg = "2">
                            {props.email}
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                    <Col>
                        <Button variant="primary" type="button" onClick={props.toggleNeedToLoadEditProfileFormState}>
                            Edit
                        </Button>
                    </Col>
                </Row>
                </Container>



        </>

    )
}