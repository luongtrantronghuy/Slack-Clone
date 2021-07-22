/**
 * Encode special chars in URL:
 * https://www.w3schools.com/tags/ref_urlencode.asp
 */
import React from 'react';
import {fetchSearch} from './Fetcher';

/**
 * Component for list of all messages @ our user
 * @param {object} props
 * @return {object} JSX
 */
function Mentions(props) {
  const [messages, setMessages] = React.useState([]);
  const [error, setError] = React.useState();

  console.log(messages);

  React.useEffect(() => {
    fetchSearch(setMessages, setError, localStorage.getItem('username'))
      // .then(console.log(messages))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, [setMessages]);

  return (
    <div>{error}</div>
  );
}

export default Mentions;
