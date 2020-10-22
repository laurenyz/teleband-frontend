import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({studentData}) {
  const classes = useStyles();

  const assignments = studentData[0].assignments.sort((a,b) => a.title > b.title ? 1: -1 ) //gets assignments of first student. All students will have same assignments

  // studentData.forEach(student => {
  //     student.assignments.sort((a, b) => a.id > b.id).forEach(assignment => assignments.includes(assignment.id) ? (null) : (assignments.push(assignment.id), assignmentTitles.push(assignment.title)))
  // })

  //allAssignments.sort((a, b) => a.id > b.id).forEach(assignment => assignments.includes(assignment.id) ? (null) : (assignments.push(assignment.id), assignmentTitles.push(assignment.title)))


//   table tr th:first-child, table td:first-child{
//     position: sticky;
//     left: 0;
//     z-index: 10;
//   }

  

console.log(studentData, assignments)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="student data table">
        <TableHead>
          <TableRow style={{backgroundColor:"#123c69"}}>
            <TableCell style={{position: "sticky", left: 0, zIndex: 10, color:"#ffffff", fontWeight:"bold"}}>Student</TableCell>
            {assignments.map(a => {
              return <TableCell style={{color:"#ffffff", fontWeight:"bold"}}>{a.title}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}