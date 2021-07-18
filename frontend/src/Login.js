import React from 'react';
import {useHistory} from 'react-router-dom';

/**
 * @param {object} props
 * @return {object} JSX
 */
function Login(props) {
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
    // const request = new Request({
    //   method: 'POST',
    //   body: JSON.stringify(user),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
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
    <form onSubmit={onSubmit}>
      <h2 id='welcome'>Log in to Slack</h2>
      <input
        type='username'
        name='username'
        placeholder='username'
        onChange={handleInputChange}
        required
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        onChange={handleInputChange}
        required
      />
      <input type='submit' value='Submit'/>
    </form>
  );
}

export default Login;
