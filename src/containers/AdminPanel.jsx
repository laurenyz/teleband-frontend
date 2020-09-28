import React, { useState, useEffect } from 'react'
import NewAssignmentContainer from './NewAssignmentContainer'
import AdminAssignmentsList from '../components/AdminAssignmentsList'
import { Paper, Typography, Grid, Dialog, Button } from '@material-ui/core'
import { FetchURL } from '../env/url'

function AdminPanel(){
const [assignments, setAssignments]=useState([])
const [open, setOpen]=useState(false) //new assignment modal

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
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-label="create a new assignment"
            >
                <NewAssignmentContainer assignments={assignments} setAssignments={setAssignments} />
            </Dialog>
            <Grid item>
                <Paper style={{padding:"20px"}}>
                    <Typography align="center"variant="h2">Admin Panel</Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper style={{padding:"20px"}}>
                    <Button variant="contained" color="secondary" onClick={()=>setOpen(true)}>Create Assignment</Button>
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