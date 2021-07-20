/**
 * Grab userinfo object from a fetch to api
 * @param {function} setUserInfo
 * @param {function} setError
 * @param {string} username
 */
exports.fetchUserInfo = (setUserInfo, setError, username) => {
  const item = localStorage.getItem('user');
  // console.log(item);
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  const url = '/v0/user?username='.concat(username);

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
      setUserInfo(json);
    })
    .catch((error) => {
      console.log(error);
      setUserInfo({});
      setError(`${error.status} - ${error.statusText}`);
    });
};
