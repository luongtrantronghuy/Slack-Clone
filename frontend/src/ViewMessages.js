import React from 'react';
// import {useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
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
  // const {id} = useParams(); // id of channel we're in
  // const channels = [ // for testing, in real, grab channels from curr ws
  //   {id: 1, name: 'general', messages: []},
  //   {id: 2, name: 'questions', messages: []},
  //   {id: 3, name: 'discussions', messages: []},
  //   {id: 4, name: 'memes', messages: []},
  //   {id: 5, name: 'serious', messages: []},
  // ];

  // React.useEffect(() => {
  //   fetchMessage(setWorkspaces, setError);
  // }, []);

  return (
    <div className={classes.paper}>
      <Toolbar />
      <div className={classes.messageWrapper}>
        <form noValidate autoComplete="off">
          <TextField id='compose-msg' placeholder='send msg' variant='outlined'
            color='primary' className={classes.messageBox} />
        </form>
      </div>
    </div>
  );
}

export default Messages;
