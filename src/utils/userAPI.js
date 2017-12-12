const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Email already taken!');
  })
  .then(({token}) => token);
}

function login(credentials) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(credentials)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Invalid credentials');
  })
  .then(({token}) => token);
}

export default {
  signup,
  login
}