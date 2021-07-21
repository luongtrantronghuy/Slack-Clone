import React from 'react';
import {Divider} from '@material-ui/core';
import {List, makeStyles} from '@material-ui/core';
import {TableBody, TableRow} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';

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
    width: '100%',
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
    marginTop: '20px',
    marginBottom: '10px',
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

// const postMessage = (channel, bodyObj, setReturn, setError) => {
//   const item = localStorage.getItem('user');
//   if (!item) {
//     return;
//   }
//   const user = JSON.parse(item);
//   const bearerToken = user ? user.accessToken : '';

//   const fetchInfo = async () => {
//     return await fetch('/v0/channels/'.concat(channel), {
//       method: 'POST',
//       headers: new Headers({
//         'Authorization': `Bearer ${bearerToken}`,
//         'Content-Type': 'application/json',
//       }),
//       body: JSON.stringify(bodyObj),
//     });
//   };

//   fetchInfo().then((response) => {
//     if (!response.ok) {
//       throw response;
//     }
//     return response.json();
//   })
//     .then((json) => {
//       setError('');
//       setReturn(json);
//       return json;
//     })
//     .catch((error) => {
//       console.log(error);
//       setReturn([]);
//       setError(`${error.status} - ${error.statusText}`);
//     });
// };

/**
 * Single button component for dropdown of channels
 * @param {object} props
 * @return {object} JSX
 */
function ListMessage(props) {
  const classes = useStyles();

  const openThread = (messageThread) => {
    console.log(messageThread);
  };

  return (
    <>
      {props.message.map((message) => {
        return (
          <div
            onClick={() => openThread(message)}
            className={classes.messageBox}
          >
            <div className={classes.avatar}>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </div>
            <div className={classes.messageUser}>
              User
            </div>
            <div className={classes.content}>
              {message.content}
            </div>
            <div className={classes.threadInfo}>
              Thread
            </div>
          </div>
        );
      })}
    </>
  );
}

/**
 * Thread component for any message
 * @param {object} props
 * @return {object} JSX
 */
function Thread(props) {
  const classes = useStyles();
  const messages = [{content: ''}];
  const [draft, composeMessage] = React.useState('');

  const changeHandler = (event) => {
    composeMessage(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // const newBody = {
    //   content: draft,
    //   to: location,
    //   from: localStorage.getItem('username'),
    // };
    // await postMessage(location, newBody, sendNewMessage, setError);
    console.log(draft);
    composeMessage('');
  };

  return (
    <>
      <div className={classes.paper}>
        <Toolbar />
        <div className={classes.messageWrapper}>
          <form noValidate autoComplete="off" onSubmit={submitHandler}>
            <TextField
              id='compose-msg'
              placeholder='send msg'
              variant='outlined'
              color='primary'
              className={classes.inputField}
              onChange={changeHandler}
              value={draft}
            />
          </form>
        </div>
        {false && <List className={classes.message}>
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
        </List>}
      </div>
    </>
  );
}

export default Thread;
