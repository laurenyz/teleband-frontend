import React, {useEffect, useState} from 'react'
import StudentAssignCont from '../containers/StudentAssignCont.component'

function StudentPage () {
<<<<<<< HEAD
    // useEffect(() => {
    //    fetch('http://localhost:3000/students/6')
    //    .then(resp => resp.json())
    //    .then(student => console.log(student)) 
    // })
=======

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


>>>>>>> 4318c5d9b0fa4838bf425bdfdb729c8c2663922b
    return(
        <div>

            <h3 id='student-id'>
                Student Id: {studentId}
            </h3>
            <h3 id='student-name'>
                Name: {name}
            </h3>

            <div>
                {assignments.map(assign => <StudentAssignCont key={assign.id} assign={assign}/>)}
            </div>

        </div>
    )
}

export default StudentPage