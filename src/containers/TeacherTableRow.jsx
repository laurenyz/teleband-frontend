import React, { useState } from 'react'
import TeacherTableAssignment from '../components/TeacherTableAssignment'
import EditStudentForm from '../components/EditStudentForm'
import { FetchURL } from '../env/url'
import { Dialog, Grid, IconButton, Typography } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


function TeacherTableRow({ studentData, addAssignment, assignmentOrder, currentUser, setCurrentUser }) {
    const [openEditStudentForm, setOpenEditStudentForm] = useState(false)
    const { student, assignments } = studentData
    const revisedOrder = []

    for (let i = 0; i < assignmentOrder.length; i++) {
        let currentAssignment = assignments.find(a => a.id === assignmentOrder[i].id)
        revisedOrder.push(currentAssignment)
    }

    const handleDeleteStudent = () => {
        let response = window.confirm(
          `Permanently remove "${student.name}" from the database?`
        )
        return response ? 
        fetch(`${FetchURL}students/${student.id}`,{
                 method: "DELETE"
             })
             .then(resp => resp.json())
             .then((json) => {
                if(json.error){
                    alert(json.error)
                } else {
                    const newStudentData = currentUser.studentData.filter(s=>s.student.id!==student.id)
                    setCurrentUser({...currentUser, studentData: newStudentData})
                    alert(json.message)
                }   
             }) 
        :null;
      }   
    
    return (
        <>
            <Dialog
                open={openEditStudentForm}
                onClose={() => setOpenEditStudentForm(false)}
                aria-label="edit student"
            >
                <EditStudentForm setOpenEditStudentForm={setOpenEditStudentForm} student={student} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </Dialog>
            <tr>
                <td>
                    <div className="student-col" >
                        <Grid container direction="column" >
                            <Grid item>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <IconButton aria-label="edit assignment" color="secondary" onClick={()=> setOpenEditStudentForm(true)}>
                                            <EditIcon />
                                        </IconButton> 
                                    </Grid>
                                    <Grid item>
                                        <IconButton aria-label="delete assignment" color="secondary" onClick={()=> handleDeleteStudent(student)}>
                                            <DeleteIcon />
                                        </IconButton>  
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">Name: {student.name}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>Grade: {student.grade}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{fontWeight:"bold"}}>ID: {student.school_id}</Typography>
                            </Grid>
                        </Grid>
                    </div>
                </td>

                {revisedOrder.map((assignment, i) => {
                    if (!assignment) {
                        return (
                            <td key={i}><div className="not-assigned">Not Assigned</div></td>
                        )
                    } else {
                        return (
                            <td key={i}>
                                <TeacherTableAssignment assignmentDetail={assignment} addAssignment={addAssignment} />
                            </td>
                        )
                    }
                }
                )}
            </tr>
        </>
    )
}

export default TeacherTableRow