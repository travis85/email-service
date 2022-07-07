import React, { useState } from 'react'
import CustomerList from './CustmerList.js'
import EmailForm from './EmailForm.js'
import './LogIn.css'
import './App.css'

export default function App() {
  return (
    <>
    <div className='grid grid-cols-2 mt-48'>
        
      <div className='mt-24'>
        < EmailForm />
      </div>

      <div className='mt-24' >
        < CustomerList />
      </div>
      
     

    </div>

    </>

 
  )
}
