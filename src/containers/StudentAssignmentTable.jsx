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

function createData(assignment, submitted) {
  return { assignment, submitted};
}

function StudentAssignmentTable({currentUser}) {
  const classes = useStyles();
  const history = useHistory();

  const handleClickAssignment = (assignmentId) => {
      history.push(`/assignments/${assignmentId}`)
    }
    
  const rows = currentUser.student_assignments.map(a => {
    const submitted = a.student_audio !== ""
    return createData(a.assignment, submitted)
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
            {rows.sort((a,b)=> a.assignment.title.toLowerCase()<b.assignment.title.toLowerCase()? -1 : 1).map((row) => (
              <TableRow key={row.assignment.id} style = {{cursor: "pointer"}} onClick={() => handleClickAssignment(row.assignment.id)}>
                <TableCell component="th" scope="row">{row.assignment.title}</TableCell>
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