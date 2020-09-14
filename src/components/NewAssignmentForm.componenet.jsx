import React from 'react'
import { TextField, Button, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FetchURL } from '../env/url'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function NewAssignmentForm({assignments, setAssignments}) {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [instructions, setInstructions] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    title.length>0 && instructions.length>0 ?
      fetch(`${FetchURL}assignments`, {
          method: "POST",
          headers: {
              'Content-Type': "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify({title, instructions})
        }).then(resp=>resp.json())
        .then(newAssignment => {
          setTitle("")
          setInstructions("")
          const newAssignmentList = [...assignments, newAssignment]
          setAssignments(newAssignmentList)
        })
    : alert("Please fill in all required fields.")
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
        <InputLabel htmlFor="assignment-notation">Notation PDF:</InputLabel>
        <Input id="assignment-notation" type="file" accept="application/pdf" name="assignment-notation"></Input>
      </div>
      <div>
        <InputLabel htmlFor="assignment-sample-audio">Sample Audio:</InputLabel>
        <Input id="assignment-sample-audio" type="file" accept="audio/mp3" name="assignment-sample-audio"></Input>
      </div>
      <div>
        <InputLabel htmlFor="assignment-accompaniment">Accompaniment Audio:</InputLabel>
        <Input id="assignment-accompaniment" type="file" accept="audio/mp3" name="assignment-accompaniment"></Input>
      </div>
        <Button type="submit">Submit</Button>  
    </form>
  );
}

export default NewAssignmentForm