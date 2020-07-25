import React from 'react'
import TeacherTableRow from './TeacherTableRow.component'

function TeacherTable({ studentData }) {

    const assignments = {}
    studentData.forEach(student => {
        student.assignments.forEach(assignment => assignments[assignment.id] ? null : assignments[assignment.id] = assignment.title)
    })
    return (

        <table id="teacher-table">
            <thead className="top">
                <tr>
                    <th className="name-col">Name</th>
                    <th className="school-id-col">ID</th>
                    {Object.keys(assignments).map((key, i) =>
                        <th key={i} className="assignment-col">{assignments[key]}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {studentData.map((student) => { return <TeacherTableRow key={student.student.school_id} studentData={student} /> })}
            </tbody>
        </table>

    )
}

export default TeacherTable