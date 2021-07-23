/**
 * Forcing icons to be smaller than small:
 * https://stackoverflow.com/questions/37480517/floating-action-button-is-there-a-straightforward-way-to-make-a-button-smaller
 *
 * Close on backdrop click:
 * https://github.com/mui-org/material-ui/issues/4341
 *
 * Switch case on a string:
 * https://stackoverflow.com/questions/14910760/switch-case-as-string
 *
 * Using React-Router-dom:
 * https://reactrouter.com/web/guides/primary-components
 *
 * Using Context as a global provider for username:
 * https://reactjs.org/docs/context.html#when-to-use-context
 */
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Login from './Login.js';
import Main from './Main.js';
import {createTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#361D37',
    },
    secondary: {
      main: '#3F0E40',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

/**
 * Simple component with no state.
 * Viewports:
 *  - Home
 *  - Messages
 *  - Thread
 *  - Account
 *
 * @return {object} JSX
 */
function App() {
  const [loggedIn, setLogin] = React.useState(
    localStorage.getItem('user') !== null,
  );

  return (
    <div className='root'>
      <Router>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          {
            loggedIn ?
              <Main setLogin={setLogin} /> :
              <Login setLogin={setLogin} />
          }
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
