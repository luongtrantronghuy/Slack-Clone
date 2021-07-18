import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListIcon from '@material-ui/icons/List';

// const getChannels = async () => {
//   try {
//     const reponses = await fetch('http://localhost:3010/v0/channels', {

//     });
//   } catch(err) {
//     console.error(err);
//   }
// };

/**
 * Returns the componnents that are the channels within
 * the given workspace
 * @param {object} props
 * @return {object} JSX
 */
function Channels(props) {
  const channels = [ // for testing, in real, grab channels from curr workspace
    {id: 1, name: 'general', messages: []},
    {id: 2, name: 'questions', messages: []},
    {id: 3, name: 'discussions', messages: []},
    {id: 4, name: 'memes', messages: []},
    {id: 5, name: 'serious', messages: []},
  ];

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
    </React.Fragment>
  );
}

export default Channels;
