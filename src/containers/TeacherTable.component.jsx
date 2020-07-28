import React, { useState } from 'react'
import TeacherTableRow from './TeacherTableRow.component'

function TeacherTable({ studentData, updateGrades, updateAssignment, updateAssignmentSet, addAssignment }) {

    const assignments = {}
    studentData.forEach(student => {
        student.assignments.forEach(assignment => assignments[assignment.id] ? null : assignments[assignment.id] = assignment.title)
    })



    console.log(assignments)

    return (
        <React.Fragment>
            <table id="teacher-table">
                <thead className="top">
                    <tr>
                        <th>Student</th>
                        {Object.keys(assignments).map((key, i) =>
                            <th key={i} className="assignment-col">{assignments[key]} {key}</th>)
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