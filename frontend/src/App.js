/**
 * Forcing icons to be smaller than small:
 * https://stackoverflow.com/questions/37480517/floating-action-button-is-there-a-straightforward-way-to-make-a-button-smaller
 *
 * Close on backdrop click:
 * https://github.com/mui-org/material-ui/issues/4341
 */
import React from 'react';
import Home from './Home.js';
import TopBar from './TopBar.js';
import WorkspaceList from './WorkspaceList.js';
import {createTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
// import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer+ 1000,
  },
  bottomBar: {
    top: 'auto',
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
  const [viewport, setViewport] = React.useState('Home');

  const toggleDropdown = () => {
    setDropdown(!dropdownOpen);
  };

  return (
    <div className='root'>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <TopBar ddOpen={dropdownOpen} toggleDd={toggleDropdown}
              viewport={viewport}/>
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
          {viewport === 'Home' && <Home setViewport={setViewport}/>}
        </main>
        <AppBar position="absolute" color="inherit"
          className={classes.bottomBar}>
          <Toolbar>
            <IconButton className={classes.bottomIcon} size='medium'>
              <HomeIcon fontSize='large' />
            </IconButton>
            <IconButton className={classes.bottomIcon} size='medium'>
              <MessageIcon fontSize='large' />
            </IconButton>
            <IconButton className={classes.bottomIcon} size='medium'>
              <AlternateEmailIcon fontSize='large' />
            </IconButton>
            <IconButton className={classes.bottomIcon} size='medium'>
              <SearchIcon fontSize='large' />
            </IconButton>
            <IconButton className={classes.bottomIcon} size='medium'>
              <AccountCircleIcon fontSize='large' />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}

export default App;
