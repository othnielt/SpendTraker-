import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import React, { useState, useEffect, } from 'react';
import { AddExpense } from "../Repository/Database"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { GetBudgetById } from '../Repository/Database';



export function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
  userId,
  amount,
  max
}) {

  const [budget, setBudgets] = useState();



  const descriptionRef = useRef()
  const amountRef = useRef()
  // const budgetIdRef = useRef()


  function toasNotification() {
    const ratio = budget.amount / budget.maximum;
    const percentage = (ratio * 100).toFixed(2);

    if (ratio >= 1) {
      toast.error(`You have exceeded your budget for ${budget.name} by ${percentage}%`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } else if (ratio >= 0.75) {
      toast.warning(`You have spent ${percentage}% of your budget for ${budget.name}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  }


  /**
   * Handles the submission of the form to add a new expense. Sends the data to the server to create the expense
   * and updates the budget information accordingly. Displays a toast notification based on the updated budget ratio.
   * @param {object} e - The form submission event object.
   * @returns {Promise<void>}
   */

  async function handleSubmit(e) {
    e.preventDefault();

    const description = descriptionRef.current.value;
    const amount = amountRef.current.value;

    try {
      await AddExpense(userId, defaultBudgetId, description, amount);
      const updatedBudget = await GetBudgetById(userId, defaultBudgetId);
      setBudgets(updatedBudget);
      const ratio = updatedBudget.amount / updatedBudget.maximum;
      const percentage = (ratio * 100).toFixed(2);
      if (ratio >= 1) {
        toast.error(`You have exceeded your budget for ${updatedBudget.name} by ${percentage}%`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      } else if (ratio >= 0.75) {
        toast.warning(`You have spent ${percentage}% of your budget for ${updatedBudget.name}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.log('Error adding expense:', error);
    }

    handleClose();
  }



  useEffect(() => {
    if (budget) {
      toasNotification();
    }
  }, [budget]);


  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>

          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" type="submit">Add</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )


}





