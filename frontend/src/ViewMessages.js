/**
 * Scroll to bottom of page:
 * https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
 */
import React from 'react';
import Home from './ViewHome';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {fetchMessages, fetchThread, fetchDMs, fetchDMThread} from './Fetcher';
import {Divider, ListItem} from '@material-ui/core';
import {List, makeStyles} from '@material-ui/core';
import {TableBody, TableRow} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';

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

const postMessage = async (dir, channel, thread, bodyObj,
  setReturn, setError) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  const url = dir === 'messages' ?
    (thread === undefined ? '/v0/channels/' + channel:
      '/v0/channels/' + channel + '?thread=' + thread) :
    (thread === undefined ? '/v0/dm/' + channel :
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

  try {
    const response = await fetchInfo();
    if (!response.ok) {
      throw response;
    }
    const json = response.json;
    setError('');
    setReturn(json);
    return json;
  } catch (error) {
    console.log(error);
    setReturn([]);
    setError(`${error.status} - ${error.statusText}`);
  };
};

/**
* Single button component for dropdown of channels
* @param {object} props
* @return {object} JSX
*/
function ListMessage(props) {
  const classes = useStyles();

  return (
    <>
      {props.messages.map((message, idx) => {
        if (props.threadException && message.id !== props.threadException) {
          return <div />;
        }

        return (
          <ListItem key={idx}
            component={!props.inThread && !props.threadException && Link}
            to={'/' + props.directory + '/' + props.channel + '/' + message.id}
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
              {message[props.from]}
            </div>
            <div className={classes.content}>
              {message.content}
            </div>
            {
              !props.inThread && !props.threadException &&
              <div className={classes.threadInfo}>
                Thread
              </div>
            }
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
  const {channel, user, thread} = useParams();
  const [messages, setMessages] = React.useState([]); // channels or dms
  const [threadMessages, setThreadMessages] = React.useState([]);
  const [textMessage, composeTextMessage] = React.useState('');
  const [error, setError] = React.useState([]);

  // const [draft, composeMessage] = React.useState('');
  // const [messages, setMessages] = React.useState([]);

  const fetchDependencies = async () => {
    if (channel) {
      await fetchMessages(setMessages, setError, channel);
      if (thread) {
        await fetchThread(setThreadMessages, setError, channel, thread);
      }
    } else if (user) {
      await fetchDMs(setMessages, setError, user);
      if (thread) {
        await fetchDMThread(setThreadMessages, setError, user, thread);
      }
    }
  };

  React.useEffect(() => {
    if (channel) {
      fetchMessages(setMessages, setError, channel)
        .then(() => {
          if (thread) {
            fetchThread(setThreadMessages, setError, channel, thread);
          }
        })
        .catch((err) => console.log(err));
    } else if (user) {
      fetchDMs(setMessages, setError, user)
        .then(() => {
          if (thread) {
            fetchDMThread(setThreadMessages, setError, user, thread);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [channel, thread, user]);

  const changeHandler = (event) => {
    composeTextMessage(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const directory = channel ? 'messages' : 'user';
    const username = localStorage.getItem('username');
    await postMessage(
      directory,
      channel || user,
      thread,
      {content: textMessage, from: username, from_user: username},
      () => {},
      setError,
    );
    composeTextMessage(''); // clear input
    await fetchDependencies(); // refresh messages
    scrollRef.current.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <>
      {isWidthUp('sm', props.width) && <Home />}
      <div className={classes.paper}>
        <div key={error}>{}</div>
        <Toolbar />
        <div className={classes.messageWrapper}>
          <form noValidate autoComplete="off" onSubmit={submitHandler}>
            <TextField
              value={textMessage}
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
                  { !thread &&
                    <>
                      <TableRow >
                        {message.time}
                      </TableRow>
                      <Divider />
                    </>
                  }
                  <ListMessage
                    channel={channel || user}
                    directory={channel ? 'messages' : 'user'}
                    from={'from'}
                    messages={message.messages}
                    threadException={thread}
                  />
                </>
              );
            })}
            {thread && threadMessages.map((message) => {
              return (
                <ListMessage
                  from={'from_user'}
                  messages={message.messages}
                  inThread={true}
                />
              );
            })}
          </TableBody>
          <div ref={scrollRef} />
        </List>
      </div>
    </>
  );
}

export default withWidth()(Messages);
