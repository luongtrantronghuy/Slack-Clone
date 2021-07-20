import React from 'react';
import {Link} from 'react-router-dom';
import {fetchWorkspaces} from './Fetcher';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListIcon from '@material-ui/icons/List';

/**
 * Single button component for dropdown of channels
 * @param {object} props
 * @return {object} JSX
 */
function ChannelListItem(props) {
  return (
    <ListItem
      button
      className={props.nested}
      component={Link}
      to={props.link}
      key={'channel/'.concat(props.name)}
    >
      <ListItemIcon><ListIcon /></ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  );
}

/**
 * Returns the componnents that are the channels within
 * the given workspace
 * @param {object} props
 * @return {object} JSX
 */
function ChannelsList(props) {
  const [channels, setChannels] = React.useState([{channels: null}]);

  React.useEffect(() => {
    fetchWorkspaces(props.workspace, setChannels);
  }, [props.workspace]);

  return (
    <React.Fragment>
      {channels[0].channels && channels[0].channels.map((channel) =>
        <ChannelListItem
          nested={props.nested}
          name={channel}
          link={'/messages/'.concat(channel)}
        />,
      )}
    </React.Fragment>
  );
}

export default ChannelsList;
