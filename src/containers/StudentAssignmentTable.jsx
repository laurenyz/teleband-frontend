// import React from 'react';
// import { useHistory } from 'react-router-dom'
// import Grid from '@material-ui/core/Grid'

// const StudentAssignCont = (props) => {
//     const history = useHistory();

//     const handleAssignClick = () => {
//         console.log(props.assign.assignment.id)
//         history.push(`/assignments/${props.assign.assignment.id}`)
//     }

//     return (
//         <div>

//             <Grid container id={props.assign.assignment.id}>
//                 <Grid onClick={() => handleAssignClick()} item xs={8}>
//                     <h3>{props.assign.assignment.title} </h3>
//                     <h4>{props.assign.assignment.excerpts}</h4>
//                 </Grid>
//                 <Grid item xs={3}>
//                     <h3>{props.assign.student_audio===""?"False":"True"}</h3>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }

// export default StudentAssignCont;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
});

function createData(assignment, submitted, assignmentId) {
  return { assignment, submitted, assignmentId };
}

function StudentAssignmentTable({currentUser}) {
  const classes = useStyles();
  const history = useHistory();

  const handleClickAssignment = (assignmentId) => {
      history.push(`/assignments/${assignmentId}`)
    }
    
  const rows = currentUser.student_assignments.map(a => {
    const submitted = a.student_audio !== ""
    return createData(a.assignment.title, submitted, a.assignment.id)
  })

  return (
    <div>
      {currentUser?
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="assignment-table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}} >ASSIGNMENTS</TableCell>
              <TableCell style={{fontWeight: "bold"}} align="center">SUBMITTED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.assignment} style = {{cursor: "pointer"}} onClick={() => handleClickAssignment(row.assignmentId)}>
                <TableCell component="th" scope="row">{row.assignment}</TableCell>
                <TableCell align="center">{row.submitted?<CheckCircleIcon style={{color: "#4caf50"}}/>:<RadioButtonUncheckedIcon />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      :null}
      </div>
  );
}

export default StudentAssignmentTable