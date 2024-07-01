var axiosConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

function logout() {
    localStorage.removeItem('token');
    window.location.href = './index.html';
}

function logout2() {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
}

function auth() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    postAuth(email, password, axiosConfig);
}

function createUser() {
    var name = document.getElementById('name').value;
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    postUser(name, login, password, axiosConfig);
}