const API_URL = 'http://localhost:3000';

// Funções para mostrar/esconder formulários
function showLivroForm() {
    document.getElementById('livro-form').style.display = 'block';
}

function showAutorForm() {
    document.getElementById('autor-form').style.display = 'block';
}

function showClienteForm() {
    document.getElementById('cliente-form').style.display = 'block';
}

// Funções CRUD
async function addLivro() {
    const titulo = document.getElementById('titulo').value;
    const autor_id = document.getElementById('autor_id').value;
    const genero = document.getElementById('genero').value;
    const ano_publicacao = document.getElementById('ano_publicacao').value;
    const editora = document.getElementById('editora').value;
    const quantidade_estoque = document.getElementById('quantidade_estoque').value;

    const response = await fetch(`${API_URL}/livros`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor_id, genero, ano_publicacao, editora, quantidade_estoque })
    });
    
    if (response.ok) {
        alert('Livro adicionado com sucesso');
        location.reload();
    } else {
        alert('Erro ao adicionar livro');
    }
}

async function addAutor() {
    const nome = document.getElementById('nome_autor').value;
    const biografia = document.getElementById('biografia').value;

    const response = await fetch(`${API_URL}/autores`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, biografia })
    });

    if (response.ok) {
        alert('Autor adicionado com sucesso');
        location.reload();
    } else {
        alert('Erro ao adicionar autor');
    }
}

async function addCliente() {
    const nome = document.getElementById('nome_cliente').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
    });

    if (response.ok) {
        alert('Cliente adicionado com sucesso');
        location.reload();
    } else {
        alert('Erro ao adicionar cliente');
    }
}

// Funções para carregar dados
async function loadLivros() {
    const response = await fetch(`${API_URL}/livros`);
    const livros = await response.json();
    const livrosList = document.getElementById('livros-list');
    livrosList.innerHTML = '';
    livros.forEach(livro => {
        const div = document.createElement('div');
        div.textContent = `${livro.titulo} (${livro.ano_publicacao})`;
        livrosList.appendChild(div);
    });
}

async function loadAutores() {
    const response = await fetch(`${API_URL}/autores`);
    const autores = await response.json();
    const autoresList = document.getElementById('autores-list');
    autoresList.innerHTML = '';
    autores.forEach(autor => {
        const div = document.createElement('div');
        div.textContent = autor.nome;
        autoresList.appendChild(div);
    });
}

async function loadClientes() {
    const response = await fetch(`${API_URL}/clientes`);
    const clientes = await response.json();
    const clientesList = document.getElementById('clientes-list');
    clientesList.innerHTML = '';
    clientes.forEach(cliente => {
        const div = document.createElement('div');
        div.textContent = cliente.nome;
        clientesList.appendChild(div);
    });
}

// Carregar dados ao iniciar
window.onload = () => {
    loadLivros();
    loadAutores();
    loadClientes();
};
