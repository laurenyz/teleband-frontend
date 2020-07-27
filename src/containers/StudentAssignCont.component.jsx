import React from 'react';
import {useHistory} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const StudentAssignCont = (props) => {
    const history = useHistory();

    const handleAssignClick = () => {
        console.log(props.assign.assignment.id)
        history.push(`/assignment/${props.assign.assignment.id}`)
    }

    return (
        <div>
            
        <Grid container id={props.assign.assignment.id}>
            <Grid onClick={() => handleAssignClick()} item xs={8}>
            <h3>{props.assign.assignment.title} </h3>
            <h4>{props.assign.assignment.excerpts}</h4>
            </Grid>
            <Grid item xs={3}>
             <h3>{props.assign.submitted.toString()}</h3>
            </Grid>
        </Grid>
        </div>
    );
}

export default StudentAssignCont;
