import { Modal, Button, Stack } from "react-bootstrap"
import { currencyFormat } from "../Utils"
import { RemoveExpense } from "../Repository/Database"
import { useAuth } from "../Provider/AuthContext";

export function ViewExpensesModal({ showModal, budget: budgetName,
  listOfExpense, handleClose }) {





  const expenses = listOfExpense;  // list of all expenses

  const { currentUser } = useAuth()


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budgetName?.name}</div>

            <Button
              onClick={() => {

                handleClose()
              }}
              variant="outline-danger"
            >
              Delete
            </Button>

          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">

          {expenses && expenses.map((expense, index) => {





            return (


              <Stack direction="horizontal" gap="2" key={expense.amount}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className="fs-5">
                  {currencyFormat.format(expense.amount)}
                </div>
                <Button
                  onClick={() => RemoveExpense(currentUser, expense.budgetId, index)}
                  size="sm"
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </Stack>
            )
          })}

        </Stack>
      </Modal.Body>
    </Modal>
  )
}
