import React,{useRef }from 'react';
import {Form,Card,Button, Container} from 'react-bootstrap';
import {  useNavigate } from "react-router-dom";



export default function Login(){

    const  emailRef = useRef()
    const  passwordRef = useRef()
    const  passwordConfirmRef = useRef()

    const navigator = useNavigate()



    return (
        <>
     <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "70vh"}}> 

     <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>

        <Card.Body>

            <h2 className="text-center mb-4"> Log in</h2>

            <Form>

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

                <Button className="w-100" style= {{height:50}} type="submit" onClick={()=>navigator("/RenderingCard")}> Sign Up </Button>

                <p style={{height:1}}></p>
            </Form>
        </Card.Body>
        </Card>


        <div className="w-100 text-center my-2">  <p> D'ont  have an acount ? Sign Up </p></div>

        </div>


        </Container>

        </>
        
    );
}





