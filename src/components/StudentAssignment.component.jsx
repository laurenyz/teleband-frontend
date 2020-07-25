import React, { useEffect, useState } from 'react'

function StudentAssignment(props) {

    const [assignment, setAssignment] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3000/assignments/${props.match.params.id}`)
            .then(resp => resp.json())
            .then(assign => setAssignment(assign))
    }, [props.match.params.id])

    return (
        <div>
            <h2> {assignment.title} </h2>
            <h3> {assignment.audios} </h3>
            <h3> {assignment.excerpts}</h3>
        </div>
    )
}

export default StudentAssignment