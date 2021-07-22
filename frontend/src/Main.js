import React from 'react';
import {Switch, Route} from 'react-router-dom';
import DMs from './ViewDMs.js';
import Search from './ViewSearch.js';
import Mentions from './ViewMentions.js';
import Account from './ViewAccount.js';
import BottomBar from './BottomBar.js';
import Home from './ViewHome.js';
import Messages from './ViewMessages.js';
import TopBar from './TopBar.js';
import WorkspaceList from './ListWorkspaces';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer+ 1000,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

/**
 * Main logged in view of the app
 * @param {object} props
 * @return {object} JSX
 */
function Main(props) {
  const classes = useStyles();
  const setLogin = props.setLogin;
  const [dropdownOpen, setDropdown] = React.useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdownOpen);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <TopBar ddOpen={dropdownOpen} toggleDd={toggleDropdown} />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'top'}
        open={dropdownOpen}
        className={classes.drawer}
        onBackdropClick={toggleDropdown}
      >
        <Toolbar />
        <div
          className={classes.drawerContainer}
          onClick={toggleDropdown}
        >
          <List>
            <WorkspaceList />
          </List>
        </div>
      </Drawer>
      <Typography>Hello</Typography>
      <main className={classes.main}>
        <Toolbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/messages/:channel/:thread' component={Messages} />
          <Route exact path='/messages/:channel' component={Messages} />
          <Route exact path='/user/:user' component={Messages} />
          <Route path='/user/:user/:thread' component={Messages} />
          <Route path='/search' component={Search} />
          <Route path='/mentions' component={Mentions} />
          <Route path='/dms' component={DMs} />
          <Route exact path='/account'>
            <Account setLogin={setLogin} />
          </Route>
        </Switch>
        <Toolbar />
      </main>
      <BottomBar />
    </>
  );
}

export default Main;
