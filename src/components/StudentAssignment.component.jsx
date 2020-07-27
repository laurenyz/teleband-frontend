import React, { useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

function StudentAssignment(props) {

    const [assignment, setAssignment] = useState({})
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/assignments/${props.match.params.id}`)
            .then(resp => resp.json())
            .then(assign => setAssignment(assign))
    }, [props.match.params.id])

    const fileChange = event => {
        console.log(event)
        setFile(event.target.files[0])
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
                    </Grid>
                    <Grid item>
                        <h3>Here is where 'Other Voices' go</h3>
                    </Grid>
                </Grid>
            </Grid>

            <ReactAudioPlayer src={`${file}`} controls/>

            <input onChange={event => fileChange(event)} type='file' name='file'>
            </input>

            <Button>
                RECORD
            </Button>

            <Button>
                PLAY
            </Button>
                
            <Button>
                DELETE
            </Button>

            <Button>
                SUBMIT
            </Button>
        </div>
    )
}

export default StudentAssignment