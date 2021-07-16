import React from 'react';
import {makeStyles} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
  },
}));

/**
 * Gets all the workspaces and creates a list of items to return for viewing
 * in app
 * @param {object} props
 * @return {object} JSX
 */
function WorkspaceList(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ListItem button className={classes.button}>
        <ListItem
        <ListItemText primary={'Workspace 1'} />
      </ListItem>
      <ListItem button className={classes.button}>
        <ListItemText primary={'Workspace 2'} />
      </ListItem>
      <ListItem button className={classes.button}>
        <ListItemText primary={'Workspace 3'} />
      </ListItem>
      <ListItem button className={classes.button}>
        <ListItemText primary={'Workspace 4'} />
      </ListItem>
    </React.Fragment>
  );
}

export default WorkspaceList;
