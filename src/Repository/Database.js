import { db } from "../firebase";
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, arrayUnion } from "firebase/firestore";






/**
 * Adds a new budget document for the current user to Firebase's Firestore database.
 *
 * @param {Object} currentUser - The Firebase `User` object representing the current user.
 * @param {string} name - The name of the new budget document.
 * @param {number} max - The maximum value for the new budget document.
 * @returns {Promise<void>} A Promise that resolves with void upon successful addition of the budget document.
 */

export async function AddBudget(currentUser, name, max) {




  try {

    const docRef = doc(db, 'users', currentUser.uid);
    const colRef = collection(docRef, "budget")

    await addDoc(colRef, {
      name: name,
      maximum: max
    });

  } catch (e) {





  }

}


/**
 * Adds a new budget document to Firebase's Firestore database based on uploaded receipt data.
 *
 * @param {Object} currentUser - The Firebase `User` object representing the current user.
 * @param {number} amount - The amount for the new budget document.
 * @param {Object} receiptData - The receipt data to extract the category from.
 * @returns {Promise<void>} A Promise that resolves with void upon successful addition of the budget document.
 */

export async function AddBudgetByUpload(currentUser, amount, receiptData) {
  try {
    const docRef = doc(db, 'users', currentUser.uid);
    const colRef = collection(docRef, "budget");
    console.log("totoooo",)



    // Extract category from receipt data
    const category = receiptData.category;
    console.log("soldat", receiptData);
    console.log("totoooo", category);
    console.log("rr", currentUser.uid);
    console.log("amamo", amount);

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
  } catch (e) {
    console.error(e);
  }
}



/**
 * Fetches all budget documents for the current user from Firebase's Firestore database.
 *
 * @param {Object} currentUser - The Firebase `User` object representing the current user.
 * @returns {Promise<Array>} A Promise that resolves with an array of budget objects upon successful fetch.
 */

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







/**
 * Adds an expense to a budget document in Firebase's Firestore database.
 *
 * @param {Object} currentUser - The Firebase `User` object representing the current user.
 * @param {string} budgetID - The ID of the budget document to add the expense to.
 * @param {string} description - The description of the new expense.
 * @param {number} amount - The amount of the new expense.
 * @returns {Promise<void>} A Promise that resolves with void upon successful addition of the expense.
 */

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
 * Add an expense extracted from the Veryfi API to the specified budget for the current user
 * @param {Object} currentUser - The currently logged in user.
 * @param {string} budgetID - The ID of the budget to add the expense.
 * @param {Object} expenseData - An object containing the expense data to add, including type and total.
 */

export async function AddReceiptExpense(currentUser, budgetID, expenseData) {



  console.log("bbbbudgid: ", budgetID);
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







/**
 * Fetches all budget documents for the current user from Firebase's Firestore database that contain expenses.
 *
 * @param {Object} currentUser - The Firebase `User` object representing the current user.
 * @returns {Promise<QuerySnapshot>} A Promise that resolves with a `QuerySnapshot` object upon successful fetch.
 */

export async function FetchExpensive(currentUser) {

  try {
    const docRef = doc(db, 'users', currentUser.uid);
    const querySnapshot = await getDocs(collection(docRef, 'budget'));



    return querySnapshot;

  } catch (e) {



  }

}


/**
* Removes an expense from a budget document in Firebase's Firestore database.
*
* @param {Object} currentUser - The Firebase `User` object representing the current user.
* @param {string} budgetId - The ID of the budget document to remove the expense from.
* @param {number} index - The index of the expense to remove within the `expense` array.
* @returns {Promise<void>} A Promise that resolves with void upon successful removal of the expense.
*/

export async function RemoveExpense(currentUser, budgetId, index) {
  const arrayName = 'expense';

  console.log(currentUser.uid, budgetId, index);

  const budgetDocRef = doc(db, 'users', currentUser.uid, 'budget', budgetId);

  const querySnapshot = await getDoc(budgetDocRef);
  const getExpenseArray = querySnapshot.data()[arrayName];

  await updateDoc(budgetDocRef, {
    [arrayName]: getExpenseArray.filter((_, i) => i !== index)
  });

  console.log('Expense removed successfully!');
}



/**
 * Fetches a budget document by its ID for the current user from Firebase's Firestore database.
 *
 * @param {Object} currentUser - The Firebase `User` object representing the current user.
 * @param {string} budgetID - The ID of the budget document to fetch.
 * @returns {Promise<Object|null>} A Promise that resolves with the fetched budget object upon successful fetch, or null if no budget is found with the specified ID.
 */

export async function GetBudgetById(currentUser, budgetID) {

  console.log("userid", currentUser.uid);
  console.log("budget", budgetID)
  try {
    const docRef = doc(db, 'users', currentUser.uid, 'budget', budgetID.toString());
    const docSnapshot = await getDoc(docRef);
    console.log(docSnapshot);
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

      console.log("the total bugdet", budget)
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
















