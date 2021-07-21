import React from 'react';
import {fetchUserInfo} from './Fetcher';
import {makeStyles} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
  },
}));

/**
 * Single button component for dropdown of channels
 * @param {object} props
 * @return {object} JSX
 */
function WorkspaceListItem(props) {
  const classes = useStyles();

  return (
    <ListItem
      button
      className={classes.button}
      onClick={() => localStorage.setItem('workspace', props.name)}
    >
      <ListItemText primary={props.name} />
    </ListItem>
  );
}

/**
 * Gets all the workspaces and creates a list of items to return for viewing
 * in app
 * @param {object} props
 * @return {object} JSX
 */
function WorkspaceList(props) {
  const username = localStorage.getItem('username');
  const [userInfo, setUserInfo] = React.useState([{access: []}]);
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    fetchUserInfo(setUserInfo, setError, username);
  }, [username]);

  return (
    <>
      {userInfo[0].access.map((code) => (
        <WorkspaceListItem name={code} />
      ))}
      <ListItem key={'WRKSPC-ERR'}>{error}</ListItem>
    </>
  );
}

export default WorkspaceList;
