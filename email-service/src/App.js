import React from 'react'
import CustomerList from './CustmerList.js'
import EmailForm from './EmailForm.js'
import AddNewUser from './AddNewUser.js'
import './App.css'

export default function App() {
  return (
    
    <div className='grid grid-cols-2 m-2'>
      <div>
        < CustomerList />
      </div>
      
      <div>
      < EmailForm />
      < AddNewUser />
      </div>
     

    </div>

 
  )
}
