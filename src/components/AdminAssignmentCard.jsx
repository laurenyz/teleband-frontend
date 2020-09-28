import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import { FetchURL } from '../env/url'

const AdminAssignmentCard = ({assignment, assignments, setAssignments}) => {
    const handleDelete = () => {
    
        console.log(assignment.id)
        let response = window.confirm(
          `Permanently remove "${assignment.title}" from the database?`
        )
        return response ? 
        fetch(`${FetchURL}assignments/${assignment.id}`,{
                 method: "DELETE"
             })
             .then(resp => resp.json())
             .then((json) => {
                const newAssignments = assignments.filter(a => a.id !== assignment.id)
                setAssignments(newAssignments)
                console.log(json.message)
             }) : 
        null;
      }   

    return(
        <Card style={{backgroundColor: "#eee2dc"}}>
            <Grid container alignItems="center" justify="space-between" style={{padding: "10px"}}>
                <Grid item>        
                    <Typography>{assignment.title}</Typography> 
                </Grid>
                <Grid item>
                
                    <IconButton aria-label="edit assignment">
                        <EditIcon />
                    </IconButton>  
                    <IconButton aria-label="delete assignment" onClick = {handleDelete}>
                        <CloseIcon />
                    </IconButton>  
                
                </Grid>
            </Grid>
        </Card> 
    )

// function handleEditOnClick() {
//     window.open(`/scratchpads/${props.scratchpad.url}`)
// }

// function handleScratchpadOnClick() {
//     window.open(`/scratchpads/${props.scratchpad.url}`)
// }

// function handleDeleteOnClick() {
//     props.deletingSavedScratchPad(props.scratchpad)
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         deletingSavedScratchPad: user_scratchpad => dispatch(deletingSavedScratchPad(user_scratchpad))
//     }
// }
}
export default AdminAssignmentCard