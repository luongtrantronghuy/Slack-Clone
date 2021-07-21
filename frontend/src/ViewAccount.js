/**
 * --
 * Notes
 *
 * * needs emoji picker added to status box
 */
import React from 'react';
import {fetchUserInfo} from './Fetcher';
import {makeStyles} from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  box: {
    margin: '0 auto',
    width: '90vw',
    maxWidth: '500px',
    height: '100px',
    display: 'grid',
    gridTemplateRows: '60% 40%',
    gridTemplateColumns: 'auto 80%',
    justifyItems: 'flex-start',
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  profilePic: {
    fontWeight: 'bolder',
    alignSelf: 'center',
    justifySelf: 'center',
    gridRow: '1 / 3',
  },
  userName: {
    alignSelf: 'end',
    gridRow: '1',
    gridColumn: '2',
  },
  userStatus: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    alignItems: 'center',
    alignSelf: 'start',
    gridRow: '2',
    gridColumn: '2',
  },
  circle: {
    height: '10px',
    width: '10px',
    marginRight: '10px',
    borderRadius: '50%',
    backgroundColor: 'green',
  },
  nameLabel: {
    ...theme.typography.h5,
    fontWeight: 'bold',
  },
  statusBoxWrapper: {
    display: 'grid',
    backgroundColor: 'red',
    gridTemplateColumns: '80vw',
    justifyItems: 'center',
    width: '90vw',
    height: 'auto',
  },
  statusBox: {
    width: '90vw',
    margin: '0 5vw',
  },
  endButton: {
    margin: '10px',
    width: '95%',
  },
}));

/**
* Creates the user status card for the user
* @param {object} props
* @return {object} JSX
*/
function UserCard(props) {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <div className={classes.profilePic}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
      </div>
      <div className={classes.userName}>
        <div className={classes.nameLabel}>
          {props.name}
        </div>
      </div>
      <div className={classes.userStatus}>
        <div className={classes.circle} />
        <Typography variant='subtitle2'>
          Active
        </Typography>
      </div>
    </div>
  );
}

/**
* The text field to update user status
* @param {object} props
* @return {object} JSX
*/
function StatusBar(props) {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off">
      <TextField id='update-status' placeholder='update your status'
        variant='outlined' className={classes.statusBox} />
    </form>
  );
}

const logout = () => {
  localStorage.removeItem('user');
};

/**
* Returns the view for user account
* @param {object} props
* @return {object} JSX
*/
function Account(props) {
  const classes = useStyles();
  const username = localStorage.getItem('username');
  const [userInfo, setUserInfo] = React.useState([{name: ''}]);
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    fetchUserInfo(setUserInfo, setError, username);
  }, [username]);

  return (
    <>
      <div>{error}</div>
      <UserCard name={userInfo[0].name} />
      <StatusBar />
      <Button disableRipple className={classes.endButton}>
        Set yourself as AWAY
      </Button>
      <Divider />
      <Button
        disableRipple
        className={classes.endButton}
        onClick={() => {
          logout();
          props.setLogin(false);
        }}
      >
        Sign out
      </Button>
    </>
  );
}

export default Account;
