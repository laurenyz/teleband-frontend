import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import { FetchURL } from '../env/url'
import { FilledInput } from '@material-ui/core'
import ReactAudioPlayer from 'react-audio-player';

function StudentAssignment(props) {

    const [assignment, setAssignment] = useState({})

    const [active, activeSet] = useState(false)
    const [mediaRecorder, mediaRecorderSet] = useState(null)
    const [audioBlob, audioBlobSet] = useState(null)
    const [audioUrl, audioUrlSet] = useState(null)



    useEffect(() => {
        fetch(`${FetchURL}assignments/${props.match.params.id}`)
            .then(resp => resp.json())
            .then(assign => setAssignment(assign))
    }, [props.match.params.id])

    let prepareRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorderSet(new MediaRecorder(stream, { type: 'audio/wav' }))
            }
            )
    }

    let startRecording = () => {
        mediaRecorder.start()
        activeSet(true)
        mediaRecorder.addEventListener('dataavailable', e => {
            console.log("Current Blob", e.data)
            let tempBlob = new Blob([e.data], { type: 'audio' })
            audioUrlSet(URL.createObjectURL(tempBlob))
            audioBlobSet(tempBlob)
        })
    }

    let stopRecording = () => {
        mediaRecorder.stop()
        mediaRecorder.addEventListener('stop', () => {
            console.log("stopping recording")
        })
        activeSet(false)
    }

    let createFileFromBlob = () => {
        console.log("URL", audioUrl)
        console.log("AudioBlob", [audioBlob])
        let file = new File([audioBlob], 'audio1.ogg', { type: 'audio/ogg' })
        console.log(file)
        return file
    }

    let postRecording = () => {
        let formData = new FormData()
        formData.append("school_id", localStorage.getItem("jwt"))
        formData.append("student_recording", createFileFromBlob())

        console.log(formData)
        fetch(`${FetchURL}student_assignments/${props.match.params.id}/submit_recording`, {
            method: "POST",
            body: formData
        })
    }

    return (
        <div>
            <Grid container>
                <Grid container>
                    <Grid item xs={8}>
                        <h2> {assignment.title} </h2>
                        <h3> {assignment.audios} </h3>
                        <h3> {assignment.excerpts}</h3>
                    </Grid>
                    <Grid item>
                        <h2>
                            Insert Example Here
                        </h2>
                    </Grid>
                </Grid>

                <Grid container direction='column'>
                    <Grid item>
                        <h3> Here is where excerpts go{assignment.excerpts}</h3>
                        <div className="pdf-viewer">
                            <iframe src={'http://africau.edu/images/default/sample.pdf'} />
                        </div>
                    </Grid>
                    <Grid item>
                        <h3>Here is where 'Other Voices' go</h3>
                    </Grid>
                </Grid>
            </Grid>
            <div>
                {
                    !mediaRecorder ?
                        <Button onClick={prepareRecording}>
                            Start Recording
                        </Button> : active ?
                            <IconButton onClick={stopRecording}>
                                <StopIcon></StopIcon>
                            </IconButton> :
                            <IconButton onClick={startRecording}>
                                <MicIcon></MicIcon>
                            </IconButton>
                }

                {
                    audioBlob ?
                        <Button onClick={postRecording}>
                            Submit Recording
                </Button> : null
                }
                {audioUrl ?
                    <ReactAudioPlayer
                        src={audioUrl}
                        autoPlay={false}
                        controls
                    />

                    : null}
            </div>
        </div>
    )
}

export default StudentAssignment