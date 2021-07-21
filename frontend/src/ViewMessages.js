/**
 * Scroll to bottom of page:
 * https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
 */
import React from 'react';
// import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {fetchMessages, fetchThread, fetchDMs, fetchDMThread} from './Fetcher';
import {Divider, ListItem} from '@material-ui/core';
import {List, makeStyles} from '@material-ui/core';
import {TableBody, TableRow} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import {useLocation} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  inputField: {
    width: '100%',
    maxWidth: '1000px',
  },
  message: {
    margin: '0 auto',
    fontSize: 17,
    width: '100vw',
    height: '80vh',
    maxWidth: '1000px',
    overflowY: 'scroll',
  },
  messageWrapper: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: '100%',
    margin: '0 auto',
    width: '90%',
    maxWidth: '1000px',
    height: 'auto',
  },

  // classes for chat messages
  messageBox: {
    color: 'black',
    marginTop: '20px',
    marginBottom: '10px',
    display: 'grid',
    gridTemplateColumns: '50px 90%',
    gridTemplateRows: '25px auto 25px',
  },
  threadReply: {
    color: 'black',
    marginTop: '20px',
    marginBottom: '10px',
    marginLeft: '50px', // addition
    display: 'grid',
    gridTemplateColumns: '50px 90%',
    gridTemplateRows: '25px auto 25px',
  },
  messageUser: {
    marginLeft: '10px',
    marginTop: '10px',
    gridRow: 1,
    gridColumn: 2,
  },
  content: {
    maxWidth: '55vw',
    wordWrap: 'break-word',
    marginLeft: '10px',
    marginTop: '10px',
    gridRow: 2,
    gridColumn: 2,
  },
  threadInfo: {
    marginLeft: '10px',
    gridColumn: '1 / 3',
    gridRow: 3,
  },
  avatar: {
    marginLeft: '5px',
    marginTop: '5px',
  },
}));

const postMessage = (dir, channel, thread, bodyObj, setReturn, setError) => {
  const item = localStorage.getItem('user');

  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  const url = dir === 'messages' ?
    (thread === undefined ? '/v0/channels/'.concat(channel) :
      '/v0/channels/' + channel + '?thread=' + thread) :
    (thread === undefined ? '/v0/dm/'.concat(channel) :
      '/v0/dm/' + channel + '?thread=' + thread);

  const fetchInfo = async () => {
    return await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(bodyObj),
    });
  };

  fetchInfo().then((response) => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  })
    .then((json) => {
      setError('');
      setReturn(json);
      return json;
    })
    .catch((error) => {
      console.log(error);
      setReturn([]);
      setError(`${error.status} - ${error.statusText}`);
    });
};

/**
 * Single button component for dropdown of channels
 * @param {object} props
 * @return {object} JSX
 */
function ListMessage(props) {
  const classes = useStyles();

  // const openThread = (message) => {
  //   console.log(message);
  // };

  return (
    <>
      {props.message.map((message) => {
        console.log(message);
        return (
          <ListItem
            component={!props.inThread && Link}
            to={'/' + props.directory + '/' + props.channel + '/' + message.id}
            // onClick={() => openThread(message)}
            className={props.inThread ?
              classes.threadReply : classes.messageBox
            }
          >
            <div className={classes.avatar}>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </div>
            <div className={classes.messageUser}>
              {props.inDM ? message.from_user : message.from}
            </div>
            <div className={classes.content}>
              {message.content}
            </div>
            <div className={classes.threadInfo}>
              Thread
            </div>
          </ListItem>
        );
      })}
    </>
  );
}

/**
 * Grabs all messages from defined workspace
 * @param {object} props
 * @return {object} JSX
 */
function Messages(props) {
  const classes = useStyles();
  const scrollRef = React.useRef();
  const pathnameArray = useLocation().pathname.split('/');
  pathnameArray.splice(0, 1);
  const [directory, channel, thread] = pathnameArray;
  const [draft, composeMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [newMessage, sendNewMessage] = React.useState({});
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    if (directory === 'messages') {
      if (thread === undefined) {
        fetchMessages(setMessages, setError, channel);
      } else {
        fetchThread(setMessages, setError, channel, thread);
      }
    } else if (directory === 'user') {
      if (thread === undefined) {
        fetchDMs(setMessages, setError, channel);
      } else {
        fetchDMThread(setMessages, setError, channel, thread);
      }
    }
  }, [directory, channel, thread, messages]);

  const changeHandler = (event) => {
    composeMessage(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (directory === 'messages') {
      const newBody = {
        content: draft,
        to: channel,
        from: localStorage.getItem('username'),
      };
      await postMessage(
        directory,
        channel,
        thread,
        newBody,
        sendNewMessage,
        setError,
      );
      scrollRef.current.scrollIntoView({behavior: 'smooth'});
      console.log(newMessage);
    } else if (directory === 'user') {
      const newBody = {
        content: draft,
      };
      await postMessage(
        directory,
        channel,
        thread,
        newBody,
        sendNewMessage,
        setError,
      );
      scrollRef.current.scrollIntoView({behavior: 'smooth'});
    }
    composeMessage('');
  };

  return (
    <>
      <div className={classes.paper}>
        <div key={error}>{}</div>
        <Toolbar />
        <div className={classes.messageWrapper}>
          <form noValidate autoComplete="off" onSubmit={submitHandler}>
            <TextField
              value={draft}
              color='primary'
              id='compose-msg'
              variant='outlined'
              placeholder='send msg'
              onChange={changeHandler}
              className={classes.inputField}
            />
          </form>
        </div>
        <List className={classes.message}>
          <TableBody >
            {messages.map((message) => {
              return (
                <>
                  {
                    thread === undefined &&
                      <TableRow >
                        {message.time}
                      </TableRow>
                  }
                  <Divider />
                  <ListMessage
                    channel={channel}
                    directory={directory}
                    message={message.messages}
                    inThread={thread !== undefined}
                    inDM={directory === 'user'}
                  />
                </>
              );
            })}
          </TableBody>
          <div ref={scrollRef} />
        </List>
      </div>
    </>
  );
}

export default Messages;
