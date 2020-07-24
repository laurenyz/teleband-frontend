import React from 'react'
import {Link} from 'react-router-dom'

function Landing () {
    return(
        <div>
            Welcome to Teleband!

            Click <Link to="/login">here</Link> to login.
        </div>
    )
}

export default Landing