const loginFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username').value.trim();
  const passwordEl = document.querySelector('#password').value.trim();

  const response = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: usernameEl,
      password: passwordEl,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
