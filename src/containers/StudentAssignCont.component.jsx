import React from 'react';
import {useHistory} from 'react-router-dom'

const StudentAssignCont = (props) => {
    const history = useHistory();

    const handleAssignClick = () => {
        console.log(props.assign.assignment.id)
        history.push(`/assignment/${props.assign.assignment.id}`)
    }

    return (
        <div onClick={() => handleAssignClick()} id={props.assign.assignment.id}>
            <h3>{props.assign.assignment.title} {props.assign.submitted.toString()}</h3>
            <h4>{props.assign.assignment.excerpts}</h4>
        </div>
    );
}

export default StudentAssignCont;
