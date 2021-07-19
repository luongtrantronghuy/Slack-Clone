import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListIcon from '@material-ui/icons/List';

const fetchChannels = (setChannels, setError) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/channels', {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      setError('');
      setChannels(json);
    })
    .catch((error) => {
      console.log(error);
      setChannels([]);
      setError(`${error.status} - ${error.statusText}`);
    });
};

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
  const [channels, setChannels] = React.useState([]);
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    fetchChannels(setChannels, setError);
  }, []);

  return (
    <React.Fragment>
      {channels.map((channel) =>
        <ChannelListItem
          nested={props.nested}
          name={channel.name}
          link={'/messages/'.concat(channel.name)}
        />,
      )}
      <ListItem key={'CHAN-ERR'}>{error}</ListItem>
    </React.Fragment>
  );
}

export default ChannelsList;
