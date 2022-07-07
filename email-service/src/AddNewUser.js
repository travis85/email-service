import {useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';
import {firestore} from './utils/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, where, query, updateDoc } from "firebase/firestore"; 



export default function AddNewUser() {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');


    const [buttonLoading, setButtonLoading] = useState(false);
    const [notesFromDb, setNotesFromDb] = useState([])

  
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        uid: '',

    })
    
    useEffect(() => {

        const collectionRef = collection(firestore,"email-service")
        const queryParams = where('uid', '==', user.uid)
        const notesQuery = query(collectionRef, queryParams)
        // onsnapshot is used so the data will update itself
        onSnapshot(notesQuery, (snapshot) =>{ 

        setNotesFromDb(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id  })));
        })
        
    });

    function handleUserRecieved(user){
        console.log(user)
        setUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        uid: user.uid,
        
        })
    
    }


    function handleLogOut(){
        setUser({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        uid: '',
        })
        alert('Your logged out')

    }
   
    function firstNameSet(event){
        setfirstName(event.target.value)
    }
    function lastNameSet(event){
        setlastName(event.target.value)
    }
    function emailSet(event){
        setEmail(event.target.value)
    }
    function phoneNumberSet(event){
        setphoneNumber(event.target.value)
    }


    const onClickHandler = async () => {
        const collectionRef = collection(firestore, "email-service");
        const payload = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            uid: user.uid
        }

        await addDoc( collectionRef, payload );
        setfirstName('');
        setlastName('');
        setEmail('');
        setphoneNumber('');

    }

    const handleDelete = async(id) => {
        const docRef = doc(firestore, "email-service",id);
        await deleteDoc(docRef)
    }

    const handleEdit = async(id) => {
        const firstName = prompt('Change Your Note Here!')
        const docRef = doc(firestore,"email-service",id)
        const payload = {
        firstName: firstName
        }
        console.log(firstName)
        updateDoc(docRef, payload)
        setfirstName('');
    }



    return (
    
    <div className='border-2 border-solid border-gray-500  p-10 border-opacity-25 bg-slate-300'>
       
        <Form >
                <p className='flex justify-center'>Add User</p>
        <Form.Group className="mb-3" >
            <Form.Control type="text"  placeholder="First Name" value={firstName} id={firstName} onChange={ firstNameSet }/>
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Control type="text" placeholder="Last Name" value={lastName} id={lastName} onChange={ lastNameSet } />
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Control type="email" placeholder="Enter email" value={email} id='email'onChange={ emailSet } />
            </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Control type="text" placeholder="Phone #" value={phoneNumber} id='phoneNumber'onChange={ phoneNumberSet } />
        </Form.Group>
        
        </Form>
        <Button variant="primary" type="submit" onClick={ onClickHandler } id='submit'>
            Submit
        </Button>

  

    </div>
  )
}

