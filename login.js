document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (you can replace it with your own logic)
    if (username === 'user' && password === 'password123') {
        alert('Login successful!');
        window.location.href = 'dashboard.html';  // Redirect to another page on success
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password!';
    }
});
