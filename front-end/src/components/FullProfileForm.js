import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function GetFullProfileForm(props){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    return(
        // <Form>
        //     <Form.Group className="mb-3" controlId="formFirstName">
        //         <Form.Label>First Name</Form.Label>
        //         <Form.Control type="text" placeholder="First Name" value={props.firstName} onChange={(e) => setFirstName(e.target.value)} />
        //     </Form.Group>
        //     <Form.Group className="mb-3" controlId="formLastName">
        //             <Form.Label>Last Name</Form.Label>
        //             <Form.Control type="text" placeholder="Last Name" value={props.LastName} onChange={(e) => setLastName(e.target.value)} />
        //     </Form.Group>
        //     <GetEmailInput email = {email} />

        //     <Row>
        //         <Col>
        //             <Button variant="secondary" type="button" onClick={showEditProfileForm}>
        //                 Edit
        //             </Button>
        //         </Col>
        //     </Row>

        // </Form>
        <div>
            GetFullProfileForm loaded
            <Button variant="secondary" type="button" onClick={props.changeState}>
                Edit
            </Button>
        </div>

    )
}