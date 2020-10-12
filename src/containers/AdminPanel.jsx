import React, { useState, useEffect } from 'react'
import NewAssignmentContainer from './NewAssignmentContainer'
import EditAssignmentContainer from './EditAssignmentContainer'
import NewTeacherForm from '../components/NewTeacherForm'
import EditTeacherForm from '../components/EditTeacherForm'
import AdminAssignmentCard from '../components/AdminAssignmentCard'
import AdminTeacherCard from '../components/AdminTeacherCard'
import { Paper, Typography, Grid, Dialog, Button } from '@material-ui/core'
import { FetchURL } from '../env/url'

function AdminPanel(){
const [assignments, setAssignments]=useState([])
const [teachers, setTeachers]=useState([])
const [openAssignmentForm, setOpenAssignmentForm]=useState(false) //new assignment modal
const [openTeacherForm, setOpenTeacherForm]=useState(false)
const [openAssignmentFormEdit, setOpenAssignmentFormEdit]=useState(false)
const [openEditTeacherForm, setOpenEditTeacherForm]=useState(false)
const [activeAssignment, setActiveAssignment]=useState(null) //choose and assignment for editing
const [activeTeacher, setActiveTeacher]=useState(null)

    useEffect(() => {
        fetch(`${FetchURL}assignments`)
        .then(resp => resp.json())
        .then(assignments => {
        setAssignments(assignments)
        })
        fetch(`${FetchURL}teachers`)
        .then(resp => resp.json())
        .then(teachers => {
        setTeachers(teachers)
        })
    }
    , [])
    
    const handleCloseEditAssignmentForm=()=>{
        setOpenAssignmentFormEdit(false)
    }

    const handleClickEditAssignment=(a)=>{
        setActiveAssignment(a)
        setOpenAssignmentFormEdit(true)
    }

    const handleClickEditTeacher=(t)=>{
        setActiveTeacher(t)
        setOpenEditTeacherForm(true)
    }
    
    return(
        <Grid container direction="column" spacing={2} style={{marginTop: "1em"}}>
            <Dialog
                open={openAssignmentForm}
                onClose={() => setOpenAssignmentForm(false)}
                aria-label="create a new assignment"
            >
                <NewAssignmentContainer setOpenAssignmentForm={setOpenAssignmentForm} assignments={assignments} setAssignments={setAssignments} />
            </Dialog>
            <Dialog
                open={openAssignmentFormEdit}
                onClose={() => handleCloseEditAssignmentForm()}
                aria-label="edit assignment"
            >
                <EditAssignmentContainer activeAssignment={activeAssignment} handleCloseEditAssignmentForm={handleCloseEditAssignmentForm} assignments={assignments} setAssignments={setAssignments} />
            </Dialog>
            <Dialog
                open={openTeacherForm}
                onClose={() => setOpenTeacherForm(false)}
                aria-label="add a new teacher"
            >
                <NewTeacherForm setOpenTeacherForm={setOpenTeacherForm} teachers={teachers} setTeachers={setTeachers} />
            </Dialog>
            <Dialog
                open={openEditTeacherForm}
                onClose={() => setOpenEditTeacherForm(false)}
                aria-label="edit teacher"
            >
                <EditTeacherForm setOpenEditTeacherForm={setOpenEditTeacherForm} teachers={teachers} setTeachers={setTeachers} activeTeacher={activeTeacher} />
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
                            <Button variant="contained" color="secondary" onClick={()=>setOpenAssignmentForm(true)}>Create Assignment</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={()=>setOpenTeacherForm(true)}>Add Teacher</Button>
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
                        {assignments.sort((a,b)=> a.title.toLowerCase()<b.title.toLowerCase()? -1 : 1).map(assignment=> <Grid item xs={6} md={4} xl={4} key={assignment.id}><AdminAssignmentCard key={assignment.id} assignment={assignment} assignments={assignments} setAssignments={setAssignments} handleClickEditAssignment={handleClickEditAssignment} /></Grid>)}
                    </Grid>
                </Paper>
            </Grid>
            <Grid item>
                <Paper style={{padding:"20px"}}>
                    <Typography align="left" variant="h4" style={{marginBottom:".5em"}}>All Teachers</Typography>
                    <Grid container direction="row" justify = "flex-start" alignItems="flex-start" spacing= {2}>
                        {teachers.sort((a,b)=> a.name.toLowerCase()<b.name.toLowerCase()? -1 : 1).map(teacher=> <Grid item xs={6} md={4} xl={4} key={teacher.id}><AdminTeacherCard key={teacher.id} teacher={teacher} teachers={teachers} setTeachers={setTeachers} handleClickEditTeacher={handleClickEditTeacher} /></Grid>)}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AdminPanel