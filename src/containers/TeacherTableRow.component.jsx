import React from 'react'
import TeacherTableAssignment from '../containers/TeacherTableAssignment.Component'

function TeacherTableRow({ studentData, addAssignment, assignmentOrder }) {
    let { student, assignments } = studentData
    console.log("teacher table row", assignments)
    return (
        <React.Fragment>
            <tr id="student-row">
                <td >
                    <div className="student-col">
                        <div>
                            Name: {student.name}
                        </div>
                        <div>
                            School ID: {student.school_id}
                        </div>
                    </div>
                </td>
                {/* We're assuming that every student gets the same set of assignments here */}
                {assignments.sort((a, b) => a.id > b.id).map((assignment, i) => {
                    return (
                        <td key={i}>
                            <TeacherTableAssignment assignmentDetail={assignment} addAssignment={addAssignment} />
                        </td>)
                }
                )}
            </tr>
        </React.Fragment>
    )
}

export default TeacherTableRow