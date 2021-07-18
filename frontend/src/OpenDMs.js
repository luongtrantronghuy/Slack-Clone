import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import PersonIcon from '@material-ui/icons/Person';

/**
 * List of users inside of a Workspace returned as a list of JSX object for
 * each user
 * @param {object} props
 * @return {object} JSX
 */
function Users(props) {
  return (
    <React.Fragment>
      <ListItem button className={props.nestedClass}>
        <ListItemIcon><LiveHelpIcon /></ListItemIcon>
        <ListItemText primary='Dilbot' />
      </ListItem>
      <ListItem button className={props.nestedClass}>
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText primary='Superuser (you)' />
      </ListItem>
      <ListItem button className={props.nestedClass}>
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText primary='User 1' />
      </ListItem>
      <ListItem button className={props.nestedClass}>
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText primary='User 2' />
      </ListItem>
      <ListItem button className={props.nestedClass}>
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText primary='User 3' />
      </ListItem>
    </React.Fragment>
  );
}

export default Users;
