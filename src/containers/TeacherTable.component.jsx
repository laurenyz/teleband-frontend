import React, { useState } from 'react'
import TeacherTableRow from './TeacherTableRow.component'

function TeacherTable({ studentData }) {
    const [updateAssignment, updateAssignmentSet] = useState({})
    const assignments = {}
    studentData.forEach(student => {
        student.assignments.forEach(assignment => assignments[assignment.id] ? null : assignments[assignment.id] = assignment.title)
    })


    const addAssignment = (data, student_assignment_ID) => {
        console.log(data, student_assignment_ID)
        updateAssignment[student_assignment_ID] = data
        updateAssignmentSet(updateAssignment)
    }

    const handleSubmitGrades = () => {
        console.log(updateAssignment)
    }

    return (
        <React.Fragment>
            <div>
                <button onClick={handleSubmitGrades}>Submit Student Grades</button>
            </div>
            <table id="teacher-table">
                <thead className="top">
                    <tr>
                        <th>Student</th>
                        {Object.keys(assignments).map((key, i) =>
                            <th key={i} className="assignment-col">{assignments[key]}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((student) => { return <TeacherTableRow key={student.student.school_id} studentData={student} addAssignment={addAssignment} /> })}
                </tbody>
            </table>
        </React.Fragment >
    )
}

export default TeacherTable