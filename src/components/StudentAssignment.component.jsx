import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import MicIcon from '@material-ui/icons/Mic';
import { FetchURL } from '../env/url'
import { FilledInput } from '@material-ui/core'


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
        console.log("AudioBlob", audioBlob)
        let file = new File([audioBlob], 'audio1.wav', { type: 'audio/wav' })
        console.log(file)
        return file
    }

    let postRecording = () => {
        /*This is where we post the file to the backend*/
        let file = createFileFromBlob()
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
                <div>
                    {active ? "currently recording" : "not recording"}
                </div>
                <IconButton onClick={prepareRecording}>
                    <MicIcon></MicIcon>
                </IconButton>
                <Button onClick={startRecording}>
                    Start Recording
                </Button>
                <Button onClick={stopRecording}>
                    Stop Recording
                </Button>
                <Button onClick={postRecording}>
                    Submit Recording
                </Button>
                {audioUrl ? <a href={audioUrl} download>Click to download</a> : null}
            </div>
        </div>
    )
}

export default StudentAssignment