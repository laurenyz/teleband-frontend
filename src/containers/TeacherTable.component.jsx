import React from 'react'
import TeacherTableRow from './TeacherTableRow.component'

function TeacherTable({ studentData, addAssignment }) {

    let assignments = []
    let assignmentTitles = []
    let allAssignments = []

    studentData.forEach(student => {
        student.assignments.sort((a, b) => a.id > b.id).forEach(assignment => assignments.includes(assignment.id) ? (null) : (assignments.push(assignment.id), assignmentTitles.push(assignment.title)))
    })

    allAssignments.sort((a, b) => a.id > b.id).forEach(assignment => assignments.includes(assignment.id) ? (null) : (assignments.push(assignment.id), assignmentTitles.push(assignment.title)))

    return (
        <React.Fragment>
            <table id="teacher-table">
                <thead className="top">
                    <tr>
                        <th>Student</th>
                        {assignmentTitles.map((title, i) =>
                            <th key={i} className="assignment-col">{title}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((student) => { return <TeacherTableRow key={student.student.school_id} studentData={student} addAssignment={addAssignment} assignmentOrder={assignments} /> })}
                </tbody>
            </table>
        </React.Fragment >
    )
}

export default TeacherTable

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// function TeacherTable({ studentData, addAssignment }) {
//   const classes = useStyles();

//   let assignments = []
//   let assignmentTitles = []
//   let allAssignments = []

  
//   studentData.forEach(student => {
//     console.log(student.assignments)
//     student.assignments.sort((a, b) => a.id > b.id? 1:-1).forEach(assignment => assignments.includes(assignment.id) ? (null) : (assignments.push(assignment.id), assignmentTitles.push(assignment.title)))
//   })

//   allAssignments.sort((a, b) => a.id > b.id).forEach(assignment => assignments.includes(assignment.id) ? (null) : (assignments.push(assignment.id), assignmentTitles.push(assignment.title)))
//   console.log(assignmentTitles)
//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Student</TableCell>
//             {assignmentTitles.map((title, i) =>
//                           <TableCell key={i} className="assignment-col" align="right">{title}</TableCell>)
//                         }
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.name}>
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//               <TableCell align="right">{row.protein}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default TeacherTable