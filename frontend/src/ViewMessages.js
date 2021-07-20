import React from 'react';
// import {useParams} from 'react-router-dom';
import {Button, Grid, makeStyles, Table} from '@material-ui/core';
import {TableBody, TableCell, TableRow} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import {useLocation} from 'react-router-dom';

const fetchMessages = (setMessages, setError, directory) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/channels/'+directory, {
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
      setMessages(json);
    })
    .catch((error) => {
      console.log(error);
      setMessages([]);
      setError(`${error.status} - ${error.statusText}`);
    });
};

const useStyles = makeStyles((theme) => ({
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

/**
 * Grabs all messages from defined workspace
 * @param {object} props
 * @return {object} JSX
 */
function Messages(props) {
  const classes = useStyles();
  // grab channel name if we're in one
  const location = useLocation();
  const [messages, setMessages] = React.useState([]);
  const [error, setError] = React.useState([]);

  let directory = 'Workspace 1'; // defaults to current workspace
  if (location.pathname !== '/') {
    const pathArray = location.pathname.split('/');
    if (pathArray[1] === 'messages' || pathArray[1] === 'direct-messages') {
      directory = pathArray[2];
    } else if (pathArray[1] === 'account') {
      directory = '';
    }
  }

  React.useEffect(() => {
    fetchMessages(setMessages, setError, directory);
  }, [directory]);

  // console.log(messages); // print out the message in console for testing

  return (
    <>
      <Grid
        container
        direction='rows'
        justifyContent='center'
        alignItems='center'
      >
        <Table className={classes.message}>
          <TableBody >
            {(messages.sort((b, a) =>{
              return new Date(a.sent) - new Date(b.sent);
            })).map((message) => {
              return (
                <>
                  <TableRow>
                    {message.content}
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.hidediv}>
                      <Button>
                        Thread
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </Grid>
      <div className={classes.paper}>
        <div key={error}>{}</div>
        <Toolbar />
        <div className={classes.messageWrapper}>
          <form noValidate autoComplete="off">
            <TextField id='compose-msg' placeholder='send msg'
              variant='outlined'
              color='primary' className={classes.messageBox} />
          </form>
        </div>
      </div>
    </>
  );
}

export default Messages;
