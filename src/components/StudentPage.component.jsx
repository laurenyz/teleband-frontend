import React, { useEffect, useState } from 'react'
import StudentAssignmentTable from '../containers/StudentAssignmentTable'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import '../style/StudentPage.style.css'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

function StudentPage({ currentUser, clearUserStates }) {

    const history = useHistory();

    return (
        <div style={{width: "70%", margin:"auto"}}>
            {
                currentUser ?
                    currentUser.student_assignments ?
                        <div >
                            <Paper style={{width:"100%", marginLeft:"auto", marginBottom:"20px", marginTop: "20px"}}>
                                <Grid container direction = "row" justify="space-between" style={{padding: "10px"}}>
                                    <Grid item>
                                    <Typography variant="h5" display="inline">Name: {currentUser.name}</Typography>
                                    </Grid>
                                <Grid item>
                                <Typography variant="h5" display="inline" style={{margin:"40px"}}>Student ID: {currentUser.school_id}</Typography>
                                </Grid>
                                
                                </Grid>
                                
                            </Paper>
                            <StudentAssignmentTable currentUser={currentUser} />
                        </div > 
                        :<div>
                            No Assignments Found
                        </div> 
                    :<div>
                        Loading Page current user is null
                    </div>
                }
        </div>
    )
}

export default StudentPage
