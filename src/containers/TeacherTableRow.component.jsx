import React from 'react'
import TeacherTableAssignment from '../containers/TeacherTableAssignment.Component'

function TeacherTableRow({ studentData, addAssignment, assignmentOrder }) {
    let { student, assignments } = studentData
    let revisedOrder = []

    for (let i = 0; i < assignmentOrder.length; i++) {
        let current = assignments.find(object => object.id === assignmentOrder[i])

        if (current) {
            revisedOrder.push(current)
        } else {
            revisedOrder.push(undefined)
        }

    }

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

                {revisedOrder.map((assignment, i) => {
                    if (!assignment) {
                        return (
                            <td key={i}><div className="not-assigned">Not Assigned</div></td>
                        )
                    } else {
                        return (
                            <td key={i}>
                                <TeacherTableAssignment assignmentDetail={assignment} addAssignment={addAssignment} />
                            </td>)
                    }
                }
                )}
            </tr>
        </React.Fragment>
    )
}

export default TeacherTableRow