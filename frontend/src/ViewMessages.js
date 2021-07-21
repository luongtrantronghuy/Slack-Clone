import React from 'react';
// import {useParams} from 'react-router-dom';
import {fetchMessages} from './Fetcher';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import {List, makeStyles, Table} from '@material-ui/core';
import {TableBody, TableCell, TableRow} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import {useLocation} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
  },
  hidediv: {
    borderBottom: 'none',
  },
  message: {
    fontSize: 17,
    width: '80%',
    overflowX: 'auto',
    bottom: 120,
    position: 'fixed',
  },
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
  messageBox: {
    width: '100%',
  },
  messageWrapper: {
    display: 'grid',
    gridTemplateColumns: '80vw',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
  },
}));

const postMessage = (channel, bodyObj, setReturn, setError) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';

  const fetchInfo = async () => {
    return await fetch('/v0/channels/'.concat(channel), {
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
  return (
    <>
      {props.message.map((message) => {
        return (
          <>
            <TableRow>
              <TableCell
                className={classes.hidediv}
                style={{width: '1%'}}
              >
                <Typography>
                  {message.content}
                </Typography>
                <Button>
                  Thread
                </Button>
              </TableCell>
            </TableRow>
          </>
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
  const location = useLocation().pathname.split('/')[2];
  const [draft, composeMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [newMessage, sendNewMessage] = React.useState({});
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    fetchMessages(setMessages, setError, location);
  }, [location]);

  const changeHandler = (event) => {
    composeMessage(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newBody = {
      content: draft,
      to: location,
      from: localStorage.getItem('username'),
    };
    await postMessage(location, newBody, sendNewMessage, setError);
    console.log(newMessage);
    composeMessage('');
  };

  return (
    <>
      <Grid
        container
        direction='rows'
        justifyContent='center'
        alignItems='center'
      >
        <Table className={classes.message}>
          <List>
            <TableBody >
              {messages.map((message) => {
                return (
                  <>
                    <TableRow >
                      {message.time}
                    </TableRow>
                    <Divider />
                    <ListMessage message={message.messages}/>
                  </>
                );
              })}
            </TableBody>
          </List>
        </Table>
      </Grid>
      <div className={classes.paper}>
        <div key={error}>{}</div>
        <Toolbar />
        <div className={classes.messageWrapper}>
          <form noValidate autoComplete="off" onSubmit={submitHandler}>
            <TextField
              id='compose-msg'
              placeholder='send msg'
              variant='outlined'
              color='primary'
              className={classes.messageBox}
              onChange={changeHandler}
              value={draft}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Messages;
