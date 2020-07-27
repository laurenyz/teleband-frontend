import React from 'react'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'


function TeacherTableAssignment({ assignmentDetail }) {
    console.log(assignmentDetail)
    const { student_assignment, title, id } = assignmentDetail
    const { expression, rhythm, student_audio, student_id, submitted, tone } = student_assignment



    return (
        <div id="teacher-table-assignment">
            {
                submitted ?
                    <div>Not Submitted</div> :
                    <React.Fragment>
                        <div>
                            Audio Player Here
                        </div>
                        <div className="slider-box">
                            <Grid container spacing={2}>
                                <Grid item>
                                    <div className="label">
                                        RYTM
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <Slider defaultValue={rhythm}
                                        className="teacher-slider"
                                        step={1}
                                        marks
                                        min={1}
                                        max={5} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <div className="label">
                                        EXPR
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <Slider defaultValue={expression}
                                        className="teacher-slider"
                                        step={1}
                                        marks
                                        min={1}
                                        max={5} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <div className="label">
                                        TONE
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <Slider defaultValue={tone}
                                        className="teacher-slider"
                                        step={1}
                                        marks
                                        min={1}
                                        max={5} />
                                </Grid>
                            </Grid>

                        </div>
                    </React.Fragment>
            }
        </div>
    )
}

export default TeacherTableAssignment