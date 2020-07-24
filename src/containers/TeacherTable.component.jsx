import React from 'react'
import TeacherTableRow from './TeacherTableRow.component'

function TeacherTable ({studentData}) {
    
    const assignments = {}
    studentData.forEach(student => {
       student.assignments.forEach( assignment => assignments[assignment.id] ?  null : assignments[assignment.id] = assignment.title )
    })
    return(
        <div>
             <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>ID</th>
                    {Object.keys(assignments).map((key, i) => 
                        <th key={i}>{assignments[key]}</th>)
                    }
                    </tr>
                </thead>
                <tbody>
                {studentData.map((student) => {return <TeacherTableRow key={student.student.school_id} studentData={student}/>})}
                </tbody>
         </table> 
        </div>
    )
}

export default TeacherTable