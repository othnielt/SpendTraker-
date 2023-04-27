import React, { useState ,useEffect} from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { BudgetCard } from './BudgetCard';
import { AddBudgetModal } from './AddBudgetModal';
import{AddExpenseModal} from "./AddExpenseModal"
import { AddBudget,FetchBudgets,FetchTotalBudgetMax,FetchRemainingBudget,FetchTotalAmountSpent } from '../Repository/Database';
import { AddExpenseOption} from './AddExpenseOption';
import{ViewExpensesModal} from './ViewExpensesModal';
import { useAuth } from '../Provider/AuthContext';
import { collection, getDocs,doc } from "firebase/firestore";
import { db } from "../firebase";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';


export default function RenderingCard() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [ openExpenseModal,setOpenExpenseModal] = useState(false);
  const [ showExpenseByUploadModal,setExpenseByUploadModal] = useState(false);
  const [getTotalExpense,TotalExpense] = useState(); // get or  set  user total Expense 
  const [budgets, setBudgets] = useState([]);  
  const [amount, setAmount] = useState();  // get,set the budget amount  
  var [max, setMax] = useState();  // get,set the total  max of each budget 
  var [remainingBudget, setRemainingBudget] = useState();  // get,set the total  max of each budget 
  const [totalSpent, setTotalSpent] = useState(); // get, set the total amount spent
  const [budgetid, setBudgetid] = useState();  // get set  user  specifique Budget


  const { currentUser } = useAuth();
  const handleAddBudget = async (name, maximum) => {
    await AddBudget(currentUser,name, maximum);
    
    setShowAddBudgetModal(false);
  };


  

   // when this function is trigged it open ExpenseOption  Modal 
  function  handleExpenseOption (budgetid) {
    setBudgetid(budgetid);
    setOpenExpenseModal(true);
  };


  const getProgressBarVariant = ( status) => {
    const ratio = totalSpent / max;
    
    if ( ratio >= 1) return "danger";
    return status;
  }
 

  
const fetchBudgets = async (currentUser) => {


    const getBudget =await  FetchBudgets (currentUser);
  
  
  setBudgets( getBudget);
};



useEffect(() => {
  fetchBudgets(currentUser);
  FetchTotalBudgetMax(currentUser)
    .then((maxValue) => {
      setMax(maxValue);
      console.log("max",max)
    })
    .catch((error) => {
      console.log('Error fetching total maximum value:', error);
    });

  FetchRemainingBudget(currentUser)
    .then((value ) => {
      setRemainingBudget(value);
      console.log("remainingBudget",value)
    })
    .catch((error) => {
      console.log('Error fetching remaining budget value:', error);
    });

    FetchTotalAmountSpent(currentUser).then((value) => {
      setTotalSpent(value);
    }).catch((error) => {
      console.log('Error fetching total amount spent:', error);
    });
  
    //fetchBudgets(currentUser)
}, [currentUser,max,fetchBudgets(currentUser)]);




  
  return (
    <>
    <ToastContainer />
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


          
        </Stack>
        <Stack gap="2" direction="horizontal">
          <div className={`alert alert-${getProgressBarVariant("secondary")}`}>
            <span>Budget: {max?   max  +" $CA" : " 0 $CA " }</span>
          </div>
          <div className={`alert alert-${getProgressBarVariant("success")}`}>
            <span>Remaining: {remainingBudget?  remainingBudget +" $CA" : " 0 $CA " }</span>
          </div>
          <div className={`alert alert-${getProgressBarVariant("primary")}`}>
            <span>Spent: {totalSpent ? totalSpent +" $CA" :" 0 $CA "  } </span>
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
          {budgets && budgets.map((budget)  =>{ 

          
         

      //console.log(budget );

          return   (
            
            <BudgetCard key={budget.id?? ""} 
            name={budget.name} 
            amount={budget.amount } 
            max={budget.maximum}
            budgetId ={budget.id} 
            listOfExpense = {budget.expense}
            onAddExpenseClick={() =>  handleExpenseOption(budget.id)}
          
             />
          )})}
        
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
        handleAddBudget={handleAddBudget}
        currentUser={currentUser}
      />


      


     

      <AddExpenseOption
        showModal={openExpenseModal}
        setShowModal={setOpenExpenseModal}
        defaultBudgetId={budgetid}
        userId = {currentUser}
      
      />


    



    </>
  );
}