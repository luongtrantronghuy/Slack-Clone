import React from 'react';
import {fetchSearch} from './Fetcher';
import {makeStyles, TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
    console.log(messages);
    setSearch('');
  };

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
    </>
  );
}

export default Search;
