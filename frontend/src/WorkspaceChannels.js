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
 * Returns the componnents that are the channels within
 * the given workspace
 * @param {object} props
 * @return {object} JSX
 */
function Channels(props) {
  const [channels, setChannels] = React.useState([]);
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    fetchChannels(setChannels, setError);
  }, []);

  return (
    <React.Fragment>
      {channels.map((channel) => (
        <ListItem
          button
          className={props.nested}
          component={Link}
          to={'/messages/'.concat(channel.id.toString(10))}
        >
          <ListItemIcon><ListIcon /></ListItemIcon>
          <ListItemText primary={channel.name} />
        </ListItem>
      ))}
      <ListItem>{error}</ListItem>
    </React.Fragment>
  );
}

export default Channels;
