/**
 * Grab userinfo object from a fetch to api
 * @param {function} setUserInfo
 * @param {function} setError
 * @param {string} username
 */
exports.fetchUserInfo = function(setUserInfo, setError, username) {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  const url = '/v0/user?username='.concat(username);
  fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
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
