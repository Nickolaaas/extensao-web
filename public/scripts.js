const API_URL = 'http://localhost:3000';

// Função para mostrar a seção correspondente
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    // Carregar dados quando a seção for exibida
    if (sectionId === 'livros-section') {
        carregarLivros();
    } else if (sectionId === 'autores-section') {
        carregarAutores();
    } else if (sectionId === 'clientes-section') {
        carregarClientes();
    }
}

// Funções para Livros
async function carregarLivros() {
    const response = await fetch(`${API_URL}/livros`);
    const livros = await response.json();

    const livrosList = document.getElementById('livros-list');
    livrosList.innerHTML = '';

    livros.forEach(livro => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${livro.titulo}</td>
            <td>${livro.autor_id}</td>
            <td>${livro.genero}</td>
            <td>${livro.ano_publicacao}</td>
            <td>${livro.editora}</td>
            <td>${livro.quantidade_estoque}</td>
            <td>
                <button onclick="editarLivro(${livro.id})">Editar</button>
                <button onclick="excluirLivro(${livro.id})">Excluir</button>
            </td>
        `;

        livrosList.appendChild(tr);
    });
}

function showLivroForm() {
    document.getElementById('livro-form').style.display = 'block';
    document.getElementById('livro-id').value = '';
}

function cancelarLivro() {
    document.getElementById('livro-form').style.display = 'none';
}

async function salvarLivro() {
    const livroId = document.getElementById('livro-id').value;
    const titulo = document.getElementById('titulo').value;
    const autor_id = document.getElementById('autor_id').value;
    const genero = document.getElementById('genero').value;
    const ano_publicacao = document.getElementById('ano_publicacao').value;
    const editora = document.getElementById('editora').value;
    const quantidade_estoque = document.getElementById('quantidade_estoque').value;

    let method, url;
    if (livroId) {
        method = 'PUT';
        url = `${API_URL}/livros/${livroId}`;
    } else {
        method = 'POST';
        url = `${API_URL}/livros`;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, autor_id, genero, ano_publicacao, editora, quantidade_estoque })
    });

    if (response.ok) {
        alert('Livro salvo com sucesso');
        cancelarLivro();
        carregarLivros();
    } else {
        alert('Erro ao salvar livro');
    }
}

async function editarLivro(id) {
    const response = await fetch(`${API_URL}/livros/${id}`);
    const livro = await response.json();

    document.getElementById('livro-id').value = livro.id;
    document.getElementById('titulo').value = livro.titulo;
    document.getElementById('autor_id').value = livro.autor_id;
    document.getElementById('genero').value = livro.genero;
    document.getElementById('ano_publicacao').value = livro.ano_publicacao;
    document.getElementById('editora').value = livro.editora;
    document.getElementById('quantidade_estoque').value = livro.quantidade_estoque;

    showLivroForm();
}

async function excluirLivro(id) {
    const confirmacao = confirm('Deseja realmente excluir este livro?');
    if (confirmacao) {
        const response = await fetch(`${API_URL}/livros/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Livro excluído com sucesso');
            carregarLivros();
        } else {
            alert('Erro ao excluir livro');
        }
    }
}

// Funções para Autores
async function carregarAutores() {
    const response = await fetch(`${API_URL}/autores`);
    const autores = await response.json();

    const autoresList = document.getElementById('autores-list');
    autoresList.innerHTML = '';

    autores.forEach(autor => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${autor.nome}</td>
            <td>
                <button onclick="editarAutor(${autor.id})">Editar</button>
                <button onclick="excluirAutor(${autor.id})">Excluir</button>
            </td>
        `;

        autoresList.appendChild(tr);
    });
}

function showAutorForm() {
    document.getElementById('autor-form').style.display = 'block';
    document.getElementById('autor-id').value = '';
}

function cancelarAutor() {
    document.getElementById('autor-form').style.display = 'none';
}

async function salvarAutor() {
    const autorId = document.getElementById('autor-id').value;
    const nome = document.getElementById('nome-autor').value;

    let method, url;
    if (autorId) {
        method = 'PUT';
        url = `${API_URL}/autores/${autorId}`;
    } else {
        method = 'POST';
        url = `${API_URL}/autores`;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome })
    });

    if (response.ok) {
        alert('Autor salvo com sucesso');
        cancelarAutor();
        carregarAutores();
    } else {
        alert('Erro ao salvar autor');
    }
}

async function editarAutor(id) {
    const response = await fetch(`${API_URL}/autores/${id}`);
    const autor = await response.json();

    document.getElementById('autor-id').value = autor.id;
    document.getElementById('nome-autor').value = autor.nome;

    showAutorForm();
}

async function excluirAutor(id) {
    const confirmacao = confirm('Deseja realmente excluir este autor?');
    if (confirmacao) {
        const response = await fetch(`${API_URL}/autores/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Autor excluído com sucesso');
            carregarAutores();
        } else {
            alert('Erro ao excluir autor');
        }
    }
}

// Funções para Clientes
async function carregarClientes() {
    const response = await fetch(`${API_URL}/clientes`);
    const clientes = await response.json();

    const clientesList = document.getElementById('clientes-list');
    clientesList.innerHTML = '';

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>
                <button onclick="editarCliente(${cliente.id})">Editar</button>
                <button onclick="excluirCliente(${cliente.id})">Excluir</button>
            </td>
        `;

        clientesList.appendChild(tr);
    });
}

function showClienteForm() {
    document.getElementById('cliente-form').style.display = 'block';
    document.getElementById('cliente-id').value = '';
}

function cancelarCliente() {
    document.getElementById('cliente-form').style.display = 'none';
}

async function salvarCliente() {
    const clienteId = document.getElementById('cliente-id').value;
    const nome = document.getElementById('nome-cliente').value;
    const email = document.getElementById('email-cliente').value;
    const telefone = document.getElementById('telefone-cliente').value;

    let method, url;
    if (clienteId) {
        method = 'PUT';
        url = `${API_URL}/clientes/${clienteId}`;
    } else {
        method = 'POST';
        url = `${API_URL}/clientes`;
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, telefone })
    });

    if (response.ok) {
        alert('Cliente salvo com sucesso');
        cancelarCliente();
        carregarClientes();
    } else {
        alert('Erro ao salvar cliente');
    }
}

async function editarCliente(id) {
    const response = await fetch(`${API_URL}/clientes/${id}`);
    const cliente = await response.json();

    document.getElementById('cliente-id').value = cliente.id;
    document.getElementById('nome-cliente').value = cliente.nome;
    document.getElementById('email-cliente').value = cliente.email;
    document.getElementById('telefone-cliente').value = cliente.telefone;

    showClienteForm();
}

async function excluirCliente(id) {
    const confirmacao = confirm('Deseja realmente excluir este cliente?');
    if (confirmacao) {
        const response = await fetch(`${API_URL}/clientes/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Cliente excluído com sucesso');
            carregarClientes();
        } else {
            alert('Erro ao excluir cliente');
        }
    }
}

// Carregar dados ao iniciar
window.onload = () => {
    // Inicialmente, nenhuma seção é carregada.
};
