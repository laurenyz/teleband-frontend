import React, {useEffect} from 'react'
import {FetchURL} from '../env/url'
import TeacherTable from '../containers/TeacherTable.component'

function TeacherPage ({currentUser}) {
 
    return(
        <React.Fragment>
        {
            currentUser ? 
            <React.Fragment>
                <div>Teacher Page</div>
                <div>Logged in as {currentUser.teacher.name}</div>
                <TeacherTable studentData={currentUser.studentData}/>
            </React.Fragment> :
            <div>Loading Page</div>
        }
        </React.Fragment>
    )
}



export default TeacherPage