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
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BottomBar from './BottomBar.js';
import Home from './ViewHome.js';
import Login from './Login.js';
import Messages from './ViewMessages.js';
import TopBar from './TopBar.js';
import WorkspaceList from './ListWorkspaces';
import {createTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';

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
  const [loggedIn, setLogin] = React.useState(false);
  const [dropdownOpen, setDropdown] = React.useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdownOpen);
  };

  return (
    <div className='root'>
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          {loggedIn ?
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
                      <Home />
                    </Route>
                    <Route path='/messages/:id'>
                      <Messages />
                    </Route>
                    <Route path='/messages'>
                      <Messages />
                    </Route>
                  </Switch>
                  <Toolbar />
                </main>
                <BottomBar />
              </React.Fragment>
            ) :
            <Login setLogin={setLogin} />
          }
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
