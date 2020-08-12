import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

import { FetchURL } from '../env/url'


function StudentAssignment(props) {

    const [assignment, setAssignment] = useState({})
    const [audio, setAudioDetails] = useState({audioDetails: {
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: 0,
          m: 0,
          s: 0
        }
      }})

    useEffect(() => {
        fetch(`${FetchURL}assignments/${props.match.params.id}`)
            .then(resp => resp.json())
            .then(assign => setAssignment(assign))
    }, [props.match.params.id])

    const handleAudioStop = data => {
        setAudioDetails({audioDetails: data})
        console.log(audio.audioDetails.url)
    }

    const handleAudioReset = () => {
        setAudioDetails({audioDetails: {
            url: null,
            blob: null,
            chunks: null,
            duration: {
              h: 0,
              m: 0,
              s: 0
            }
          }})
    }

    const handleAudioUpload = data => {
        console.log(data)
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

            <Recorder 
            record={true}
            showUIAudio
            title={'Record Your Piece Here'}
            handleAudioStop={data => handleAudioStop(data)}
            handleRest={() => handleAudioReset()}
            handleAudioUpload={data => handleAudioUpload(data)}
            audioURL={audio.audioDetails.url}
            />
        </div>
    )
}

export default StudentAssignment