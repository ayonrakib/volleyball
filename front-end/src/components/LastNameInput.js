import { useState } from "react";
import { Form } from "react-bootstrap";
export default function GetLastNameInput(props){
    const [lastName, setLastName] = useState("");
    console.log("last name parameter in GetLastNameInput component is: ",props.lastName)
    return(
            <>
                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" value={props.LastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
            </>
    )
}