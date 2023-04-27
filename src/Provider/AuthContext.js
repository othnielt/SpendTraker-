
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";



const AuthContext = React.createContext()



export function useAuth() {
  return useContext(AuthContext)
}


export function AuthProvider({ children }) {    


  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true)

// Function to register a new user with email and password
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
 // Function to log in an existing user with email and password
  function LogInWithEMailPassword(email, password) {

    console.log(email)
    console.log(password)

    const userCredential = auth.signInWithEmailAndPassword(email, password)

    setCurrentUser(userCredential);  // currentUser

  }

  // Function to update the current user's email
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  // log out the current user
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

