import React, { useState, useEffect } from 'react'
import NewAssignmentContainer from './NewAssignmentContainer'
import EditAssignmentContainer from './EditAssignmentContainer'
import AdminAssignmentCard from '../components/AdminAssignmentCard'
import { Paper, Typography, Grid, Dialog, Button } from '@material-ui/core'
import { FetchURL } from '../env/url'

function AdminPanel(){
const [assignments, setAssignments]=useState([])
const [open, setOpen]=useState(false) //new assignment modal
const [openEdit, setOpenEdit] = useState(false)
const [activeAssignment, setActiveAssignment]=useState(null) //choose and assignment for editing

    useEffect(() => {
            fetch(`${FetchURL}assignments`)
            .then(resp => resp.json())
            .then(assignments => {
            setAssignments(assignments)
            })
        }
        , [])
    
    const handleCloseEditForm=()=>{
        setOpenEdit(false)
    }

    const handleClickEdit=(a)=>{
        setActiveAssignment(a)
        setOpenEdit(true)
    }
    
    return(
        <Grid container direction="column" spacing={2} style={{marginTop: "1em"}}>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-label="create a new assignment"
            >
                <NewAssignmentContainer setOpen={setOpen} assignments={assignments} setAssignments={setAssignments} />
            </Dialog>
            <Dialog
                open={openEdit}
                onClose={() => handleCloseEditForm()}
                aria-label="edit an assignment"
            >
                <EditAssignmentContainer activeAssignment={activeAssignment} handleCloseEditForm={handleCloseEditForm} assignments={assignments} setAssignments={setAssignments} />
            </Dialog>
            <Grid item>
                <Paper style={{padding:"20px"}}>
                    <Typography align="center"variant="h2">Admin Panel</Typography>
                </Paper>
            </Grid>
            <Grid item>
                <Paper style={{padding:"20px"}}>
                    <Grid container justify="flex-start" spacing={2}>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={()=>setOpen(true)}>Create Assignment</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={()=>alert("Feature in Development")}>Add Teacher</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={()=>alert("Feature in Development")}>Export Student Grades</Button>
                        </Grid>
                    </Grid>
                    
                </Paper>
            </Grid>
            <Grid item>
                <Paper style={{padding:"20px"}}>
                    <Typography align="left" variant="h4" style={{marginBottom:".5em"}}>All Assignments</Typography>
                    <Grid container direction="row" justify = "flex-start" alignItems="flex-start" spacing= {2}>
                        {assignments.sort((a,b)=> a.title.toLowerCase()<b.title.toLowerCase()? -1 : 1).map(assignment=> <Grid item xs={6} md={4} xl={4} key={assignment.id}><AdminAssignmentCard key={assignment.id} assignment={assignment} assignments={assignments} setAssignments={setAssignments} handleClickEdit={handleClickEdit} /></Grid>)}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AdminPanel