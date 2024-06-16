const API_URL = 'http://localhost:3000';

// Função para abrir a tabela correspondente ao botão clicado
function abrirTabela(entidade) {
    ocultarFormulario(); // Esconde qualquer formulário aberto

    switch (entidade) {
        case 'livros':
            carregarTabelaLivros();
            break;
        case 'autores':
            carregarTabelaAutores();
            break;
        case 'clientes':
            carregarTabelaClientes();
            break;
        default:
            console.error('Entidade inválida');
    }
}

// Função para carregar a tabela de Livros
async function carregarTabelaLivros() {
    const response = await fetch(`${API_URL}/livros`);
    const livros = await response.json();

    const tabelaHtml = `
        <h2>Livros</h2>
        <button onclick="mostrarFormulario('livros')">Adicionar Livro</button>
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor ID</th>
                    <th>Gênero</th>
                    <th>Ano de Publicação</th>
                    <th>Editora</th>
                    <th>Quantidade em Estoque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabela-corpo">
                ${livros.map(livro => `
                    <tr>
                        <td>${livro.titulo}</td>
                        <td>${livro.autor_id}</td>
                        <td>${livro.genero}</td>
                        <td>${livro.ano_publicacao}</td>
                        <td>${livro.editora}</td>
                        <td>${livro.quantidade_estoque}</td>
                        <td>
                            <button onclick="editar('livros', ${livro.id})">Editar</button>
                            <button onclick="excluir('livros', ${livro.id})">Excluir</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('tabela').innerHTML = tabelaHtml;
}

// Função para carregar a tabela de Autores
async function carregarTabelaAutores() {
    const response = await fetch(`${API_URL}/autores`);
    const autores = await response.json();

    const tabelaHtml = `
        <h2>Autores</h2>
        <button onclick="mostrarFormulario('autores')">Adicionar Autor</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Biografia</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabela-corpo">
                ${autores.map(autor => `
                    <tr>
                        <td>${autor.id}</td>
                        <td>${autor.nome}</td>
                        <td>${autor.biografia}</td>
                        <td>
                            <button onclick="editar('autores', ${autor.id})">Editar</button>
                            <button onclick="excluir('autores', ${autor.id})">Excluir</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('tabela').innerHTML = tabelaHtml;
}

// Função para carregar a tabela de Clientes
async function carregarTabelaClientes() {
    const response = await fetch(`${API_URL}/clientes`);
    const clientes = await response.json();

    const tabelaHtml = `
        <h2>Clientes</h2>
        <button onclick="mostrarFormulario('clientes')">Adicionar Cliente</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabela-corpo">
                ${clientes.map(cliente => `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nome}</td>
                        <td>${cliente.email}</td>
                        <td>
                            <button onclick="editar('clientes', ${cliente.id})">Editar</button>
                            <button onclick="excluir('clientes', ${cliente.id})">Excluir</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById('tabela').innerHTML = tabelaHtml;
}

// Função para exibir o formulário de adição/editação correspondente à entidade
function mostrarFormulario(entidade) {
    ocultarFormulario(); // Esconde qualquer formulário aberto

    let formularioHtml;

    switch (entidade) {
        case 'livros':
            formularioHtml = `
                <h2>Adicionar/Editar Livro</h2>
                <input type="hidden" id="id">
                <input type="text" id="titulo" placeholder="Título">
                <input type="number" id="autor_id" placeholder="ID do Autor">
                <input type="text" id="genero" placeholder="Gênero">
                <input type="number" id="ano_publicacao" placeholder="Ano de Publicação">
                <input type="text" id="editora" placeholder="Editora">
                <input type="number" id="quantidade_estoque" placeholder="Quantidade em Estoque">
                <button onclick="salvar('livros')">Salvar</button>
                <button onclick="ocultarFormulario()">Cancelar</button>
            `;
            break;
        case 'autores':
            formularioHtml = `
                <h2>Adicionar/Editar Autor</h2>
                <input type="hidden" id="id">
                <input type="text" id="nome" placeholder="Nome">
                <textarea id="biografia" placeholder="Biografia"></textarea>
                <button onclick="salvar('autores')">Salvar</button>
                <button onclick="ocultarFormulario()">Cancelar</button>
            `;
            break;
        case 'clientes':
            formularioHtml = `
                <h2>Adicionar/Editar Cliente</h2>
                <input type="hidden" id="id">
                <input type="text" id="nome" placeholder="Nome">
                <input type="email" id="email" placeholder="Email">
                <input type="password" id="senha" placeholder="Senha">
                <button onclick="salvar('clientes')">Salvar</button>
                <button onclick="ocultarFormulario()">Cancelar</button>
            `;
            break;
        default:
            console.error('Entidade inválida');
    }

    document.getElementById('form').innerHTML = formularioHtml;
    document.getElementById('form').style.display = 'block';
}

// Função para esconder o formulário
function ocultarFormulario() {
    document.getElementById('form').style.display = 'none';
}

// Função para salvar/adicionar uma entidade (Livro, Autor, Cliente)
async function salvar(entidade) {
    const id = document.getElementById('id').value;
    const url = id ? `${API_URL}/${entidade}/${id}` : `${API_URL}/${entidade}`;
    const method = id ? 'PUT' : 'POST';

    const dados = obterDadosFormulario(entidade);

    const response = await fetch(url, {
        method: method,
        headers
