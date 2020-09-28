import React, { useState } from 'react'
import TeacherTable from './TeacherTable'
import '../style/TeacherPage.css'
import { FetchURL } from '../env/url'

function TeacherPage({ currentUser, setCurrentUser }) {
    const [updateAssignment, updateAssignmentSet] = useState({})

    const addAssignment = (data, student_assignment_ID) => {
        updateAssignment[student_assignment_ID] = data
        updateAssignmentSet(updateAssignment)
    }

    // Update call made here
    const updateGrades = () => {
        console.log(updateAssignment)
        fetch(`${FetchURL}teacher/updategrades`, {
            method: "PATCH",
            headers: {
                "Authentication": localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ updateAssignment: updateAssignment })
        }).then(resp => resp.json())
            .then(teacher => {
                setCurrentUser(teacher)
            })
    }

    return (
        <React.Fragment>
            {
                currentUser ?
                    currentUser.teacher ?
                        <React.Fragment>
                            <div id="teacher-page">
                                <div className="header">
                                    <div>Logged in as {currentUser.teacher.name}</div>
                                    <div><button onClick={updateGrades} className="update-btn">Update Student Grades</button>
                                    </div>
                                </div>
                                <TeacherTable studentData={currentUser.studentData} updateAssignmentSet={updateAssignmentSet} addAssignment={addAssignment} />

                            </div>
                        </React.Fragment> : <div>Loading Page</div> :
                    <div>Loading Page</div>
            }
        </React.Fragment>
    )
}

export default TeacherPage