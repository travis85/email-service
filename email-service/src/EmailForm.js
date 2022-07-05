import React from 'react'
import './App.css'
import { Form, Button } from 'react-bootstrap';
import AddNewUser from './AddNewUser.js'




export default function EmailForm() {
  return (
    
    <div className='emailDiv'>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label> Email Header</Form.Label>
                <Form.Control type="email"  defaultValue='User LLC' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload</Form.Label>
                <Form.Control type="file" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
          

    </div>
    
  
    
  )
}

