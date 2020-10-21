import React from 'react'
import TeacherTableAssignment from '../components/TeacherTableAssignment'
import { Button, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit';

function TeacherTableRow({ studentData, addAssignment, assignmentOrder }) {
    let { student, assignments } = studentData
    let revisedOrder = []

    for (let i = 0; i < assignmentOrder.length; i++) {
        let currentAssignment = assignments.find(a => a.id === assignmentOrder[i].id)
        revisedOrder.push(currentAssignment)
    }
    
    return (
        <>
            <tr id="student-row">
                <td >
                    <div className="student-col">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <Typography>Name: {student.name}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>School ID: {student.school_id}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={()=>alert('editing student')} endIcon={<EditIcon />}>Edit Student</Button>  
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
                            </td>)
                    }
                }
                )}
            </tr>
        </>
    )
}

export default TeacherTableRow