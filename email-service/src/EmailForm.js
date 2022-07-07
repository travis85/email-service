import React, { useState } from 'react'
import axios from 'axios'
import AddNewUser from './AddNewUser'
import './App.css'
import { Form, Button } from 'react-bootstrap';




export default function EmailForm() {
    const [loading, setLoading] = useState(false)
    const [upload, setUpload] = useState('')
    // const [subject, setSubject] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')



    const submitHandler = async (e) =>{
        e.preventDefault()
        if (!email || !message) {
            return alert('please fill out fields')
        }
        try {
            setLoading(true)
            const { data } = await axios.post(`/api/email`, {
                email,
                message,
                upload
            });
            setLoading(false)
            setUpload('')
            setEmail('')
            setMessage('')

            console.log(data.message)
        } catch (err) {
            setLoading(false)
            return err.message && err.response.data.message ?
            err.response.data.message
            : err.message

        }

    }
    return (
        <>
          <div className='emailDiv border-2 border-solid border-gray-500  p-10 border-opacity-25 bg-slate-300'>
            
              <Form onSubmit={submitHandler} >
                  <p className='flex justify-center'>Email</p>
                <Form.Group className="mb-3" >
                    <Form.Label> email</Form.Label>
                    <Form.Control type="email" id='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={3} id='message' onChange={(e)=>{setMessage(e.target.value)}}/>
                </Form.Group>
                <Form.Group  className="mb-3">
                    <Form.Label>Upload</Form.Label>
                    <Form.Control type="file" id='upload'  onChange={(e)=>{setUpload(e.target.value)}}/>
                    </Form.Group>
                    
            </Form>
            <Button variant="primary" type="submit" className='mr-3' onClick={submitHandler} >Send</Button>

        </div>
          
        <div className='addUserDiv'>
            < AddNewUser />
        </div>
          
          
        </>
      
    
  
    
    )
}

