import React, { useState } from 'react'
import TeacherTable from '../containers/TeacherTable.component'
import { useHistory } from 'react-router-dom'
import '../style/TeacherPage.style.css'
import { FetchURL } from '../env/url'

function TeacherPage({ currentUser, clearUserStates, setCurrentUser }) {
    const [updateAssignment, updateAssignmentSet] = useState({})
    let history = useHistory();
    // function handleLogout() {
    //     clearUserStates()
    //     history.push('/')
    // }

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
                                    {/* <button className="logout-btn" onClick={handleLogout}>Log Out</button> */}
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