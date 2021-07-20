import React from 'react';
import {Link} from 'react-router-dom';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {fetchUserInfo} from './FetchUser.js';
// import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import PersonIcon from '@material-ui/icons/Person';

const fetchUsers = (setUserList, setError) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/user', {
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
      setUserList(json);
    })
    .catch((error) => {
      console.log(error);
      setUserList([]);
      setError(`${error.status} - ${error.statusText}`);
    });
};

/**
 * Single button component for dropdown of users
 * @param {object} props
 * @return {object} JSX
 */
function UserListItem(props) {
  return (
    <ListItem
      button
      className={props.nested}
      component={Link}
      to={props.link}
      key={'user/'.concat(props.name)}
    >
      <ListItemIcon><PersonIcon /></ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  );
}

/**
 * List of users inside of a Workspace returned as a list of JSX object for
 * each user
 * @param {object} props
 * @return {object} JSX
 */
function Users(props) {
  const username = localStorage.getItem('username');
  const [userInfo, setUserInfo] = React.useState({});
  const [userList, setUserList] = React.useState([]);
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    fetchUsers(setUserList, setError);
  }, []);

  React.useEffect(() => {
    fetchUserInfo(setUserInfo, setError, username);
  }, [username]);

  return (
    <React.Fragment>
      {userList.map((user) =>
        <UserListItem
          nested={props.nested}
          name={user.name}
          link={'/user/'.concat(user.name)}
          style={userInfo}
        />,
      )}
      <ListItem key={'CHAN-ERR'}>{error}</ListItem>
    </React.Fragment>
  );
}

export default Users;
