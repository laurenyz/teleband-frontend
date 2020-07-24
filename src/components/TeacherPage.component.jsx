import React, {useEffect} from 'react'
import {FetchURL} from '../env/url'
import TeacherTable from '../containers/TeacherTable.component'

function TeacherPage ({currentUser}) {
    useEffect(()=>{

    },[currentUser])
    console.log(currentUser)
    return(
        <React.Fragment>
        {
            currentUser ? 
            currentUser.teacher ?
            <React.Fragment>
                <div>Teacher Page</div>
                <div>Logged in as {currentUser.teacher.name}</div>
                <TeacherTable studentData={currentUser.studentData}/>
            </React.Fragment> : <div>Loading Page</div> :
            <div>Loading Page</div>
        }
        </React.Fragment>
    )
}



export default TeacherPage