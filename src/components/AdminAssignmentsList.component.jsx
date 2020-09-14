import React, { useEffect, useState } from 'react'
import { FetchURL } from '../env/url'

function AdminAssignmentsList(){
  const [assignments, setAssignments]=useState([])

  useEffect(() => {
        fetch(`${FetchURL}assignments`)
        .then(resp => resp.json())
        .then(assignments => {
          setAssignments(assignments)
        })
      }
      , [])

  const handleDelete = (assignment) => {
    console.log(assignment.id)
    let response = window.confirm(
      `Permanently remove "${assignment.title}" from the database?`
    )
    return response ? 
    fetch(`${FetchURL}assignments/${assignment.id}`,{
             method: "DELETE"
         })
         .then(resp => resp.json())
         .then((json) => {
            const newAssignments = assignments.filter(a => a.id !== assignment.id)
            setAssignments(newAssignments)
            console.log(json.message)
         }) : 
    null;
  }   
      
  return(
    <div>
      <ul>
        {assignments.sort((a,b)=> a.title.toLowerCase()<b.title.toLowerCase()? -1 : 1).map(a => {
          return (
            <li key={a.id}>
              {a.title}
              <button style={{margin: "5px"}} onClick={() => handleDelete(a)}>x</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default AdminAssignmentsList