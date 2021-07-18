/**
 * Testing branching -chllamas
 */
import React from 'react';

import Emoji from './Emoji';

/**
 * Forcing icons to be smaller than small:
 * https://stackoverflow.com/questions/37480517/floating-action-button-is-there-a-straightforward-way-to-make-a-button-smaller
 *
 * Close on backdrop click:
 * https://github.com/mui-org/material-ui/issues/4341
 *
 * Switch case on a string:
 * https://stackoverflow.com/questions/14910760/switch-case-as-string
 *
 * Using React-Router-dom:
 * https://reactrouter.com/web/guides/primary-components
 *
 * Using Context as a global provider for username:
 * https://reactjs.org/docs/context.html#when-to-use-context
 */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useHistory,
} from 'react-router-dom';
import Home from './ViewHome.js';
import Login from './Login.js';
import TopBar from './TopBar.js';
import WorkspaceList from './WorkspaceList.js';
import {createTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import SearchIcon from '@material-ui/icons/Search';
import Messages from './ViewMessages.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer+ 1000,
  },
  bottomBar: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
  bottomIcon: {
    flexGrow: 1,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#361D37',
    },
    secondary: {
      main: '#3F0E40',
    },
  },
});

/**
 * Simple component with no state.
 * Viewports:
 *  - Home
 *  - Messages
 *  - Thread
 *  - Account
 *
 * @return {object} JSX
 */
function App() {
  const classes = useStyles();
  // const history = useHistory();

  const [dropdownOpen, setDropdown] = React.useState(false);
  const [viewport, setViewport] = React.useState('HOME');

  // const histHome = () => {
  //   history.push('/');
  // };

  const toggleDropdown = () => {
    setDropdown(!dropdownOpen);
  };

  const handleViewport = (page) => {
    setViewport(page);
  };

  return (
    <div className='root'>
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          {localStorage.getItem('user') === undefined ?
            (
              <React.Fragment>
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
                <main className={classes.main}>
                  <Toolbar />
                  <Switch>
                    <Route exact path='/'>
                      <Home handleViewport={handleViewport}/>
                    </Route>
                    <Route path='/messages/:id'>
                      <Messages workspace={viewport.substring(4)} />
                    </Route>
                    <Route path='/messages'>
                      <Messages workspace={viewport.substring(4)} />
                    </Route>
                  </Switch>
                  <Toolbar />
                </main>
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
              </React.Fragment>
            ) :
            <Login />
          }
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
