/**
 * Forcing icons to be smaller than small:
 * https://stackoverflow.com/questions/37480517/floating-action-button-is-there-a-straightforward-way-to-make-a-button-smaller
 *
 * Close on backdrop click:
 * https://github.com/mui-org/material-ui/issues/4341
 *
 * Switch case on a string:
 * https://stackoverflow.com/questions/14910760/switch-case-as-string
 */
import React from 'react';
import Home from './ViewHome.js';
import TopBar from './TopBar.js';
import WorkspaceList from './WorkspaceList.js';
import {createTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
// import Fab from '@material-ui/core/Fab';
// import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HomeIcon from '@material-ui/icons/Home';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import {Menu as MenuIcon} from '@material-ui/icons';
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

  const [dropdownOpen, setDropdown] = React.useState(false);
  const [viewport, setViewport] = React.useState('HOME');

  const toggleDropdown = () => {
    setDropdown(!dropdownOpen);
  };

  const handleViewport = (page) => {
    setViewport(page);
  };

  return (
    <div className='root'>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <TopBar ddOpen={dropdownOpen} toggleDd={toggleDropdown}
              viewport={viewport} setViewport={setViewport}/>
          </Toolbar>
        </AppBar>
        <Drawer anchor={'top'} open={dropdownOpen} className={classes.drawer}
          onBackdropClick={toggleDropdown}>
          <Toolbar />
          <div className={classes.drawerContainer} onClick={toggleDropdown}>
            <List>
              <WorkspaceList />
            </List>
          </div>
        </Drawer>
        <main className={classes.main}>
          <Toolbar />
          {
            viewport === 'HOME' ?
              <Home handleViewport={handleViewport}/> :
              viewport.substring(0, 3) === 'MSG' ?

                <Messages workspace={viewport.substring(4)} /> :
                <div />
          }
        </main>
        <BottomNavigation value={viewport} className={classes.bottomBar}
          onChange={(event, newValue) => {
            handleViewport(newValue);
          }}>
          <BottomNavigationAction value='HOME'
            icon={<HomeIcon fontSize='large' />} />
          <BottomNavigationAction value='HOME'
            icon={<MessageIcon fontSize='large' />} />
          <BottomNavigationAction value='HOME'
            icon={<AlternateEmailIcon fontSize='large' />} />
          <BottomNavigationAction value='HOME'
            icon={<SearchIcon fontSize='large' />} />
          <BottomNavigationAction value='HOME'
            icon={<AccountCircleIcon fontSize='large' />} />
        </BottomNavigation>
      </ThemeProvider>
    </div>
  );
}

export default App;
