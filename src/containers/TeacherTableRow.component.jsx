import React from 'react'
import TeacherTableAssignment from '../containers/TeacherTableAssignment.Component'

function TeacherTableRow({ studentData, addAssignment }) {
    let { student, assignments } = studentData
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
                {assignments.map((assignment, i) => {
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