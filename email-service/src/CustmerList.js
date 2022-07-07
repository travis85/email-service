import React from "react"
import { useState, useEffect, useRef } from "react"
import './App.css'
import  {firestore} from './utils/firebase';
import { collection, onSnapshot, deleteDoc, where, query, doc } from "firebase/firestore"; 
import Form from 'react-bootstrap/Form';





export default function App() {
    const [notesFromDb, setNotesFromDb] = useState([])
    // const [check, setCheck] = useState(false);

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
    const emailList = (event) => { // check to see if arr contains id
        if (event.target.id) {
            // setCheck(prevCheck => !prevCheck);
            listOfEmails.push(event.target.value)
        } 
        
        console.log(listOfEmails)
    }

    const handleDelete = async(id) => {
        const docRef = doc(firestore, "email-service",id);
        await deleteDoc(docRef)
    }

    const renderHeader = () => {
        const headerElement = ['id', 'first name','Last Name', 'email', 'phone', 'Delete']
        return headerElement.map((key, index) => {
            return <th key={index}> {key.toUpperCase()} </th>
        })
    }

    let countedId = 1
    const renderBody = () => {
        return notesFromDb.map(({ id, firstName, lastName, email, phoneNumber }) => {
            return (
                <tr key={id} >
                    <td className=""><Form.Check type="checkbox" value={email} id={countedId} onClick={emailList} className="mr-3"/>{countedId++}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td>{phoneNumber}</td>
                    <td className='opration'>
                        <button className='delete' onClick={() => handleDelete(id)}>X</button>
                    </td>
                </tr>
            )
            
        })
        
    }

    return (
        <>
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

        </>
    )
}


