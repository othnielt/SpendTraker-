import React from 'react';
import {Card,From, ProgressBar,Stack,Button,Container,ListGroup, ListGroupItem} from 'react-bootstrap';
import {currencyFormat} from '../Utils';
import {BudgetCard} from '../Components/BudgetCard';




export default function RenderingCard() {

    const   amount = 1 
    return <>


    <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4" >
         

             <h1 className="me-auto">
                Budgets
            </h1>

            <Button variant="outline-primary " style={{ marginBottom: "1rem" } } >
                Add Budget
            </Button>

            <Button variant="outline-primary"  style={{ marginBottom: "1rem" }}>
            Add Expense
          </Button>
    
           
        </Stack>


        
          <Stack gap="2" direction="horizontal"> 

          <div className='alert alert-secondary'>
			<span>Budget: $2000</span>
		</div>

        <div className='alert alert-success'>
			<span>Remaining: $1000</span>
		</div>

        <div className='alert alert-primary'>
			<span>Spent so far: $1000</span>
		</div>

        </Stack>

        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}> 

        


        

        
         < BudgetCard name="Food"> amount={amount} max={amount}  </BudgetCard>
         < BudgetCard name="Enterainment"> amount={amount} max={amount}  </BudgetCard>
         < BudgetCard name="Hobby"> amount={amount} max={amount}  </BudgetCard>



    < BudgetCard name="Total"> amount={amount} max={amount}  </BudgetCard>

    

         

        </div>
    </Container>

    
    </>

}