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
    try {
        const response = await fetch(`${API_URL}/livros`);
        if (!response.ok) {
            throw new Error('Erro ao carregar livros');
        }
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
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

function showLivroForm() {
    document.getElementById('livro-form').style.display = 'block';
    document.getElementById('livro-id').value = '';
}

function cancelarLivro() {
    document.getElementById('livro-form').style.display = 'none';
    document.getElementById('titulo').value = '';
    document.getElementById('autor_id').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('ano_publicacao').value = '';
    document.getElementById('editora').value = '';
    document.getElementById('quantidade_estoque').value = '';
}

async function salvarLivro() {
    const livroId = document.getElementById('livro-id').value;
    const titulo = document.getElementById('titulo').value;
    const autorId = document.getElementById('autor_id').value;
    const genero = document.getElementById('genero').value;
    const anoPublicacao = document.getElementById('ano_publicacao').value;
    const editora = document.getElementById('editora').value;
    const quantidadeEstoque = document.getElementById('quantidade_estoque').value;

    let method, url;
    if (livroId) {
        method = 'PUT';
        url = `${API_URL}/livros/${livroId}`;
    } else {
        method = 'POST';
        url = `${API_URL}/livros`;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, autor_id: autorId, genero, ano_publicacao: anoPublicacao, editora, quantidade_estoque: quantidadeEstoque })
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar livro');
        }

        alert('Livro salvo com sucesso');
        cancelarLivro();
        carregarLivros();
    } catch (error) {
        console.error('Erro ao salvar livro:', error);
    }
}


async function editarLivro(id) {
    try {
        const response = await fetch(`${API_URL}/livros/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar livro com ID ${id}`);
        }
        const livro = await response.json();

        document.getElementById('livro-id').value = livro.id;
        document.getElementById('titulo').value = livro.titulo;
        document.getElementById('autor_id').value = livro.autor_id;
        document.getElementById('genero').value = livro.genero;
        document.getElementById('ano_publicacao').value = livro.ano_publicacao;
        document.getElementById('editora').value = livro.editora;
        document.getElementById('quantidade_estoque').value = livro.quantidade_estoque;

        document.getElementById('livro-form').style.display = 'block';
    } catch (error) {
        console.error('Erro ao editar livro:', error);
        alert(`Erro ao editar livro: ${error.message}`);
    }
}


  
  
  




async function excluirLivro(id) {
    try {
        const response = await fetch(`${API_URL}/livros/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar livro: ${response.statusText}`);
        }

        const result = await response.json();
        alert(result.message);
        carregarLivros(); // Atualiza a lista de livros
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        alert(`Erro ao deletar livro: ${error.message}`);
    }
}


// Função para carregar e exibir autores na tabela
async function carregarAutores() {
    try {
        const response = await fetch(`${API_URL}/autores`);

        if (!response.ok) {
            throw new Error('Erro ao carregar autores');
        }

        const autores = await response.json();

        const autoresList = document.getElementById('autores-list');
        autoresList.innerHTML = '';

        autores.forEach(autor => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${autor.id}</td>
                <td>${autor.nome}</td>
                <td>${autor.biografia}</td>
                <td>
                    <button onclick="editarAutor(${autor.id})">Editar</button>
                    <button onclick="excluirAutor(${autor.id})">Excluir</button>
                </td>
            `;
            autoresList.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar autores:', error);
    }
}



function showAutorForm() {
    document.getElementById('autor-form').style.display = 'block';
    document.getElementById('autor-id').value = '';
}

function cancelarAutor() {
    document.getElementById('autor-form').style.display = 'none';
    document.getElementById('nome-autor').value = '';
}

// Função para buscar e exibir autores
const fetchAutores = async () => {
    try {
        const response = await fetch('http://localhost:3000/autores'); // Endpoint para buscar autores

        if (!response.ok) {
            throw new Error('Erro ao buscar autores');
        }

        const autores = await response.json();

        // Limpar a tabela de autores
        const autoresList = document.getElementById('autores-list');
        autoresList.innerHTML = '';

        // Preencher a tabela com os novos dados
        autores.forEach((autor) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${autor.id}</td>
                <td>${autor.nome}</td>
                <td>${autor.biografia}</td>
                <td>
                    <button onclick="editarAutor(${autor.id})">Editar</button>
                    <button onclick="excluirAutor(${autor.id})">Excluir</button>
                </td>
            `;
            autoresList.appendChild(row);
        });

    } catch (error) {
        console.error('Erro ao buscar autores:', error);
    }
};




async function salvarAutor() {
    const autorId = document.getElementById('autor-id').value;
    const nome = document.getElementById('nome-autor').value;
    const biografia = document.getElementById('biografia-autor').value;

    let method, url;
    if (autorId) {
        method = 'PUT';
        url = `${API_URL}/autores/${autorId}`;
    } else {
        method = 'POST';
        url = `${API_URL}/autores`;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, biografia })
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar autor');
        }

        alert('Autor salvo com sucesso');
        cancelarAutor();
        carregarAutores();
    } catch (error) {
        console.error('Erro ao salvar autor:', error);
    }
}



async function editarAutor(id) {
    try {
        const response = await fetch(`${API_URL}/autores/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar autor com ID ${id}`);
        }
        const autor = await response.json();

        document.getElementById('autor-id').value = autor.id;
        document.getElementById('nome-autor').value = autor.nome;
        document.getElementById('biografia-autor').value = autor.biografia;

        document.getElementById('autor-form').style.display = 'block';
    } catch (error) {
        console.error('Erro ao editar autor:', error);
        alert(`Erro ao editar autor: ${error.message}`);
    }
}





async function excluirAutor(id) {
    const confirmacao = confirm('Deseja realmente excluir este autor?');
    if (confirmacao) {
        try {
            const response = await fetch(`${API_URL}/autores/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir autor');
            }

            alert('Autor excluído com sucesso');
            carregarAutores();
        } catch (error) {
            console.error('Erro ao excluir autor:', error);
        }
    }
}

async function carregarClientes() {
    try {
        const response = await fetch(`${API_URL}/clientes`);
        if (!response.ok) {
            throw new Error('Erro ao carregar clientes');
        }
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
    } catch (error) {
        console.error('Erro ao carregar clientes:', error);
        alert(`Erro ao carregar clientes: ${error.message}`);
    }
}


function showClienteForm() {
    document.getElementById('cliente-form').style.display = 'block';
    document.getElementById('cliente-id').value = '';
}

function cancelarCliente() {
    document.getElementById('cliente-form').style.display = 'none';
    document.getElementById('nome-cliente').value = '';
    document.getElementById('email-cliente').value = '';
    document.getElementById('telefone-cliente').value = '';
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

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, telefone })
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar cliente');
        }

        alert('Cliente salvo com sucesso');
        cancelarCliente();
        carregarClientes();
    } catch (error) {
        console.error('Erro ao salvar cliente:', error);
    }
}



async function editarCliente(id) {
    try {
        const response = await fetch(`${API_URL}/clientes/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar cliente com ID ${id}`);
        }
        const cliente = await response.json();

        document.getElementById('cliente-id').value = cliente.id;
        document.getElementById('nome-cliente').value = cliente.nome;
        document.getElementById('email-cliente').value = cliente.email;
        document.getElementById('telefone-cliente').value = cliente.telefone;

        document.getElementById('cliente-form').style.display = 'block';
    } catch (error) {
        console.error('Erro ao editar cliente:', error);
        alert(`Erro ao editar cliente: ${error.message}`);
    }
}


async function excluirCliente(id) {
    const confirmacao = confirm('Deseja realmente excluir este cliente?');
    if (confirmacao) {
        try {
            const response = await fetch(`${API_URL}/clientes/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir cliente');
            }

            alert('Cliente excluído com sucesso');
            carregarClientes();
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
        }
    }
}

// Carregar dados ao iniciar
window.onload = () => {
    // Inicialmente, nenhuma seção é carregada.
};
