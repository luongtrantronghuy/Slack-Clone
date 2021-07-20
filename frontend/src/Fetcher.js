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
    })
    .catch((error) => {
      console.log(error);
      setReturn(defaultReturn);
      setError(`${error.status} - ${error.statusText}`);
    });
};

exports.fetchUserInfo = (setUserInfo, setError, username) => {
  const url = '/v0/user?username='.concat(username);
  fetchAPI(url, setUserInfo, setError, [{name: '', access: {}}]);
};
