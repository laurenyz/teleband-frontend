import React from 'react'
import NewAssignmentForm from '../components/NewAssignmentForm'

function NewAssignmentContainer({assignments, setAssignments}){
    return(
        <div>
            <NewAssignmentForm assignments={assignments} setAssignments={setAssignments}/>
        </div>
    )
}

export default NewAssignmentContainer