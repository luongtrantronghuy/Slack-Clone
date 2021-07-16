/**
 * On hover:
 * https://stackoverflow.com/questions/64983425/material-ui-button-hover-active-background-color-and-text-color
 */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

const useStyles = makeStyles((theme) => ({
  dropdown: {
    'backgroundColor': 'white',
    '&:hover': {
      backgroundColor: 'rgb(225,225,225)',
    },
  },
  nested: {
    'paddingLeft': theme.spacing(4),
    '&:hover': {
      backgroundColor: 'rgb(225,225,225)',
    },
  },
}));

/**
 * Home menu defined by size of screen
 * @param {object} props
 * @return {object} JSX
 */
function Home(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem button onClick={toggleOpen}
        className={classes.dropdown}>
        <ListItemIcon>
          <ArrowDropDownCircleIcon color='primary'
            style={open ? {} : {transform: 'rotate(-90deg)'}} />
        </ListItemIcon>
        <ListItemText primary='Channels' />
      </ListItem>
      <Collapse in={open}>
        <List>
          <ListItem button className={classes.nested}>
            <ListItemText primary='Channel 1' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary='Channel 2' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary='Channel 3' />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary='Channel 4' />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

export default Home;
