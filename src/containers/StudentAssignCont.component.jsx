import React from 'react';

const StudentAssignCont = (props) => {
    return (
        <div>
            <h3>{props.assign.assignment.title} {props.assign.submitted.toString()}</h3>
            <h4>{props.assign.assignment.excerpts}</h4>
        </div>
    );
}

export default StudentAssignCont;
