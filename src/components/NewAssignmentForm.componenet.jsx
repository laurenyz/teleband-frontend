import React from 'react'
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function NewAssignmentForm() {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/assignments', {
         method: "POST",
         headers: {
             'Content-Type': "application/json",
             "Accept": "application/json"
         },
         body: JSON.stringify({title: title})
      }).then(resp=>resp.json())
      .then(json => {
        setTitle("")
        console.log(json)
      })
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <TextField id="standard-name" label="Title" value={title} onChange={handleChange} />
      </div>
        <Button type="submit">Submit</Button>  
    </form>
  );
}

export default NewAssignmentForm