import React from 'react';
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

const butBack = Object.assign(
  {}, but, {transform: 'rotate(90deg)'},
);

const butUp = Object.assign(
  {}, but, {transform: 'rotate(180deg)'},
);

const renderBackButton = (viewing, setViewport) => {
  if (viewing.substring(0, 3) === 'MSG') { // message thread ret to HOME
    return (
      <Fab color='inherit' style={butBack}
        onClick={() => {
          setViewport('HOME');
        }}>
        <ExpandMoreIcon color='primary' fontSize='small'/>
      </Fab>
    );
  }
};

const renderDropdown = (viewing, cond, onClick) => {
  if (viewing === 'HOME') {
    return (
      <Fab color='inherit' onClick={onClick} style={(cond) ? butUp : but}>
        <ExpandMoreIcon color='primary' fontSize='small'/>
      </Fab>
    );
  }
};

/**
 * Returns elements to be found on top appbar
 * @param {object} props
 * @return {object} JSX
 */
function TopBar(props) {
  const classes = useStyles();
  const currentWorkspace = 'Workspace 1'; // query where we're at

  return (
    <React.Fragment>
      {renderBackButton(props.viewport, props.setViewport)}
      <Typography variant="h6" className={classes.title}>
        {currentWorkspace}
      </Typography>
      {renderDropdown(props.viewport, props.ddOpen, props.toggleDd)}
    </React.Fragment>
  );
}

export default TopBar;
