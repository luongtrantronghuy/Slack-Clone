/**
 * Encode special chars in URL:
 * https://www.w3schools.com/tags/ref_urlencode.asp
 */
import React from 'react';
import Home from './ViewHome';
import {fetchSearch} from './Fetcher';
import {makeStyles, TableBody, TableRow} from '@material-ui/core';
import {ListItem, Divider, List} from '@material-ui/core';
import withWidth, {isWidthUp} from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
  notfound: {
    color: 'darkgrey',
  },
  time: {
    color: 'grey',
  },
  from: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  root: {
    height: 'auto',
    maxWidth: '100hv',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: '5%',
    paddingRight: '5%',
    overflowY: 'scroll',
    marginLeft: '0%',
    marginRight: '0%',
    width: '90%',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      fontSize: 17,
      margin: '0 150px',
      paddingLeft: '120px',
    },
  },
  inputField: {
    width: '100%',
    maxWidth: '1000px',
  },
  messageWrapper: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: '100%',
    margin: '0 auto',
    marginTop: '10px',
    width: '90%',
    maxWidth: '1000px',
    height: 'auto',
  },
}));

/**
 *
 * @param {*} props
 * @return {object}
 */
function ListResult(props) {
  const classes = useStyles();
  return (
    <>
      {props.messages.map((message, idx) => {
        if (message) {
          let thread = <></>;
          if (message.thread.length > 0) {
            thread =
            <>
              <ListItem key={idx}>Thread:</ListItem>
              <List>
                {message.thread.map((thread, idx) => {
                  return (
                    <ListItem key={idx}>{thread.content}</ListItem>
                  );
                })}
              </List>
            </>;
          }
          return (
            <List>
              <div key={idx}
                className={message.found ? classes.found : classes.notfound}>
                <span>{message.content}</span>
                <span
                  className={classes.time}
                > at {message.sent ? message.sent : message.sent_at}</span>
              </div>
              <div>{thread}</div>
            </List>
          );
        }
        return (
          <></>
        );
      })}
    </>
  );
}

/**
 * Component for list of all messages @ our user
 * @param {object} props
 * @return {object} JSX
 */
function Mentions(props) {
  const [messages, setMessages] = React.useState([]);
  const [error, setError] = React.useState();
  const classes = useStyles();

  // console.log(messages);

  React.useEffect(() => {
    fetchSearch(setMessages, setError, '@' + localStorage.getItem('username'))
      // .then(console.log(messages))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, [setMessages]);

  return (
    <>
      <div>{error}</div>
      {isWidthUp('sm', props.width) && <Home />}
      <List className={classes.root}>
        <TableBody>
          {messages.map((message, idx) => {
            return (
              <>
                <TableRow
                  key={idx}
                  className={classes.from}
                >
                  In: {message.in}
                </TableRow>
                <Divider/>
                <ListResult
                  messages={message.messages}
                />
              </>
            );
          })}
        </TableBody>
      </List>
    </>
  );
}

export default withWidth()(Mentions);
