import React from "react"
import { useState, useEffect } from "react"
import axios from 'axios'
import './App.css'
import  {firestore} from './utils/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, where, query, updateDoc, setDoc} from "firebase/firestore"; 



export default function App() {
    const [employees, setEmployees] = React.useState([])
    const [notesFromDb, setNotesFromDb] = useState([])

    React.useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
        const collectionRef = collection(firestore,"email-service")
        const queryParams = where('uid', '==', user.uid)
        const notesQuery = query(collectionRef, queryParams)
        // onsnapshot is used so the data will update itself
        onSnapshot(notesQuery, (snapshot) =>{ 
        setNotesFromDb(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id  })));
        })
    }
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        uid: '',

    })



    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del)
        })
    }

    const renderHeader = () => {
        let headerElement = ['id', 'first name','Last Name', 'email', 'phone', 'operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return notesFromDb.map(({ id, firstName, lastName, email, phoneNumber }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>{phoneNumber}</td>
                    <td className='opration'>
                        <button className='delete' onClick={() => removeData(id)}>Delete</button>
                        <button className='update' onClick={() => removeData(id)}>Update</button>
                    </td>
                </tr>
            )
        })
    }

  return (
    <div>
            
        <table id='employee'>
            <thead>
                <tr>{renderHeader()}</tr>
            </thead>
            <tbody>
                {renderBody()}
            </tbody>
        </table>
    </div>
  )
}


