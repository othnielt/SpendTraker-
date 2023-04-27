const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_API_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});




import React, { useState ,useEffect} from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { BudgetCard } from '../Components/BudgetCard';
import { AddBudgetModal } from '../Components/AddBudgetModal';
import { AddBudget } from '../Repository/Database';
import { useAuth } from '../Provider/AuthContext';
import { collection, getDocs,doc } from "firebase/firestore";
import { db } from "../firebase";

export default function RenderingCard() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [budgets, setBudgets] = useState([]);

  const handleAddBudget = async (name, maximum) => {
    await AddBudget(name, maximum);
    
    setShowAddBudgetModal(false);
  };

  const { currentUser } = useAuth();

const fetchBudgets = async (currentUser) => {
  const docRef = doc(db, 'users', currentUser.uid);
  const querySnapshot = await getDocs(collection(docRef, 'budget'));
  const budgetData = [];
  querySnapshot.forEach((doc) => {
    budgetData.push({ id: doc.id, ...doc.data() });
  });
  setBudgets(budgetData);
};

useEffect(() => {
  fetchBudgets(currentUser);
}, [currentUser]);


  const amount = 1;

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button
            variant="outline-primary"
            style={{ marginBottom: '1rem' }}
            onClick={() => setShowAddBudgetModal(true)}
          >
            Add Budget
          </Button>
          <Button variant="outline-primary" style={{ marginBottom: '1rem' }}>
            Add Expense
          </Button>
        </Stack>
        <Stack gap="2" direction="horizontal">
          <div className="alert alert-secondary">
            <span>Budget: $2000</span>
          </div>
          <div className="alert alert-success">
            <span>Remaining: $1000</span>
          </div>
          <div className="alert alert-primary">
            <span>Spent so far: $1000</span>
          </div>
        </Stack>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start',
          }}
        >
          {budgets.map((budget) => (
            <BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.maximum} />
          ))}
          <BudgetCard name="Total" amount={amount} max={amount} />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
        handleAddBudget={handleAddBudget}
      />
    </>
  );
}








import React, { useContext, useState, useEffect } from "react"
import {Card,From, ProgressBar,Stack,Button,Container,ListGroup, ListGroupItem} from 'react-bootstrap';
import {BudgetCard} from '../Components/BudgetCard';
import {AddBudgetModal} from "../Components/AddBudgetModal";
import {  AddBudget} from "../Repository/Database"





export default function RenderingCard() {


    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)

    
  

   async  function  f () {

    
    const result = await AddBudget();

    console.log("dd");

    


   }

   
  
    const   amount = 1 
    return <>


    <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4" >
         

             <h1 className="me-auto">
                Budgets
            </h1>

            <Button variant="outline-primary " style={{ marginBottom: "1rem" }  }  onClick={() => f() } >
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

    <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />

   
    
    </>

}
