import React from 'react';
import {fetchUserInfo} from './FetchUser';
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
    <ListItem button className={classes.button}>
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
  const [userInfo, setUserInfo] = React.useState({});
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    fetchUserInfo(setUserInfo, setError, username);
  }, [username]);

  console.log(userInfo);

  return (
    <React.Fragment>
      {userInfo.access.map((code) => (
        <WorkspaceListItem name={code} />
      ))}
      <ListItem key={'WRKSPC-ERR'}>{error}</ListItem>
    </React.Fragment>
  );
}

export default WorkspaceList;
