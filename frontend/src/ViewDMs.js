import React from 'react';
import Home from './ViewHome';
import Users from './ListUsers';
import {makeStyles} from '@material-ui/core';
import List from '@material-ui/core/List';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
  marginLeft: {
    marginLeft: '225px',
  },
}));

/**
 * Simple list of DMs
 * @param {object} props
 * @return {object} JSX
 */
function DMs(props) {
  const classes = useStyles();

  return (
    <>
      {isWidthUp('sm', props.width) && <Home />}
      <List className={isWidthUp('sm', props.width) && classes.marginLeft}>
        <Users />
      </List>
    </>
  );
}

export default withWidth()(DMs);
