import React, { useState, useEffect } from 'react'
import { Slider, Grid, IconButton, Button, Typography, TextField } from '@material-ui/core/'
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import '../style/CustomAudioPlayer.css';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';


function TeacherTableAssignment({ assignmentDetail, addAssignment }) {
    const [formFill, formFillSet] = useState(undefined)
    const [status, statusSet] = useState("INCOMPLETE")
    //const [rhythmState, rhythmStateSet] = useState(undefined)
    const { student_assignment, title, category } = assignmentDetail
    const { student_audio, student_id, submitted, student_notation_url, student_response, id } = student_assignment
   // const { student_id, submitted, student_notation_url, student_response, id } = student_assignment
    const [tone, setTone] = useState(student_assignment.tone)
    const [rhythm, setRhythm] = useState(student_assignment.rhythm)
    const [expression, setExpression] = useState(student_assignment.expression)
    const [locked, setLocked] = useState(student_assignment.graded)

    // useEffect(() => {
    //    setStudentAudio(student_assignment.student_audio)

    //    // eslint-disable-next-line
    // }, [])

    // useEffect(() => {
    //     formFillSet(initalFormFill())

    //     // eslint-disable-next-line
    // }, [assignmentDetail])

    // useEffect(() => {
    //     if (formFill && formFill["submitted"]) {
    //         statusSet("SUBMITTED")
    //     } else if (student_audio) {
    //         statusSet("COMPLETE")
    //     }
    // }, [formFill, student_audio])

    // function initalFormFill() {
    //     let payload = {
    //         "submitted": submitted ? true : false,
    //         "expression": expression ? expression : null,
    //         "rhythm": rhythm ? rhythm : null,
    //         "tone": tone ? tone : null
    //     }
    //     return payload
    // }

    // const handleSliderChange = (value, type) => {
    //     let tempForm = formFill
    //     tempForm[type] = value

    //     if (tempForm["rhythm"] === null || tempForm["expression"] === null || tempForm["tone"] === null) {
    //         statusSet("GRADING")
    //     } else {
    //         addAssignment(tempForm, student_assignment.id)
    //         statusSet("GRADED")
    //     }
    //     formFillSet(tempForm)
    // }

    const adjustRatingforRange = (num) => {
        let score = parseInt(num);
        if (score < 0) {
            score = 0
        } else if (score > 5) {
            score = 5
        }
        return score
    }

    const assignmentView = () => {
        switch(category){
            case 'audio':
                if(student_audio!==""){
                    return (
                        <AudioPlayer
                            autoPlay={false}
                            autoPlayAfterSrcChange={false}
                            layout="horizontal-reverse"
                            customAdditionalControls={[]}
                            showJumpControls={false}
                            customVolumeControls={[]}
                            src={student_audio}
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
                            aria-label="student response"
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
                                <AudioPlayer
                                    autoPlay={false}
                                    autoPlayAfterSrcChange={false}
                                    layout="horizontal-reverse"
                                    customAdditionalControls={[]}
                                    showJumpControls={false}
                                    customVolumeControls={[]}
                                    src={student_audio}
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
                                <AudioPlayer
                                    autoPlay={false}
                                    autoPlayAfterSrcChange={false}
                                    layout="horizontal-reverse"
                                    customAdditionalControls={[]}
                                    showJumpControls={false}
                                    customVolumeControls={[]}
                                    src={student_audio}
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
            {submitted?
                <Grid container direction="column">
                    <Grid item>
                    <Grid container justify="flex-end">
                        <Grid item>
                            {locked?
                            <IconButton onClick={()=>setLocked(false)}>
                                <LockIcon style={{ color: green[500] }}/>
                            </IconButton>
                            :<IconButton onClick={()=>setLocked(true)}>
                                <LockOpenIcon style={{ color: yellow[500] }}/>
                            </IconButton>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                {assignmentView()}
                    <Grid item>
                        <Grid container justify="space-around" style={{padding:"5px"}}>
                            <Grid item>
                                <TextField
                                    disabled={locked}
                                    variant="outlined"
                                    margin="normal"
                                    id="assignment-rhythm"
                                    label="R"
                                    name="assignment-rhythm"
                                    autoComplete="assignment-rhythm"
                                    size="small"
                                    InputProps={{ inputProps: { min: 1, max: 5, step:1 } }}
                                    type = "number" 
                                    onChange = {(e)=>setRhythm(adjustRatingforRange(e.target.value))} 
                                    value = {rhythm}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    disabled={locked}
                                    variant="outlined"
                                    margin="normal"
                                    id="assignment-tone"
                                    label="T"
                                    name="assignment-tone"
                                    autoComplete="assignment-tone"
                                    size="small"
                                    InputProps={{ inputProps: { min: 1, max: 5, step:1 } }}
                                    type = "number" 
                                    onChange = {(e)=>setTone(adjustRatingforRange(e.target.value))} 
                                    value = {tone}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    disabled={locked}
                                    variant="outlined"
                                    margin="normal"
                                    id="assignment-expression"
                                    label="E"
                                    name="assignment-expression"
                                    autoComplete="assignment-expression"
                                    size="small"
                                    InputProps={{ inputProps: { min: 1, max: 5, step:1 } }}
                                    type = "number" 
                                    onChange = {(e)=>setExpression(adjustRatingforRange(e.target.value))} 
                                    value = {expression}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            :
                <Typography align="center" style={{backgroundColor:"#ac3b61", color:"#fffafa"}}>NOT SUBMITTED</Typography>
            }
        </div>
    )
}

export default TeacherTableAssignment