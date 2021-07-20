/**
 * On hover:
 * https://stackoverflow.com/questions/64983425/material-ui-button-hover-active-background-color-and-text-color
 */
import React from 'react';
import ChannelsList from './ListChannels';
import Users from './OpenDMs';
import {makeStyles} from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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
  const username = localStorage.getItem('username');
  const [channelsOpen, setChannels] = React.useState(true);
  const [dmsOpen, setDms] = React.useState(true);

  const toggleChannels = () => {
    setChannels(!channelsOpen);
  };

  const toggleDms = () => {
    setDms(!dmsOpen);
  };

  return (
    <List>
      <ListItem button onClick={toggleChannels} className={classes.dropdown}>
        <ListItemIcon>
          <ArrowDropDownCircleIcon color='primary'
            style={channelsOpen ? {} : {transform: 'rotate(-90deg)'}} />
        </ListItemIcon>
        <ListItemText primary='Channels' />
      </ListItem>
      <Collapse in={channelsOpen}>
        <List>
          <ChannelsList nested={classes.nested} username={username} />
          <ListItem button className={classes.nested}>
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText primary='Add new channel' />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={toggleDms} className={classes.dropdown}>
        <ListItemIcon>
          <ArrowDropDownCircleIcon color='primary'
            style={dmsOpen ? {} : {transform: 'rotate(-90deg)'}} />
        </ListItemIcon>
        <ListItemText primary='Direct Messages' />
      </ListItem>
      <Collapse in={dmsOpen}>
        <List>
          <Users nested={classes.nested} />
          <ListItem button className={classes.nested}>
            <ListItemIcon><PersonAddIcon /></ListItemIcon>
            <ListItemText primary='Add Teammate' />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

export default Home;
