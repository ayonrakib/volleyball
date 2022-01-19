import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

export default function GetModalForBadprofileInputs(props) {
    // console.log("showmodal component rendered!")
    // console.log("key value in modal component is: ",props.keyValue);
    // console.log("the value of showmodal at the very 1st of modal component is: ",props.showModal);
    
    const [show, setShow] = useState(props.showModal);
  
    const handleClose = () =>{
      setShow(false);
      // props.toggleNeedToLoadEditProfileFormState()
    } 
    // console.log("modal component loaded!");
    // console.log("props input is: ",props)
    return (
      <>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard = {false}>
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Body className="modalProfilePicutreBlock">{props.modalBodyText}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </>
    );
  }