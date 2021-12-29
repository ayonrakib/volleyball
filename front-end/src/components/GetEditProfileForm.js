// import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function GetEditProfileForm(props){
    return (
            <>
                <Form onSubmit={props.saveEditedProfileInfo}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" onChange={(e) => props.setModifiedFirstName(e.target.value)} value={props.firstName} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" onChange={(e) => props.setModifiedLastName(e.target.value)}/>
                    </Form.Group>
                    <div className="similarRowButtons">
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                    <div className="similarRowButtons">
                        <Button variant="secondary" type="button" onClick={props.toggleNeedToLoadEditProfileFormState} >
                            Go back
                        </Button>
                    </div>
                </Form>
            </>
    )
}