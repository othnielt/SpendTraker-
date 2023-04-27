import React, { useRef, useState } from "react"
import {Form,Card,Button, Container,Alert} from 'react-bootstrap';
import {  useNavigate,Link,} from "react-router-dom";
import { useAuth } from "../Provider/AuthContext"




export default function Login(){

    const  emailRef = useRef();
    const  passwordRef = useRef();
    const navigator = useNavigate();
    const {  LogInWithEMailPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    async function submitHandle(e) {
        e.preventDefault()
    
        try {
          setError("")
          setLoading(true);

          console.log(emailRef.current.value)
          console.log( passwordRef.current.value)
          await  LogInWithEMailPassword(emailRef.current.value, passwordRef.current.value)
          navigator("/RenderingCard")
        } catch {
          setError("Failed to log in")
        }
    
        setLoading(false)
      }



    return (
        <>
     <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "70vh"}}> 

     <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>

        <Card.Body>

            <h2 className="text-center mb-4"> Log in</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={submitHandle}>

                <Form.Group id ="email">

                    <Form.Label> Email </Form.Label>
                    <Form.Control type="email"  id="email" ref={emailRef} required />
                </Form.Group>

                <p style={{height:1}}></p>
                <Form.Group id ="password">
                    <Form.Label> Password </Form.Label>
                    <Form.Control type="password"  id="password" ref={passwordRef} required />
                </Form.Group>

               
                <p style={{height:20}}></p>

                <Button  disabled={loading}  className="w-100" style= {{height:50}} type="submit"> Log In </Button>

                <p style={{height:1}}></p>
            </Form>
        </Card.Body>
        </Card>


        <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>

        </div>


        </Container>

        </>
        
    );
}





