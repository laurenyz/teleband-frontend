import React, { useState, useEffect } from 'react'
import NewAssignmentContainer from './NewAssignmentContainer'
import AdminAssignmentCard from '../components/AdminAssignmentCard'
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
                <NewAssignmentContainer setOpen={setOpen} assignments={assignments} setAssignments={setAssignments} />
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
                    <Typography align="center" variant="h4" style={{marginBottom:"1em"}}>Current Assignments</Typography>
                    <Grid container direction="row" justify = "flex-start" alignItems="flex-start" spacing= {2}>
                        {assignments.sort((a,b)=> a.title.toLowerCase()<b.title.toLowerCase()? -1 : 1).map(assignment=> <Grid item xs={6} md={4} xl={4} key={assignment.id}><AdminAssignmentCard key={assignment.id} assignment={assignment} assignments={assignments} setAssignments={setAssignments} /></Grid>)}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AdminPanel