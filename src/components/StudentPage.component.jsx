import React, {useEffect, useState} from 'react'
import StudentAssignCont from '../containers/StudentAssignCont.component'

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


