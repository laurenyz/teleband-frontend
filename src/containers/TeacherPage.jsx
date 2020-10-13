import React, { useState } from 'react'
import { Button, Dialog, Grid, Paper, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditTeacherForm from '../components/EditTeacherForm'
import TeacherTable from './TeacherTable'
import '../style/TeacherPage.css'
import { FetchURL } from '../env/url'

function TeacherPage({ currentUser, setCurrentUser }) {
    const [updateAssignment, updateAssignmentSet] = useState({})
    const [openEditTeacherForm, setOpenEditTeacherForm] = useState(false)

    const addAssignment = (data, student_assignment_ID) => {
        updateAssignment[student_assignment_ID] = data
        updateAssignmentSet(updateAssignment)
    }

    // Update call made here
    const updateGrades = () => {
        console.log(updateAssignment)
        fetch(`${FetchURL}teacher/updategrades`, {
            method: "PATCH",
            headers: {
                "Authentication": localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ updateAssignment: updateAssignment })
        }).then(resp => resp.json())
            .then(teacher => {
                setCurrentUser(teacher)
            })
    }

    return (
        <div style={{margin: "1em"}}>
            {
                currentUser ?
                    currentUser.teacher ?
                    <>
                    <Dialog
                        open={openEditTeacherForm}
                        onClose={() => setOpenEditTeacherForm(false)}
                        aria-label="edit teacher"
                    >
                    <EditTeacherForm setOpenEditTeacherForm={setOpenEditTeacherForm} activeTeacher={currentUser.teacher} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                    </Dialog>
                    <Paper style={{width:"100%", marginLeft:"auto", marginBottom:"20px", marginTop: "20px"}}>
                                    <Grid container direction = "row" justify="space-between" style={{padding: "10px"}}>
                                        <Grid item xs={12} sm={5}>
                                            <Grid container direction="column" spacing={1}>
                                                <Grid item>
                                                    <Typography variant="h5" display="inline">Name: {currentUser.teacher.name}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="h5" display="inline">Email: {currentUser.teacher.email}</Typography>
                                                </Grid>  
                                                <Grid item>
                                                    <Button variant="contained" color="secondary" onClick={()=>setOpenEditTeacherForm(true)} endIcon={<EditIcon />}>Edit Account</Button>
                                                </Grid>    
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={7}>
                                            <Grid container justify="flex-end" spacing={1}>
                                                <Grid item>
                                                    <Button variant="contained" color="secondary" onClick={()=>alert('importing students')} endIcon={<PublishIcon />}>Upload Students</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="secondary" onClick={()=>alert('exporting grades')} endIcon={<GetAppIcon />}>Download Grades</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="secondary" onClick={updateGrades}>Update Student Grades</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="secondary" onClick={()=>alert('adding single student')} endIcon={<PersonAddIcon />}>Add Single Student</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                        {/* <div id="teacher-page">
                            <div className="header">
                                filler
                            </div> */}
                            <TeacherTable studentData={currentUser.studentData} updateAssignmentSet={updateAssignmentSet} addAssignment={addAssignment} />
                        {/* </div> */}
                        </>
                    :  
                    <Paper style={{width:"100%", marginLeft:"auto", marginBottom:"20px", marginTop: "20px", padding:"20px"}}>
                        <Typography align="center" variant="h4">Please log in.</Typography>
                    </Paper>
                :
                <Paper style={{width:"100%", marginLeft:"auto", marginBottom:"20px", marginTop: "20px", padding:"20px"}}>
                    <Typography align="center" variant="h4">Please log in.</Typography>
                </Paper>
            }
        </div>
    )
}

export default TeacherPage