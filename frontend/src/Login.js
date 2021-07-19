import React from 'react';
import {useHistory} from 'react-router-dom';
import {createTheme, makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
  },
  input: {
    fontSize: 18,
    width: '80vw',
    maxWidth: '350px',
    padding: '10',
  },
  login: {
    position: 'relative',
    marginTop: '15%',
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#361D37',
    },
    secondary: {
      main: '#3F0E40',
    },
  },
});

/**
 * @param {object} props
 * @return {object} JSX
 */
function Login(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState({username: '', password: ''});
  const history = useHistory();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    props.setUsername(user.username);
    fetch('authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        props.setLogin(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Error logging in, please try again');
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div align='center' className={classes.login}>
        <form onSubmit={onSubmit}>
          <h2 id='welcome' className={classes.title}>Login</h2>
          <table border='0' cellspacing='20'>
            <tr>
              <td colSpan='2'>
                <input
                  className={classes.input}
                  type='username'
                  name='username'
                  placeholder='Username'
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <input
                  className={classes.input}
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={handleInputChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td align='left'>
                <label>
                  <input type="checkbox" checked="checked" name="remember"/>
                  Remember me
                </label>
              </td>
              <td align='right'>
                <input type='submit' value='Sign In'/>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default Login;
