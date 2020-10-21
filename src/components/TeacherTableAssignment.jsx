import React, { useState, useEffect } from 'react'
import { Slider, Grid, Button, Typography, TextField } from '@material-ui/core/'
import ReactAudioPlayer from 'react-audio-player';


function TeacherTableAssignment({ assignmentDetail, addAssignment }) {
    const [formFill, formFillSet] = useState(undefined)
    const [status, statusSet] = useState("INCOMPLETE")
    //const [rhythmState, rhythmStateSet] = useState(undefined)
    const { student_assignment, title, category } = assignmentDetail
    const { expression, rhythm, tone, student_audio, student_id, submitted, student_notation_url, student_response, id } = student_assignment

    useEffect(() => {
        formFillSet(initalFormFill())

        // eslint-disable-next-line
    }, [assignmentDetail])

    useEffect(() => {
        if (formFill && formFill["submitted"]) {
            statusSet("SUBMITTED")
        } else if (student_audio) {
            statusSet("COMPLETE")
        }
    }, [formFill, student_audio])

    function initalFormFill() {
        let payload = {
            "submitted": submitted ? true : false,
            "expression": expression ? expression : null,
            "rhythm": rhythm ? rhythm : null,
            "tone": tone ? tone : null
        }
        return payload
    }

    const handleSliderChange = (value, type) => {
        let tempForm = formFill
        tempForm[type] = value

        if (tempForm["rhythm"] === null || tempForm["expression"] === null || tempForm["tone"] === null) {
            statusSet("GRADING")
        } else {
            addAssignment(tempForm, student_assignment.id)
            statusSet("GRADED")
        }
        formFillSet(tempForm)
    }

    const assignmentView = () => {
        switch(category){
            case 'audio':
                if(student_audio!==""){
                    return (
                        <ReactAudioPlayer
                            src={student_audio}
                            autoPlay={false}
                            controls
                        />
                    )
                } else {
                    return (
                        <Grid item>
                                <Typography>NO AUDIO SUBMITTED</Typography>
                        </Grid>
                    )
                }
            case 'response':
                if(student_response!==""){
                    return(
                        <TextField
          id="outlined-multiline-static"
          label="Response"
          multiline
          rows={4}
          defaultValue={student_response}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
                    )
                }else{
                    return (
                        <Grid item>
                            <Typography>NO RESPONSE SUBMITTED</Typography>
                        </Grid>
                    )
                }
            case 'creative':
                if(student_audio!=="" && student_notation_url!==""){
                    return (
                        <>
                            <Grid item>
                                <ReactAudioPlayer
                                    src={student_audio}
                                    autoPlay={false}
                                    controls
                                />
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={()=>window.open(student_notation_url)}>Notation Pdf</Button>
                            </Grid>
                        </>
                    )
                } else if(student_audio!==""){
                    return(
                        <>
                            <Grid item>
                                <ReactAudioPlayer
                                    src={student_audio}
                                    autoPlay={false}
                                    controls
                                />
                            </Grid>
                            <Grid item>
                                <Typography>NO NOTATION SUBMITTED</Typography>
                            </Grid>
                        </>
                    )
                } else {
                    return (
                        <Grid item>
                                <Typography>NO AUDIO SUBMITTED</Typography>
                        </Grid>
                    )
                }
            default: return "No assignment available"
        }   
    }

    return (
        <div id="teacher-table-assignment">
            {/* {
                <div className="audio-player">
                    {assignmentView()}
                </div> 
            } */}
            <Grid container direction="column" style={{paddingTop:"1em"}}>
                {assignmentView()}
            </Grid>
            {/* <div className={`status-box ${status}`}>
                {status}
            </div>
            <div className="slider-box">
                <Grid container spacing={2}>
                    <Grid item>
                        <div className="label">
                            RYTM
                                    </div>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            defaultValue={rhythm}
                            onChangeCommitted={(e, value) => handleSliderChange(value, "rhythm")}
                            className="teacher-slider"
                            disabled={submitted || !student_audio}
                            step={1}
                            marks
                            min={1}
                            max={5} />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item >
                        <div className="label">
                            EXPR
                                    </div>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            defaultValue={expression}
                            onChangeCommitted={(e, value) => handleSliderChange(value, "expression")}
                            className="teacher-slider"
                            disabled={submitted || !student_audio}
                            step={1}
                            marks
                            min={1}
                            max={5} />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>
                        <div className="label">
                            TONE
                                    </div>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            defaultValue={tone}
                            onChangeCommitted={(e, value) => handleSliderChange(value, "tone")}
                            className="teacher-slider"
                            disabled={submitted || !student_audio}
                            step={1}
                            marks
                            min={1}
                            max={5} />
                    </Grid>
                </Grid>
            </div> */}
        </div>
    )
}

export default TeacherTableAssignment