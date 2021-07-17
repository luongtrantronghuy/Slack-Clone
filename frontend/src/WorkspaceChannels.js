import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListIcon from '@material-ui/icons/List';

/**
 * Returns the componnents that are the channels within
 * the given workspace
 * @param {object} props
 * @return {object} JSX
 */
function Channels(props) {
  return (
    <React.Fragment>
      {['general', 'homework', 'other'].map((channelName) => (
        <ListItem button className={props.nested}
          onClick={() => {
            props.handleViewport('MSG-'.concat(channelName));
          }}>
          <ListItemIcon><ListIcon /></ListItemIcon>
          <ListItemText primary={channelName} />
        </ListItem>
      ))}
    </React.Fragment>
  );
}

export default Channels;
