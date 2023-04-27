
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection,setDoc, doc } from "firebase/firestore";



const AuthContext = React.createContext()



export function useAuth() {
  return useContext(AuthContext)
}


export function AuthProvider({ children }) {    


  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true)

/**
 * Registers a new user account using the provided email and password.
 * 
 * @param {string} email - The email address of the user to be registered.
 * @param {string} password - The password to be used for the user account.
 * @returns {Promise} A Promise that resolves with a userCredential object upon successful account creation.
 */

  function RegisterUser(email, password) {

    console.log(email)
    console.log(password)
    return auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {

      const usersCollectionRef = collection(db, 'users');
      const userDocRef = doc(usersCollectionRef, userCredential.user.uid);

      setDoc(userDocRef, {
        email: userCredential.user.email,

      }) 

      setCurrentUser(userCredential);  // currentUser

    })


  }


/**
 * Logs in an existing user with the provided email and password.
 * 
 * @param {string} email - The email address of the user to be logged in.
 * @param {string} password - The password for the user account.
 * @returns {Promise} A Promise that resolves with a userCredential object upon successful login.
 */

  function LogInWithEMailPassword(email, password) {

    console.log(email)
    console.log(password)

    const userCredential = auth.signInWithEmailAndPassword(email, password)

    setCurrentUser(userCredential);  // currentUser

  }

  
  /**
 * Updates the email address of the currently authenticated user.
 * 
 * @param {string} email - The new email address for the user.
 * @returns {Promise<void>} A Promise that resolves with void upon successful email update.
 */

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  /**
 * Logs out the currently authenticated user.
 * 
 * @returns {Promise<void>} A Promise that resolves with void upon successful user logout.
 */


  function LogOut() {

    return auth.signOut();
  }


// listen for changes in the authentication state
  useEffect(() => {
    const userState = auth.onAuthStateChanged(userCredential=> {
      setCurrentUser(userCredential)
      setLoading(false)
    })

    return userState
  }, [])



  const value = {

    RegisterUser,
    LogInWithEMailPassword,
    LogOut,
    updateEmail,
    currentUser



  }
// Render the child components with the context value

  return (

    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>


  );




}

