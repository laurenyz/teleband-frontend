import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

function Navbar(){
    return(
        <AppBar position="static" style={{height: "60px", padding:"15px"}}>
            <Grid container direction="row" spacing={3} justify="space-between" alignItems="flex-end">
                <Typography>Teleband</Typography>
            </Grid>
        </AppBar>
    )
}

export default Navbar