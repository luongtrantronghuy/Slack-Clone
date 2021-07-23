import React from 'react';
import {fetchSearch} from './Fetcher';
import {makeStyles, TableBody, TableRow, TextField} from '@material-ui/core';
import {ListItem, Divider, List} from '@material-ui/core';

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
    marginLeft: '5%',
    // marginRight: '10%',
    width: '90%',
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
      {props.messages.map((message) => {
        if (message) {
          let thread = <></>;
          if (message.thread.length > 0) {
            thread =
            <>
              <ListItem>Thread:</ListItem>
              <List>
                {message.thread.map((thread) => {
                  return (
                    <ListItem>{thread.content}</ListItem>
                  );
                })}
              </List>
            </>;
          }
          return (
            <List>
              <div className={message.found ? classes.found : classes.notfound}>
                <span>{message.content}</span>
                <span
                  className={classes.time}
                > at: {message.sent ? message.sent : message.sent_at}</span>
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
function Search(props) {
  const classes = useStyles();
  const [search, setSearch] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [error, setError] = React.useState();

  const changeHandler = (event) => {
    setSearch(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await fetchSearch(setMessages, setError, search);
    // console.log(messages);
    setSearch('');
  };

  // console.log(messages);

  return (
    <>
      <div className={classes.messageWrapper}>
        <form noValidate autoComplete="off" onSubmit={submitHandler}>
          <TextField
            value={search}
            color='primary'
            id='compose-msg'
            variant='outlined'
            placeholder='search'
            onChange={changeHandler}
            className={classes.inputField}
          />
        </form>
      </div>
      <div>{error}</div>
      <List className={classes.root}>
        <TableBody>
          {messages.map((message) => {
            return (
              <>
                <TableRow className={classes.from}>
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

export default Search;
