import React from 'react';
import {useLocation, useHistory, Redirect} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {Hidden, TextField} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
  inputField: {
    position: 'fixed',
    textAlign: 'center',
    left: '40%',
    top: '0.4%',
    height: '10px',
    fontSize: 10,
    width: '300px',
  },
  title: {
    marginLeft: '10px',
    [theme.breakpoints.up('sm')]: {
      marginRight: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
      marginRight: theme.spacing(2),
    },
  },
}));

const but = {
  maxWidth: '25px',
  maxHeight: '25px',
  minWidth: '25px',
  minHeight: '25px',
};

// buttonBackwards
const butBack = Object.assign(
  {}, but, {transform: 'rotate(90deg)'},
);

// buttonUpwards
const butUp = Object.assign(
  {}, but, {transform: 'rotate(180deg)'},
);

/**
 * Returns elements to be found on top appbar
 * @param {object} props
 * @return {object} JSX
 */
function TopBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const pathname = useLocation().pathname; // '/messages/yada yada
  const pathArray = pathname.split('/');
  pathArray.splice(0, 1);
  const [location, chann, thread] = pathArray; // /messages <-

  // grab channel name if we're in one
  const getDirectory = () => {
    if (pathname !== '/' && !isWidthUp('sm', props.width)) {
      switch (location) {
      case 'messages':
        if (thread) return 'Thread ' + chann;
        return chann;
      case 'user':
        if (thread) return 'Thread ' + chann;
        return chann;
      case 'dms':
        return 'Direct Messages';
      case 'mentions':
        return 'Mentions';
      case 'search':
        return 'Search';
      default:
        return '';
      }
    }
    return localStorage.getItem('workspace');
  };


  // if (location.pathname !== '/') {
  //   const pathArray = location.pathname.split('/');
  //   if (pathArray[1] === 'messages' || pathArray[1] === 'user') {
  //     if (pathArray[3]) {
  //       directory = 'Thread ' + pathArray[2];
  //     } else {
  //       directory = pathArray[2];
  //     }
  //   } else if (pathArray[1] === 'account') {
  //     directory = '';
  //   }
  // } else {

  // }

  return (
    <>
      { // back button
        pathname !== '/' && !isWidthUp('sm', props.width) &&
        <Fab color='inherit' style={butBack} onClick={() => history.goBack()}>
          <ExpandMoreIcon color='primary' fontSize='small'/>
        </Fab>
      }
      <Typography variant="h6" className={classes.title}>
        {getDirectory()}
      </Typography>
      { // workspace chooser
        (pathname === '/' || isWidthUp('sm', props.width)) &&
        <Fab
          color='inherit'
          style={(props.ddOpen) ? butUp : but}
          onClick={props.toggleDd}
        >
          <ExpandMoreIcon color='primary' fontSize='small'/>
        </Fab>
      }
      <Hidden xsDown>
        <div component={Link}
          to='/mentions'>
          <form noValidate autoComplete="off"
            onSubmit={() => {
              return <Redirect to='/search'/>;
            }}>
            <TextField
              // value={search}
              color='primary'
              id='compose-msg'
              variant='outlined'
              placeholder='search'
              // onChange={changeHandler}
              className={classes.inputField}
            />
          </form>
        </div>
      </Hidden>
    </>
  );
}

export default withWidth()(TopBar);
