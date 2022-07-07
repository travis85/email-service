import React, {useState} from 'react'
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'


import React from 'react'

export default function register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showRegister, setShowRegister] = useState(false)

  return (
    <div>register</div>
  )
}
