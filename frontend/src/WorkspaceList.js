import React from 'react';
import {makeStyles} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 0,
  },
}));

const fetchWorkspaces = async (setWorkspaces, setError) => {
  setWorkspaces([{name: 'cse183'}, {name: 'workspace2'}]);
  // const item = localStorage.getItem('user');
  // if (!item) {
  //   return;
  // }
  // const user = JSON.parse(item);
  // const bearerToken = user ? user.accessToken : '';
  // fetch('/v0/channels', {
  //   method: 'GET',
  //   headers: new Headers({
  //     'Authorization': `Bearer ${bearerToken}`,
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   }),
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw response;
  //     }
  //     return response.json();
  //   })
  //   .then((json) => {
  //     setError('');
  //     setWorkspaces(json);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     setWorkspaces([]);
  //     setError(`${error.status} - ${error.statusText}`);
  //   });
};

/**
 * Gets all the workspaces and creates a list of items to return for viewing
 * in app
 * @param {object} props
 * @return {object} JSX
 */
function WorkspaceList(props) {
  const classes = useStyles();
  const [workspaces, setWorkspaces] = React.useState([]);
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    fetchWorkspaces(setWorkspaces, setError);
  }, []);

  return (
    <React.Fragment>
      {workspaces.map((wrkspc) => (
        <ListItem button className={classes.button}>
          <ListItemText primary={wrkspc.name} />
        </ListItem>
      ))}
      <ListItem>{error}</ListItem>
    </React.Fragment>
  );
}

export default WorkspaceList;
