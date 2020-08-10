import React from 'react'
import TeacherTableRow from './TeacherTableRow.component'

function TeacherTable({ studentData, addAssignment }) {

    let assignments = []
    let assignmentTitles = []
    let allAssignments = []

    studentData.forEach(student => {
        student.assignments.sort((a, b) => a.id > b.id).forEach(assignment => assignments.includes(assignment.id) ? (null) : (assignments.push(assignment.id), assignmentTitles.push(assignment.title)))
    })

    allAssignments.sort((a, b) => a.id > b.id).forEach(assignment => assignments.includes(assignment.id) ? (null) : (assignments.push(assignment.id), assignmentTitles.push(assignment.title)))




    return (
        <React.Fragment>
            <table id="teacher-table">
                <thead className="top">
                    <tr>
                        <th>Student</th>
                        {assignmentTitles.map((title, i) =>
                            <th key={i} className="assignment-col">{title}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((student) => { return <TeacherTableRow key={student.student.school_id} studentData={student} addAssignment={addAssignment} assignmentOrder={assignments} /> })}
                </tbody>
            </table>
        </React.Fragment >
    )
}

export default TeacherTable