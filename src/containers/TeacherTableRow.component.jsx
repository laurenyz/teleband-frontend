import React from 'react'

function TeacherTableRow ({studentData}){
    let {student, assignments} = studentData

    return(
        <React.Fragment>
            <tr>
                <td>{student.name}</td>
                <td>{student.school_id}</td>
                {assignments.map((assignment) => 
                {   
                    const {student_assignment:submission, assignmentDetail} = assignment
                    console.log(submission)
                    return(
                    <td>
                        <div>
                        {submission.submitted ? <button>Play button</button> : "not complete"}
                        </div>
                        <div>
                            Grading goes here
                        </div>
                    </td>)}
                )}
            </tr>
        </React.Fragment>
    )
}

export default TeacherTableRow