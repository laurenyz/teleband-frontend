import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AudioRecorder from 'react-audio-recorder'
import { FetchURL } from '../env/url'


function StudentAssignment(props) {

    const [assignment, setAssignment] = useState({})

    useEffect(() => {
        fetch(`${FetchURL}assignments/${props.match.params.id}`)
            .then(resp => resp.json())
            .then(assign => setAssignment(assign))
    }, [props.match.params.id])

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

            <AudioRecorder downloadable={true}/>

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