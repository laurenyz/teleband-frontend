import React, { useEffect, useState } from 'react'
import StudentAssignmentTable from '../components/StudentAssignmentTable'
import { useHistory } from 'react-router-dom'
import '../style/StudentPage.css'
import { Typography, Grid, Button, Paper } from '@material-ui/core/'

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
