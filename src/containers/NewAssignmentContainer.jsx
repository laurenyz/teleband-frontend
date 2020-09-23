import React, { useState } from 'react'
import NewAssignmentForm from '../components/NewAssignmentForm'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid } from '@material-ui/core'

function NewAssignmentContainer({assignments, setAssignments}){
    const [formType, setFormType] = useState('audio')

    const displayForm = () => {
    switch(formType){
        case 'audio':
            return <NewAssignmentForm formType={formType} assignments={assignments} setAssignments={setAssignments}/>
        case 'response':
            return "response"
        case 'creative':
            return "creative"
        default:
            return <NewAssignmentForm assignments={assignments} setAssignments={setAssignments}/>
        }
    }

    return(
        <div>
            <Grid container direction="column" alignItems="center"> 
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
            
        </div>
    )
}

export default NewAssignmentContainer