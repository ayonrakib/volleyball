import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function GetFullProfileForm(props){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    return(
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formFirstName">
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
                </Form.Group>

                <Row>
                    <Col>
                        <Button variant="primary" type="button" onClick={props.toggleNeedToLoadEditProfileFormState}>
                            Edit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
        
        // <div>
        //     GetFullProfileForm loaded
        //     <Button variant="secondary" type="button" onClick={props.changeState}>
        //         Edit
        //     </Button>
        // </div>

    )
}