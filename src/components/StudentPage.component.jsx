import React, { useEffect, useState } from 'react'
import StudentAssignCont from '../containers/StudentAssignCont.component'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'

function StudentPage({ currentUser, clearUserStates }) {

    const history = useHistory();
    const [name, setName] = useState(undefined);
    const [studentId, setStudentId] = useState(undefined);
    const [assignments, setAssignments] = useState(undefined);

    function handleLogout() {
        clearUserStates()
        history.push('/')
    }

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name)
            setStudentId(currentUser.school_id)
            setAssignments(currentUser.student_assignments)
        }
    }, [currentUser])

    if (!assignments) {
        return (
            <div>
                Loading
            </div>
        )
    } else {
        return (
            <div>
                < Button onClick={handleLogout} >
                    Logout
               </Button >
                <Grid container>
                    <Grid item xs={3}>
                        <h3 id='student-id'>
                            Student Id: {studentId}
                        </h3>
                    </Grid>
                    <Grid item xs={3}>
                        <h3 id='student-name'>
                            Name: {name}
                        </h3>
                    </Grid>
                </Grid>

                <div>
                    <Grid container>
                        <Grid item xs={8}>
                            <h2>Assignments</h2>
                        </Grid>
                        <Grid item xs={3}>
                            <h2>Submitted</h2>
                        </Grid>
                    </Grid>
                    {assignments.map(assign =>
                        <StudentAssignCont key={assign.id} assign={assign} />
                    )}
                </div>
            </div >
        )
    }

}

export default StudentPage
