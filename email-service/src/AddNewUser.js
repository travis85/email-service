import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css'


export default function AddNewUser() {
  return (
    <div>

        <Form>
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Control type="text" placeholder="First Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
                <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            <Form.Group className="mb-3" controlId="firstName">
                <Form.Control type="text" placeholder="Phone #" />
            </Form.Group>

            
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
  

    </div>
  )
}

