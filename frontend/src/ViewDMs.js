import React from 'react';
import Users from './ListUsers';
import List from '@material-ui/core/List';

/**
 * Simple list of DMs
 * @param {object} props
 * @return {object} JSX
 */
function DMs(props) {
  return (
    <List>
      <Users />
    </List>
  );
}

export default DMs;
