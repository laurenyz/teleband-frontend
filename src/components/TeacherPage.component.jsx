import React, {useEffect} from 'react'
import {FetchURL} from '../env/url'

function TeacherPage ({currentUser}) {
    console.log(currentUser)
    return(
        <React.Fragment>
            <div>Teacher Page</div>
            <div>Logged in as {currentUser.name}</div>
        </React.Fragment>
    )
}



export default TeacherPage