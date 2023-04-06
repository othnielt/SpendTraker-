
import React, {useContext} from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, setDoc, getDoc,doc,updateDoc,arrayUnion,arrayRemove } from "firebase/firestore";





const usersCollectionRef = collection(db, 'users');
const budgetCollectionRef = collection(db, 'budget');
/*

add Budget to the database 

*/


export async function AddBudget (currentUser,name, max) {




try {

    const docRef = doc(db, 'users', currentUser.uid);
    const colRef = collection(docRef, "budget")
  
   await  addDoc(colRef,{
      name: name,
      maximum: max
    });
 
} catch(e){


  


}

}

 //  Get userBudget from firebase 
 export async function FetchBudgets(currentUser) {
  try {
    const docRef = doc(db, 'users', currentUser.uid);
    const querySnapshot = await getDocs(collection(docRef, 'budget'));

    const budgetData = [];
    for (const doc of querySnapshot.docs) {
      const budget = { id: doc.id, ...doc.data() };
      
      // Calculate total expenses for each budget
      let totalExpense = 0;
      if (budget.expense) {
        for (const expense of budget.expense) {
          totalExpense += Number(expense.amount);
        }
      }
      budget.amount = totalExpense;

      budgetData.push(budget);
    }
   // console.log('fetching budgets:', budgetData);


    return budgetData;
  } catch (e) {
    console.log('Error fetching budgets:', e);
  }
}







 //   AddExpense from firebase 
 export async function AddExpense(currentUser, budgetID, description, amount) {
  console.log(currentUser.uid);
  console.log("budgetid: ", budgetID);

  try {
    const docRef = doc(db, "users", currentUser.uid, "budget", budgetID);

    await updateDoc(docRef, {
  expense: arrayUnion({
    budgetId: budgetID,
    description: description,
    amount: amount
  })
});

  } catch (e) {
    console.log("Error adding expense:", e);
  }
}






    //  Fetch  User Expensive from firebase 
export  async  function FetchExpensive (currentUser) {

  try {
      const docRef = doc(db, 'users', currentUser.uid);
const querySnapshot = await getDocs(collection(docRef, 'budget'));



return querySnapshot; 
   
  } catch(e){

   
  
  }

  }


  // remove Expense
// Remove an expense map element at a specific index


export async function RemoveExpense(currentUser, budgetId, index) {
  const arrayName = 'expense';

  console.log(currentUser.uid, budgetId, index);

  const budgetDocRef = doc(db,'users', currentUser.uid,'budget', budgetId);

  const querySnapshot = await getDoc(budgetDocRef);
  const getExpenseArray = querySnapshot.data()[arrayName]; 

  await updateDoc(budgetDocRef, {
    [arrayName]: getExpenseArray.filter((_, i) => i !== index)
  });

  console.log('Expense removed successfully!');
}






 





