const registerForm = document.getElementById('registerForm');

if(registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    localStorage.setItem('tf_user', JSON.stringify({
      username,
      password
    }));

    alert('Registration successful!');
    window.location.href = 'login.html';
  });
}

const loginForm = document.getElementById('loginForm');

if(loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = JSON.parse(localStorage.getItem('tf_user'));

    if(user && user.username === username && user.password === password) {
      localStorage.setItem('tf_logged_in', 'true');

      alert('Login successful!');
      window.location.href = 'tech.html';
    } else {
      alert('Invalid credentials');
    }
  });
}