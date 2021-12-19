import { useState } from "react";
import { Form } from "react-bootstrap";
export default function GetFirstNameInput(props){
    const [firstName, setFirstName] = useState("");
    return(
        <>
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" value={props.firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>
        </>
    )
}