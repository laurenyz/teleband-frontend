import React, { useState, useEffect } from 'react'
import NewAssignmentContainer from './NewAssignmentContainer'
import AdminAssignmentsList from '../components/AdminAssignmentsList'
import { Paper, Typography, Grid } from '@material-ui/core'
import { FetchURL } from '../env/url'

function AdminPanel(){
const [assignments, setAssignments]=useState([])

useEffect(() => {
        fetch(`${FetchURL}assignments`)
        .then(resp => resp.json())
        .then(assignments => {
        setAssignments(assignments)
        })
    }
    , [])
    
    return(
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Paper style={{padding:"20px"}}>
                    <Typography align="center"variant="h2">Admin Panel</Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper style={{padding:"20px"}}>
                    <Typography align="center" variant="h4">Add an Assignment</Typography>
                    <NewAssignmentContainer assignments={assignments} setAssignments={setAssignments} />
                </Paper>
            </Grid>
            <Grid item>
                <Paper style={{padding:"20px"}}>
                    <Typography align="center" variant="h4">Current Assignments</Typography>
                    <AdminAssignmentsList assignments={assignments} setAssignments={setAssignments}/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AdminPanel