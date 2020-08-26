import React, { useEffect, useState } from 'react'
import StudentAssignCont from '../containers/StudentAssignCont.component'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import '../style/StudentPage.style.css'

function StudentPage({ currentUser, clearUserStates }) {

    const history = useHistory();
    function handleLogout() {
        clearUserStates()
        history.push('/')
    }

    return (
        <React.Fragment>
            {
                currentUser ?
                    currentUser.student_assignments ?
                        <div id="student-page">
                            <div className="header">
                                <div className="user-info">
                                    <h3 id='student-id'>
                                        Student Id: {currentUser.school_id}
                                    </h3>
                                    <h3 id='student-name'>
                                        Name: {currentUser.name}
                                    </h3>
                                </div>
                                {/* <div>
                                    <Button onClick={handleLogout} >
                                        Logout
                                    </Button >
                                </div> */}
                            </div>
                            <div>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <h2>Assignments</h2>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <h2>Submitted</h2>
                                    </Grid>
                                </Grid>
                                {currentUser.student_assignments.map(assign =>
                                    <StudentAssignCont key={assign.id} assign={assign} />
                                )}
                            </div>
                        </div > : <div>Loading Page no student assignments</div> :
                    <div>Loading Page current user is null</div>}

        </React.Fragment>
    )


}

export default StudentPage
