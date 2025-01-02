// For educational purposes only
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (!username || !password) {
        alert('Please fill in all fields');
        return false;
    }

    // In a real application, this would be a secure API call
    // This is just for demonstration purposes
    localStorage.setItem('user', JSON.stringify({
        username: username,
        isLoggedIn: true
    }));

    // Redirect to main page
    window.location.href = 'index.html';
    return false;
}

function handleSignup(event) {
    event.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Simple validation
    if (!fullname || !email || !username || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
    }

    // In a real application, this would be a secure API call
    // This is just for demonstration purposes
    localStorage.setItem('user', JSON.stringify({
        fullname: fullname,
        email: email,
        username: username,
        isLoggedIn: true
    }));

    // Redirect to main page
    window.location.href = 'index.html';
    return false;
}

// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.isLoggedIn && !window.location.href.includes('login.html') && !window.location.href.includes('signup.html')) {
        window.location.href = 'login.html';
    }
}

// Run auth check when page loads
window.addEventListener('load', checkAuth);
