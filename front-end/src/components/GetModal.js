import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function GetModal(props) {
    return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.modalHeading}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h4>{props.modalTitle}</h4>
                <p>
                    {props.modalBody}
                </p>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
    );
  }