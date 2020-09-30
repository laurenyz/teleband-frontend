import React, { useEffect, useState } from 'react'
import { Grid, Typography, Paper, Input, InputLabel, Button, IconButton } from '@material-ui/core/'
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import { FetchURL } from '../env/url'
import ReactAudioPlayer from 'react-audio-player';

function StudentAssignment(props) {
    const [assignment, setAssignment] = useState({})
    const [active, activeSet] = useState(false)
    const [mediaRecorder, mediaRecorderSet] = useState(null)
    const [audioBlob, audioBlobSet] = useState(null)
    const [audioUrl, audioUrlSet] = useState(null)
    const [sampleAudio, setSampleAudio] = useState(null)
    const [accompanimentAudio, setAccompanimentAudio] = useState(null)
    const [studentNotationPdf, setStudentNotationPdf] = useState(null)

    useEffect(() => {
        fetch(`${FetchURL}assignments/${props.match.params.id}`)
            .then(resp => resp.json())
            .then(assign => {
                setAssignment(assign)
                setSampleAudio(new Audio(assign.playing_sample_url))
                setAccompanimentAudio(new Audio(assign.accompaniment_url))
            })
    }, [props.match.params.id])

    const prepareRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorderSet(new MediaRecorder(stream, { type: 'audio/wav' }))
            }
        )
    }

    const startRecording = () => {
        mediaRecorder.start()
        accompanimentAudio.play()
        activeSet(true)
        mediaRecorder.addEventListener('dataavailable', e => {
            console.log("Current Blob", e.data)
            let tempBlob = new Blob([e.data], { type: 'audio' })
            audioUrlSet(URL.createObjectURL(tempBlob))
            audioBlobSet(tempBlob)
        })
    }

    const stopRecording = () => {
        mediaRecorder.stop()
        accompanimentAudio.pause()
        accompanimentAudio.currentTime = 0
        mediaRecorder.addEventListener('stop', () => {
            console.log("stopping recording")
        })
        activeSet(false)
    }

    const createFileFromBlob = () => {
        console.log("URL", audioUrl)
        console.log("AudioBlob", [audioBlob])
        let file = new File([audioBlob], 'audio1.ogg', { type: 'audio/ogg' })
        console.log(file)
        return file
    }

    const postRecording = () => {
        let formData = new FormData()
        formData.append("school_id", localStorage.getItem("jwt"))
        formData.append("student_recording", createFileFromBlob())

        console.log(formData)
        fetch(`${FetchURL}student_assignments/${props.match.params.id}/submit_recording`, {
            method: "POST",
            body: formData
        })
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            if(json.error){
                alert(json.message)
            } else {
                console.log(json)}
            })
    }

    const handleSubmitStudentNotation = (e) => {
        e.preventDefault()
        if(!studentNotationPdf){
            alert("Please select a file to upload.")
        }else{
            console.log("submitting",studentNotationPdf)
        }
    }
    
    return (
        <div style={{margin: "1em"}}>
            {
            localStorage.getItem("jwt")
            ?
                <Grid container direction="column" spacing={1} style={{width: "100%"}}>
                <Grid item >
                    <Paper style={{padding:"1em"}}>
                        <Typography align="center" variant="h2">{`${assignment.title}-${assignment.category}`}</Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{padding:"1em"}}>
                        <Typography variant="h5" display="inline" style={{fontWeight:"bold"}}>INSTRUCTIONS: </Typography>
                        <Typography align="justify" variant="h5" display="inline">{assignment.instructions}</Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper style={{padding: "1em"}}>
                        <Grid container justify="space-around">
                            {
                                assignment.category==='response'?
                                "Response- should there be an instructional pdf, also? Right now, there is an option to upload that in the admin-panel. Do we want a free-response section as well as 3 dropdowns? Can we get a mockup of the form?"
                                :
                                <>
                                <Grid item>
                                    <Button variant="contained" color="secondary" endIcon={<PlayCircleFilledIcon />} onClick={() => sampleAudio.play()}>Recording</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="secondary" endIcon={<LibraryMusicIcon />} onClick={()=>window.open(assignment.pdf_url)}>Notation</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="secondary" endIcon={<PlayCircleFilledIcon />} onClick={() => accompanimentAudio.play()}>Accompaniment</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="secondary" disabled={mediaRecorder?true:false} onClick={prepareRecording}>
                                        Start Recording
                                    </Button> 
                                </Grid>
                                </>
                            }
                        </Grid>
                    </Paper>
                </Grid>
                {
                    assignment.category==='creative'?
                    <Grid item>
                        <form noValidate autoComplete="off" onSubmit={handleSubmitStudentNotation}>
                            <Paper style={{padding: "1em"}}>
                                <InputLabel htmlFor="assignment-student-pdf">Notation:</InputLabel>
                                <Input id="assignment-student-pdf" type="file" accept="application/pdf" name="assignment-student-pdf" onChange={(e) => setStudentNotationPdf(e.target.files[0])} />
                                <Button variant="contained" color="primary" type="submit">Submit Notation</Button>
                            </Paper>
                        </form>
                    </Grid>  
                    :null
                }
                {
                    mediaRecorder ?
                         active ?
                            <IconButton onClick={stopRecording}>
                                <StopIcon></StopIcon>
                            </IconButton> :
                            <IconButton onClick={startRecording}>
                                <MicIcon></MicIcon>
                            </IconButton>
                        :null
                }
                {
                    audioBlob ?
                        <Button variant="contained" color="secondary" onClick={postRecording}>Submit Recording</Button>
                    : null
                }
                {audioUrl ?
                    <ReactAudioPlayer
                        src={audioUrl}
                        autoPlay={false}
                        controls
                    />

                    : null}
                </Grid>
            :
            <Typography>Please sign in!</Typography>
        }
        </div>
    )
}

export default StudentAssignment