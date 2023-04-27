import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
import React, { useState } from 'react';
import { currencyFormat } from "../Utils"
import{ViewExpensesModal} from './ViewExpensesModal';
import { toast } from 'react-toastify';


export function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
  budgetId,
  listOfExpense,
}) {

  const [ ShowExpenseView,setExpenseView] = useState(false); // ExpenseView Controller 


  const  handleExpenseView =() =>{
   
    setExpenseView(true); //(true);
  };


  const  setShowExpenseView =() =>{
   
    setExpenseView(true); //(true);
  };

  // close expensive modal
  const handleCloseExpenseView = () => {
    setExpenseView(false);
  };
  const classNames = []
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }

  return (

    <>
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormat.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormat.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button onClick={ setShowExpenseView  } variant="outline-primary"
              className="ms-auto">
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>


    <ViewExpensesModal


    showModal = { ShowExpenseView }
   budget = {name}
  listOfExpense= {listOfExpense}
  handleClose = { handleCloseExpenseView}
    
    />



    </>
  )
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) return "primary"
  if (ratio < 0.75) return "warning"
  return "danger"
}