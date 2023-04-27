
import React, {useContext} from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, setDoc, getDoc,doc,query, where,updateDoc,arrayUnion,arrayRemove } from "firebase/firestore";





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

export async function AddBudgetByUpload(currentUser,  amount,receiptData) {
  try {
    const docRef = doc(db, 'users', currentUser.uid);
    const colRef = collection(docRef, "budget");
    console.log("totoooo",)

    

    // Extract category from receipt data
    const category = receiptData.category;
    console.log("soldat",receiptData);
    console.log("totoooo",category);
    console.log("rr",currentUser.uid);
    console.log("amamo",amount);

    // Query for budget with matching category
    const querySnapshot = await getDocs(query(colRef, where("category", "==", category)));

    let budgetID;

    // If a matching budget is found, use its ID
    if (querySnapshot.docs.length > 0) {
      budgetID = querySnapshot.docs[0].id;
    } else {
      // If no matching budget is found, create a new one
      const newBudgetRef = await addDoc(colRef, {
        name: category + " budget",
        maximum: amount,
        category: category
      });

      budgetID = newBudgetRef.id;
    }

    // Create expense data object
   

    // Add expense to budget
    await AddReceiptExpense(currentUser, budgetID, receiptData.line_items);
  } catch(e) {
    console.error(e);
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
/**
 * Adds an expense to the specified budget for the current user.
 * @param {Object} currentUser - The currently logged in user.
 * @param {string} budgetID - The ID of the budget to add the expense.
 * @param {Object} expenseData - An object containing the expense data to add, including type and total.
 */

export async function AddReceiptExpense(currentUser, budgetID, expenseData) {



    console.log("bbbbudgid: ", budgetID );
    console.log("uuserid: ", currentUser.uid);

  try {
    const docRef = doc(db, "users", currentUser.uid, "budget", budgetID);

    for (const item of expenseData) {
      const { description, total } = item;
      
      await updateDoc(docRef, {
        expense: arrayUnion({
          budgetId: budgetID,
          description: description,
          amount: total
        })
      });
    }
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


//


export async function GetBudgetById(currentUser, budgetID) {

  console.log("userid", currentUser.uid);
  console.log("budget", budgetID)
  try {
    const docRef = doc(db, 'users', currentUser.uid, 'budget', budgetID.toString());
    const docSnapshot = await getDoc(docRef);
   console.log(docSnapshot );
    if (docSnapshot.exists()) {
      const budget = { id: docSnapshot.id, ...docSnapshot.data() };

      // Calculate total expenses for the budget
      let totalExpense = 0;
      if (budget.expense) {
        for (const expense of budget.expense) {
          totalExpense += Number(expense.amount);
        }
      }
      budget.amount = totalExpense;

      console.log("the total bugdet",budget)
      return budget;
    } else {
      console.log('No budget found with the specified ID');
      return null;
    }
  } catch (e) {
    console.log('Error fetching budget:', e);
    return null;
  }
}


/**

Calculates the total maximum budget across all budgets for a given user.
@param {Object} currentUser - The currently logged in user.
@returns {number} The total maximum budget across all budgets.
*/

export async function FetchTotalBudgetMax(currentUser) {
  try {
    const querySnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'budget'));
    let totalMax = 0;
    for (const doc of querySnapshot.docs) {
      const budget = doc.data();
      totalMax += Number(budget.maximum);
    }
    return totalMax;
  } catch (e) {
    console.log('Error fetching budgets:', e);
  }
}

/**
Calculates the remaining budget of the total budget across all budgets for a given user.
@param {Object} currentUser - The currently logged in user.
@returns {number} The remaining budget of the total budget across all budgets.
*/

export async function FetchRemainingBudget(currentUser) {
  try {
    const querySnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'budget'));
    let totalMax = 0;
    let totalExpenses = 0;
    for (const doc of querySnapshot.docs) {
      const budget = doc.data();
      totalMax += Number(budget.maximum);
      if (budget.expense) {
        for (const expense of budget.expense) {
          totalExpenses += Number(expense.amount);
        }
      }
    }
    return totalMax - totalExpenses;
  } catch (e) {
    console.log('Error fetching budgets:', e);
  }
}



/**
Calculates the total amount spent across all budgets for a given user.
@param {Object} currentUser - The currently logged in user.
@returns {number} The total amount spent across all budgets.
*/

export async function FetchTotalAmountSpent(currentUser) {
  try {
    const querySnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'budget'));
    let totalSpent = 0;
    for (const doc of querySnapshot.docs) {
      const budget = doc.data();
      if (budget.expense) {
        for (const expense of budget.expense) {
          totalSpent += Number(expense.amount);
        }
      }
    }
    return totalSpent;
  } catch (e) {
    console.log('Error fetching budgets:', e);
  }
}










 





