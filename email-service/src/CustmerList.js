import React from "react"
import { useState } from "react"
import axios from 'axios'
import './App.css'

const URL = 'https://jsonplaceholder.typicode.com/users'

export default function App() {
  const [employees, setEmployees] = React.useState([])
  React.useEffect(() => {
        getData()
  }, [])
  const getData = async () => {

        const response = await axios.get(URL)
        setEmployees(response.data)
    }

    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = employees.filter(employee => id !== employee.id)
            setEmployees(del)
        })
    }

    const renderHeader = () => {
        let headerElement = ['id', 'name', 'email', 'phone', 'operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return employees && employees.map(({ id, name, email, phone }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
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


