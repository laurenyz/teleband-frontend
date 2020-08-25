import React from 'react'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import '../style/LandingPage.style.css'

function Landing () {
    return(
        <div id="welcome-message">
            <Typography id="header-h1" variant="h1">Welcome to Teleband!</Typography>
            <Typography display="inline" variant="h2">Click </Typography><Link to="/login"><Typography display="inline" variant="h2">here</Typography></Link><Typography display="inline" variant="h2"> to login.</Typography>
        </div>
    )
}

export default Landing