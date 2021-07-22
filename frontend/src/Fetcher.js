const fetchAPI = (url, setReturn, setError, defaultReturn) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';

  const fetchInfo = async () => {
    return await fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  };

  fetchInfo().then((response) => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  })
    .then((json) => {
      setError('');
      setReturn(json);
      return json;
    })
    .catch((error) => {
      console.log(error);
      setReturn(defaultReturn);
      setError(`${error.status} - ${error.statusText}`);
    });
};

// credit:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
exports.fetchSearch = async (setMessages, setError, content) => {
  const encoded = encodeURIComponent(content).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
  const url = '/v0/message?content=' + encoded;
  await fetchAPI(url, setMessages, setError, []);
};

exports.fetchThread = async (setMessages, setError, channel, thread) => {
  const url ='/v0/channels/' + channel + '?thread=' + thread;
  await fetchAPI(url, setMessages, setError, []);
};

exports.fetchMessages = async (setMessages, setError, channel) => {
  const url = '/v0/channels/'.concat(channel);
  await fetchAPI(url, setMessages, setError, []);
};

exports.fetchDMThread = async (setMessages, setError, username, thread) => {
  const url = '/v0/dm/' + username + '?thread=' + thread;
  await fetchAPI(url, setMessages, setError, []);
};

exports.fetchDMs = async (setMessages, setError, username) => {
  const url = '/v0/dm/'.concat(username);
  await fetchAPI(url, setMessages, setError, []);
};

exports.fetchWorkspaces = async (name, setChannels) => {
  const setError = () => {};

  await fetchAPI(
    '/v0/workspaces?code='.concat(name),
    setChannels,
    setError,
    [{channels: null}],
  );
};

exports.fetchUserInfo = async (setUserInfo, setError, username) => {
  if (!username) {
    setUserInfo([{name: '', access: {}}]);
  }
  const url = '/v0/user?username='.concat(username);
  await fetchAPI(url, setUserInfo, setError, [{name: '', access: {}}]);
};
