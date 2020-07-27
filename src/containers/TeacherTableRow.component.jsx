import React from 'react'
import TeacherTableAssignment from '../containers/TeacherTableAssignment.Component'

function TeacherTableRow({ studentData }) {
    let { student, assignments } = studentData
    return (
        <React.Fragment>
            <tr id="student-row">
                <td>{student.name}</td>
                <td>{student.school_id}</td>
                {assignments.map((assignment, i) => {
                    return (
                        <td key={i}>
                            <TeacherTableAssignment assignmentDetail={assignment} />
                        </td>)
                }
                )}
            </tr>
        </React.Fragment>
    )
}

export default TeacherTableRow