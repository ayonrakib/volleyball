import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

export default function GetModalForBadprofileInputs(props) {
    const [show, setShow] = useState(props.showModal);
  
    const handleClose = () =>{
      setShow(false);
      if(props.needToReloadPage){
        window.location.reload()
      }
      
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