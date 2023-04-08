document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const response = await fetch('/login', {
    method: 'POST',
    body: formData,
    redirect: 'manual',
  });

  if (response.status === 302) {
    location.href = '/upload.html';
  } else {
    alert('Login failed. Please check your username and password.');
  }
});

