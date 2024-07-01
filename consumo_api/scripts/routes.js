var axiosConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

function putGame(id, game) {
    axios.put("http://localhost:8080/game/" + id, game, axiosConfig)
        .then(response => {
            event.preventDefault();
            if (response.status == 200) {
                alert('Jogo editado com sucesso!');
                window.location.href = '../index.html';
            }
        })
        .catch(error => {
            console.log("teste");
            console.log(error);
        });
}

function deleteGameRout(listItem, axiosConfig) {
    axios.delete(`http://localhost:8080/game/${listItem.getAttribute('data-id')}`, axiosConfig).then(response => {
        if (response.status == 204) {
            alert('Jogo excluído com sucesso!');
            listItem.remove();
        }
    }).catch(error => {
        console.log(error);
    });
}

function postAuth(email, password, axiosConfig) {
    axios.post('http://localhost:8080/auth', {
        login: email,
        password: password
    }).then(response => {
        if (response.status == 200) {
            var token = response.data.token;
            localStorage.setItem('token', token);
            axiosConfig = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };
            alert('Usuário autenticado com sucesso!');
            window.location.href = '../index.html';
        }
    }).catch(error => {
        console.log(error);
    });
}

function getGames() {
    axios.get('http://localhost:8080/games')
        .then(response => {
            var token = localStorage.getItem('token');
            var list = document.getElementById('gamesTable');
            response.data.forEach(game => {
                var item = document.createElement('tr');
                item.setAttribute('data-id', game.id);
                item.setAttribute('data-title', game.title);
                item.setAttribute('data-price', game.price);
                item.setAttribute('data-year', game.year);
                item.innerHTML = `
                        <th>${game.id}</th>
                        <td>${game.title}</td>
                        <td>${game.price}</td>
                        <td>${game.year}</td>
                    `;

                if (token) {
                    var td = document.createElement('td');
                    deleteButton = document.createElement('button');
                    deleteButton.classList.add('btn', 'btn-danger', "d-inline-block");
                    deleteButton.innerText = 'Excluir';
                    deleteButton.addEventListener("click", () => {
                        deleteGame(item);
                    });
                    td.appendChild(deleteButton);
                }

                if (token) {
                    var editTd = document.createElement('td');
                    editButton = document.createElement('a');
                    editButton.classList.add('btn', 'btn-warning', "d-inline-block", "ml-5");
                    editButton.innerText = 'Editar';
                    editButton.href = `./games/editGame.html?id=${game.id}`;
                    td.appendChild(editButton);
                    td.classList.add('d-inline-block', "d-flex", "justify-content-center");
                    item.appendChild(td);
                }

                list.appendChild(item);
            });
        })
        .catch(error => {
            console.log(error);
        });
}

function getGamesId() {
    const id = new URLSearchParams(window.location.search).get('id');

    axios.get(`http://localhost:8080/games/${id}`).then(response => {
        let title = document.getElementById('title').value = response.data.title;
        let year = document.getElementById('year').value = response.data.year;
        let price = document.getElementById('price').value = response.data.price;

        var idField = document.getElementById('id');
        var titleField = document.getElementById('title');
        var yearField = document.getElementById('year');
        var priceField = document.getElementById('price');

        idField.value = response.data.id;
        titleField.value = response.data.title;
        yearField.value = response.data.year;
        priceField.value = response.data.price;
    }).catch(error => {
        console.log(error);
    });
}

function postUser(name, login, password, axiosConfig) {
    console.log(name,login,password);
    axios.post('http://localhost:8080/user', {
        name,
        login,
        password
    },axiosConfig).then(response => {
        if (response.status == 201) {
            alert('Usuário criado com sucesso!');
            window.location.href = '../index.html';
        }
    }).catch(error => {
        console.log(error);
    });
}

function postGame(game,axiosConfig){
    axios.post('http://localhost:8080/game',game,axiosConfig)
        .then(response => {
            if (response.status == 201) {
                alert('Jogo criado com sucesso!');
                window.location.href = '../index.html';
            }
        })
        .catch(error => {
            console.log(error);
        });
}