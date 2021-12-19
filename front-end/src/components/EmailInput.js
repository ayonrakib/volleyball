import { useState } from "react";
import { Form } from "react-bootstrap";
export default function GetEmailInput(props){
    const [email, setEmail] = useState("");
    return(
            <>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" readOnly value={props.email}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
            </>
    )
}