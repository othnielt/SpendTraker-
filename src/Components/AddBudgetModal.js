import React, { useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { AddBudgetByUpload,AddBudget  } from "../Repository/Database";
import { BudgetUploader } from '../Repository/VeryfiApi/BudgetUploader';

export function AddBudgetModal({ show, handleClose, currentUser }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const [image, setImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const max = parseFloat(maxRef.current.value);

   if (!image ){
   
    
    await AddBudget(currentUser,name,max)
    handleClose()
   
   }

   await BudgetUploader(currentUser, image,max)
   handleClose()

  
    
  }

  function handleImageChange(e) {
    
    setImage(e.target.files[0]);
  }

  

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
