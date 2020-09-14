import React from 'react'
import AddAssignmentForm from '../components/NewAssignmentForm.componenet'
import AdminAssignmentsList from '../components/AdminAssignmentsList.component'
import {Typography} from '@material-ui/core'

function AdminPanel(){
    return(
        <div>
            <Typography variant="h4">Add an Assignment</Typography>
            <AddAssignmentForm />
            <Typography variant="h4">Current Assignments</Typography>
            <AdminAssignmentsList />
        </div>
    )
}

export default AdminPanel