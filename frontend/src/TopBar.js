import React from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    marginLeft: '10px',
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
  const currentWorkspace = 'Workspace 1'; // query where we're at
  const location = useLocation();
  const history = useHistory();

  return (
    <React.Fragment>
      { // back button
        location.pathname !== '/' &&
        <Fab color='inherit' style={butBack} onClick={() => history.goBack()}>
          <ExpandMoreIcon color='primary' fontSize='small'/>
        </Fab>
      }
      <Typography variant="h6" className={classes.title}>
        {currentWorkspace}
      </Typography>
      { // workspace chooser
        location.pathname === '/' &&
        <Fab
          color='inherit'
          style={(props.ddOpen) ? butUp : but}
          onClick={props.toggleDd}
        >
          <ExpandMoreIcon color='primary' fontSize='small'/>
        </Fab>
      }
    </React.Fragment>
  );
}

export default TopBar;
