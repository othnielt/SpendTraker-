import React, { useRef, useState } from "react"
import { Form, Card, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from "../Provider/AuthContext"
import { useNavigate, Link, } from "react-router-dom";






export default function Signup() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const navigator = useNavigate();
  const passwordConfirmRef = useRef()
  const { RegisterUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function submitHandle(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }


    try {
      setError("")
      setLoading(true)

      await RegisterUser(emailRef.current.value, passwordRef.current.value)
      navigator("/RenderingCard")
    } catch (e) {

      console.log(e);
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>

        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>

            <Card.Body>

              <h2 className="text-center mb-4"> Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}


              <Form onSubmit={submitHandle}>

                <Form.Group id="email">

                  <Form.Label> Email </Form.Label>
                  <Form.Control type="email" id="email" ref={emailRef} required />
                </Form.Group>

                <p style={{ height: 1 }}></p>
                <Form.Group id="password">
                  <Form.Label> Password </Form.Label>
                  <Form.Control type="password" id="password" ref={passwordRef} required />
                </Form.Group>

                <p style={{ height: 1 }}></p>
                <Form.Group id="password-confirm">
                  <Form.Label> Confirm Password </Form.Label>
                  <Form.Control type="password" id="password-confirm" ref={passwordConfirmRef} />

                </Form.Group>

                <p style={{ height: 20 }}></p>

                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>

                <p style={{ height: 1 }}></p>
              </Form>
            </Card.Body>
          </Card>


          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>


        </div>


      </Container>

    </>

  );
}