import React, { useState, useEffect } from 'react'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'



function TeacherTableAssignment({ assignmentDetail, addAssignment }) {
    const [formFill, formFillSet] = useState(undefined)
    const [status, statusSet] = useState("UNALTERED")
    const { student_assignment, title, id } = assignmentDetail
    const { expression, rhythm, student_audio, student_id, submitted, tone } = student_assignment

    useEffect(() => {
        formFillSet(initalFormFill())

        // eslint-disable-next-line
    }, [assignmentDetail])



    useEffect(() => {
        if (formFill && formFill["submitted"]) {
            statusSet("SUBMITTED")
        }

    }, [formFill])

    function initalFormFill() {
        let payload = {
            "submitted": submitted ? true : false,
            "expression": expression ? expression : null,
            "rhythm": rhythm ? rhythm : null,
            "tone": tone ? tone : null
        }
        return payload
    }


    const handleSliderChange = (value, type) => {
        // console.log(`${type}: ${value}, student_assignment_ID:${student_assignment.id}`)
        let tempForm = formFill
        tempForm[type] = value

        if (tempForm["rhythm"] === null || tempForm["expression"] === null || tempForm["tone"] === null) {
            statusSet("GRADING")
        } else {
            addAssignment(tempForm, student_assignment.id)
            statusSet("GRADED")
        }
        formFillSet(tempForm)
    }

    const resetForm = () => {
        initalFormFill()
        statusSet("UNALTERED")
    }


    return (
        <div id="teacher-table-assignment">
            {
                submitted ?
                    <div>Not Submitted</div> :
                    <React.Fragment>
                        <div className="audio-player">
                            Audio Player Here
                        </div>
                        <div className={`status-box ${status}`}>
                            <div>
                                {status === "UNALTERED" ? "" : status}
                            </div>
                            <div>
                                {status !== "UNALTERED" ? <button onClick={resetForm}>Revert</button> : null}
                            </div>
                        </div>
                        <div className="slider-box">
                            <Grid container spacing={2}>
                                <Grid item>
                                    <div className="label">
                                        RYTM
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        defaultValue={rhythm}
                                        onChangeCommitted={(e, value) => handleSliderChange(value, "rhythm")}
                                        className="teacher-slider"
                                        step={1}
                                        marks
                                        min={1}
                                        max={5} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item >
                                    <div className="label">
                                        EXPR
                                    </div>
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        defaultValue={expression}
                                        onChangeCommitted={(e, value) => handleSliderChange(value, "expression")}
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
                                    <Slider
                                        defaultValue={tone}
                                        onChangeCommitted={(e, value) => handleSliderChange(value, "tone")}
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