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

const fetchWorkspaces = (setWorkspaces, setError) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/workspaces', {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      setError('');
      setWorkspaces(json);
    })
    .catch((error) => {
      console.log(error);
      setWorkspaces([]);
      setError(`${error.status} - ${error.statusText}`);
    });
};

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
      onClick={() => props.setWorkspace(props.name)}>
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
    <React.Fragment>
      {userInfo[0].access.map((code) => (
        <WorkspaceListItem setWorkspace={props.setWorkspace} name={code} />
      ))}
      <ListItem key={'WRKSPC-ERR'}>{error}</ListItem>
    </React.Fragment>
  );
}

export default WorkspaceList;
