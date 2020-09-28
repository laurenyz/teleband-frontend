import React from 'react'
import { TextField, Button, Input, InputLabel, DialogContent, Grid } from '@material-ui/core';
import { FetchURL } from '../env/url'

function NewAssignmentForm({assignments, setAssignments, formType}) {
  const [title, setTitle] = React.useState("");
  const [instructions, setInstructions] = React.useState("");
  const [notationPdf, setNotationPDF] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData=new FormData()
    formData.append('title', title)
    formData.append('instructions', instructions)
    formData.append('notationPdf', notationPdf)
    formData.append('formType', formType)
    title.length>0 && instructions.length>0 ?
      fetch(`${FetchURL}assignments`, {
          method: "POST",
          body: formData
        }).then(resp=>resp.json())
        .then(json => {
          console.log(json)
          setTitle("")
          setInstructions("")
          const newAssignmentList = [...assignments, json.assignment]
          setAssignments(newAssignmentList)
        })
    : alert("Please fill in all required fields.")
  }

  return (
    <DialogContent>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="title"
              label="Title"
              type="text"
              id="title"
              value={title}
              onChange = {(e) => setTitle(e.target.value)} 
            />
          </Grid>
          <Grid item>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={10}
            name="instructions"
            label="Instructions"
            type="text"
            id="instructions"
            value={instructions}
            onChange = {(e) => setInstructions(e.target.value)}
            />
          </Grid>
          <Grid item>
            <InputLabel htmlFor="assignment-pdf">Notation PDF:</InputLabel>
            <Input id="assignment-pdf" type="file" accept="application/pdf" name="assignment-pdf" onChange={(e) => setNotationPDF(e.target.files[0])}></Input>
          </Grid>
          <Grid item>
            <InputLabel htmlFor="assignment-sample-audio">Sample Audio:</InputLabel>
            <Input id="assignment-sample-audio" type="file" accept="audio/mp3" name="assignment-sample-audio"></Input>
          </Grid>
          <Grid item>
            <InputLabel htmlFor="assignment-accompaniment">Accompaniment Audio:</InputLabel>
            <Input id="assignment-accompaniment" type="file" accept="audio/mp3" name="assignment-accompaniment"></Input>
          </Grid>
          <Grid item>
            <Button fullWidth variant="contained" color="primary" type="submit">Submit</Button>  
          </Grid>
        </Grid>
      </form>
    </DialogContent>
  );
}

export default NewAssignmentForm