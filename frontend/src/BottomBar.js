import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  bottomBar: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
}));

/**
 * Returns app view bottom nav for the app
 * @param {object} props
 * @return {object} JSX
 */
function BottomBar(props) {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.bottomBar}>
      <BottomNavigationAction
        component={Link}
        to='/'
        icon={<HomeIcon fontSize='large' />}
      />
      <BottomNavigationAction
        value='HOME'
        icon={<MessageIcon fontSize='large' />}
      />
      <BottomNavigationAction
        value='HOME'
        icon={<AlternateEmailIcon fontSize='large' />}
      />
      <BottomNavigationAction
        value='HOME'
        icon={<SearchIcon fontSize='large' />}
      />
      <BottomNavigationAction
        value='HOME'
        icon={<AccountCircleIcon fontSize='large' />}
      />
    </BottomNavigation>
  );
}

export default BottomBar;
