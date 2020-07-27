import React, {useEffect, useState} from 'react'
import StudentAssignCont from '../containers/StudentAssignCont.component'
import Grid from '@material-ui/core/Grid'

function StudentPage () {

    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
       fetch('http://localhost:3000/students/5')
       .then(resp => resp.json())
       .then(student => {
           setName(student.name)
           setStudentId(student.school_id)
           setAssignments(student.student_assignments)
       }) 
    }, [])

    return(
        <div>
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
                     <StudentAssignCont key={assign.id} assign={assign}/>
                    )}
            </div>

        </div>
    )
}

export default StudentPage
