import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Paper, Grid } from '@material-ui/core/'

function Landing () {
    return(
        <div style={{textAlign:"center"}} >
            <Paper style={{padding:"2em", marginTop:"3em"}}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h1">Welcome to Tele.band!</Typography>
                    </Grid>
                    <Grid item>
                        <Typography display="inline" variant="h2">Click </Typography>
                        <Link style={{color: "#ac3b61"}} to="/login">
                            <Typography display="inline" variant="h2">here</Typography>
                        </Link>
                        <Typography display="inline" variant="h2"> to login.</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default Landing