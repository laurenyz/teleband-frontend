import React from 'react'
import TeacherTable from '../containers/TeacherTable.component'
import { useHistory } from 'react-router-dom'
import '../style/TeacherPage.style.css'

function TeacherPage({ currentUser, clearUserStates }) {
    let history = useHistory();
    function handleLogout() {
        clearUserStates()
        history.push('/')
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
                                    <div><button className="update-btn">Update Student Grades</button><button className="logout-btn" onClick={handleLogout}>Log Out</button></div>
                                </div>
                                <TeacherTable studentData={currentUser.studentData} />

                            </div>
                        </React.Fragment> : <div>Loading Page</div> :
                    <div>Loading Page</div>
            }
        </React.Fragment>
    )
}



export default TeacherPage