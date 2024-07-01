var axiosConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

function createGame() {
    event.preventDefault();
    var titleInput = document.getElementById('title');
    var yearInput = document.getElementById('year');
    var priceInput = document.getElementById('price');

    var game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value
    };

    postGame(game, axiosConfig);
}

function updateGame() {
    event.preventDefault();
    var idInput = document.getElementById('id');
    var titleInput = document.getElementById('title');
    var yearInput = document.getElementById('year');
    var priceInput = document.getElementById('price');

    var game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value
    };

    var id = idInput.value.toString();

    putGame(id, game);
}

function deleteGame(listItem) {
    var axiosConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    };
    if (confirm('Deseja realmente excluir este jogo?')) {
        deleteGameRout(listItem, axiosConfig);
    }
}

function startPage() {
    var token = localStorage.getItem('token');
    if (!token) {
        var link = document.createElement('div');
        link.innerHTML = `
                <a class="nav-link col-sm navbar-brand" href="./users/login.html">Login <span class="sr-only">(current)</span></a>
        <a class="nav-link col-lg navbar-brand" href="./users/createUser.html">Registrar-se <span class="sr-only">(current)</span></a>
            `;
        link.classList.add('row');

        var navBar = document.getElementById('navBar');
        navBar.appendChild(link);

    } else {
        var link = document.createElement('div');
        link.innerHTML = `
                <button onclick="logout()" type="button" class="btn btn-outline-danger">Logout</button>
            `;
        link.addEventListener('click', () => {
            localStorage.removeItem('token');
        });
        var navBar = document.getElementById('navBar');
        navBar.appendChild(link);

        var container = document.getElementById('container');
        var btnCreate = document.createElement('a');
        btnCreate.innerHTML = '<a href="./games/createGame.html" class="align-self-center mr-auto btn btn-success mx-auto">Cadastrar novo </a>';
        container.appendChild(btnCreate);

        var thd = document.getElementById('table-head-row');
        var th = document.createElement('th');
        th.innerHTML = '<th scope="col">Opções</th>';
        thd.appendChild(th);
    }
}