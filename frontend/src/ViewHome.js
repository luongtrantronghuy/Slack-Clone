/**
 * On hover:
 * https://stackoverflow.com/questions/64983425/material-ui-button-hover-active-background-color-and-text-color
 *
 * Setting bg color:
 * https://stackoverflow.com/questions/51265838/material-ui-drawer-set-background-color
 */
import React from 'react';
import ChannelsList from './ListChannels';
import Users from './ListUsers';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import MessageIcon from '@material-ui/icons/Message';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  dropdown: {
    '&:hover': {
      backgroundColor: 'rgb(225,225,225)',
    },
  },
  nested: {
    'color': 'inherit',
    'paddingLeft': theme.spacing(4),
    '&:hover': {
      backgroundColor: 'rgb(225,225,225)',
    },
  },
  paper: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
}));

/**
 * Home menu defined by size of screen
 * @param {object} props
 * @return {object} JSX
 */
function Home(props) {
  const classes = useStyles();
  const [channelsOpen, setChannels] = React.useState(true);
  const [dmsOpen, setDms] = React.useState(true);

  const toggleChannels = () => {
    setChannels(!channelsOpen);
  };

  const toggleDms = () => {
    setDms(!dmsOpen);
  };

  const wrappedContent = (
    <List>
      {
        isWidthUp('sm', props.width) &&
        <>
          <ListItem
            button
            component={Link}
            to='/dms'
            className={classes.dropdown}
          >
            <ListItemIcon>
              <MessageIcon color='white' />
            </ListItemIcon>
            <ListItemText primary='All DMs' />
          </ListItem>
          <ListItem
            button
            component={Link}
            to='/mentions'
            className={classes.dropdown}
          >
            <ListItemIcon>
              <AlternateEmailIcon color='white' />
            </ListItemIcon>
            <ListItemText primary='Mentions' />
          </ListItem>
        </>
      }
      <ListItem button onClick={toggleChannels} className={classes.dropdown}>
        <ListItemIcon>
          <ArrowDropDownCircleIcon
            color={isWidthUp('sm', props.width) ? 'white' : 'primary'}
            style={channelsOpen ? {} : {transform: 'rotate(-90deg)'}}
          />
        </ListItemIcon>
        <ListItemText primary='Channels' />
      </ListItem>
      <Collapse in={channelsOpen}>
        <List>
          <ChannelsList nested={classes.nested} />
          <ListItem button className={classes.nested}>
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText primary='Add new channel' />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={toggleDms} className={classes.dropdown}>
        <ListItemIcon>
          <ArrowDropDownCircleIcon
            color={isWidthUp('sm', props.width) ? 'white' : 'primary'}
            style={dmsOpen ? {} : {transform: 'rotate(-90deg)'}}
          />
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

  return (
    <>
      {
        isWidthUp('sm', props.width) ?
          (
            <Drawer
              open={true}
              variant={'permanent'}
              classes={{paper: classes.paper}}
            >
              <Toolbar />
              {wrappedContent}
            </Drawer>
          ) : wrappedContent
      }
    </>
  );
}

export default withWidth()(Home);
