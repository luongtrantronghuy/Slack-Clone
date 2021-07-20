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
