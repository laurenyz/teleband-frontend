import React, { useState } from 'react'
import NewAssignmentForm from '../components/NewAssignmentForm'
import NewAssignmentResponseForm from '../components/NewAssignmentResponseForm'
import NewAssignmentCreativeForm from '../components/NewAssignmentCreativeForm'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Typography } from '@material-ui/core'

function NewAssignmentContainer({assignments, setAssignments}){
    const [formType, setFormType] = useState('audio')

    const displayForm = () => {
    switch(formType){
        case 'audio':
            return <NewAssignmentForm formType={formType} assignments={assignments} setAssignments={setAssignments}/>
        case 'response':
            return <NewAssignmentResponseForm formType={formType} assignments={assignments} setAssignments={setAssignments}/>
        case 'creative':
            return <NewAssignmentCreativeForm formType={formType} assignments={assignments} setAssignments={setAssignments}/>
        default:
            return <NewAssignmentForm formType={formType} assignments={assignments} setAssignments={setAssignments}/>
        }
    }

    return(
            <Grid container direction="column" alignItems="center" style={{padding: "2em"}}> 
                <Grid item style={{marginBottom:"1em"}}>
                    <Typography align="center" variant="h4">Create an Assignment</Typography>
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
                    {displayForm()}
                </Grid>
            </Grid>
    )
}

export default NewAssignmentContainer