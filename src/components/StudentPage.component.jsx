import React, {useEffect} from 'react'

function StudentPage () {
    useEffect(() => {
       fetch('http://localhost:3000/students/6')
       .then(resp => resp.json())
       .then(student => console.log(student)) 
    })
    return(
        <div>Student Page</div>
    )
}

export default StudentPage