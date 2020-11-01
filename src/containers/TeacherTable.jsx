import React from 'react'
import TeacherTableRow from './TeacherTableRow'

function TeacherTable({ studentData, currentUser, setCurrentUser }) {
    const assignments = studentData[0].assignments.sort((a,b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1: -1 ) //gets assignments of first student. All students will have same assignments

    return (
        <>
            <table id="teacher-table">
                <thead className="top">
                    <tr>
                        <th>Student</th>
                        {assignments.map((assignment, i) => {
                            return <th key={i} className="assignment-col">{assignment.title}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {studentData.sort((a,b) => a.student.name > b.student.name ? 1 : -1 ).map((student) => { 
                        return <TeacherTableRow key={student.student.school_id} currentUser={currentUser} setCurrentUser={setCurrentUser} studentData={student} assignmentOrder={assignments} /> 
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default TeacherTable