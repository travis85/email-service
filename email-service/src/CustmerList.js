import React from "react"
import { useState, useEffect, useRef } from "react"
import './App.css'
import  {firestore} from './utils/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, where, query } from "firebase/firestore"; 
import Form from 'react-bootstrap/Form';




export default function App() {
    const [notesFromDb, setNotesFromDb] = useState([])


    useEffect(() => {
        getData()

    }, [])
    
    const getData = () => {
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

    let listOfEmails = []
    const emailList = (event) => {
        if (event.target.id) {
            listOfEmails.push(event.target.value)
        }
            
    }

    const removeData = (id) => {

        // axios.delete(`${URL}/${id}`).then(res => {
        //     const del = employees.filter(employee => id !== employee.id)
        //     setEmployees(del)
        // })
    }

    const renderHeader = () => {
        const headerElement = ['id', 'first name','Last Name', 'email', 'phone', 'operation']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    let countedId = 1
    const renderBody = () => {
        return notesFromDb.map(({ id, firstName, lastName, email, phoneNumber }) => {
            return (
                <tr key={id}>
                    <td className="flex flex-row-1"><Form.Check type="checkbox" value={email} id={countedId} onClick={emailList} className="mr-3"/>{countedId++}</td>
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


