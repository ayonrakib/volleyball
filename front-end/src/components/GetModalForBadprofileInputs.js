import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

export default function GetModalForBadprofileInputs(props) {
    const [show, setShow] = useState(props.showModal);
  
    const handleClose = () => setShow(false);
    console.log("modal component loaded!");
    console.log("props input is: ",props)
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.modalBodyText}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }