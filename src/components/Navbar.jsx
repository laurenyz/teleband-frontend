import React from 'react'
import { useHistory } from 'react-router-dom'
import { AppBar, Grid, Typography, Button } from '@material-ui/core/'

function Navbar({ currentUser, clearUserStates, currentUserType }) {
    const history = useHistory();
    function handleLogout() {
        clearUserStates()
        history.push('/')
    }

    function handleAssignmentLink() {
        history.push('/student')
    }

    function handleLogin() {
        history.push('/login')
    }

    return (
        <AppBar position="static" style={{ height: "60px", padding: "10px" }}>
            <Grid container direction="row" spacing={3} justify="space-between" alignItems="center">
                <Grid item>
                    <img alt="" src={require('../assets/images/white_teleband_logo.svg')} style={{height:"2rem"}} />
                </Grid>
                <Grid item>
                    <Grid container>
                        {currentUserType === "student" ?
                            <Grid item>
                                <Button style={{color:"#ffffff"}} onClick={handleAssignmentLink} >
                                    Assignments
                            </Button >
                            </Grid>
                            : null}
                        {currentUser ?
                            <Grid item>
                                <Button style={{color:"#ffffff"}} onClick={handleLogout} >
                                    Logout
                            </Button >
                            </Grid>
                            :
                            <Grid item>
                                <Button style={{color:"#ffffff"}} onClick={handleLogin} >
                                    Login
                            </Button >
                            </Grid>
                        }
                    </Grid>
                </Grid>

            </Grid>
        </AppBar>
    )
}

export default Navbar