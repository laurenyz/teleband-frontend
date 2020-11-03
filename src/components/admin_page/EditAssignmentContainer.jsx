import React, { useState } from 'react'
import EditAssignmentForm from './EditAssignmentForm'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Typography } from '@material-ui/core'

function EditAssignmentContainer({ activeAssignment, handleCloseEditAssignmentForm, assignments, setAssignments }){
    const [formType, setFormType] = useState(activeAssignment.category)

    return(
        <Grid container direction="column" alignItems="center" style={{padding: "2em"}}> 
            <Grid item style={{marginBottom:"1em"}}>
                <Typography align="center" variant="h4">Edit Assignment</Typography>
            </Grid>
            <Grid item>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Assignment Type</FormLabel>
                    <RadioGroup row aria-label="assignment-type" name="assignment-type" value={formType} onChange={(e)=>setFormType(e.target.value)}>
                        <FormControlLabel value="audio" control={<Radio />} label="Audio" />
                        <FormControlLabel value="response" control={<Radio />} label="Response" />
                        <FormControlLabel value="creative" control={<Radio />} label="Creative" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item>
                <EditAssignmentForm  activeAssignment={activeAssignment} handleCloseEditAssignmentForm={handleCloseEditAssignmentForm} formType={formType} assignments={assignments} setAssignments={setAssignments}/>
            </Grid>
        </Grid>
    )
}

export default EditAssignmentContainer