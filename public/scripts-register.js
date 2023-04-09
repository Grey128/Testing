document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
  
    if (password !== password2) {
      alert('Passwords do not match. Please try again.');
      return;
    }
  
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'users/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      alert('Registration successful.');
      window.location.href = '/login.html';
    } else {
      alert('Error registering. Please try again.');
    }
  });
  