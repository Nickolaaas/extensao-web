const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Livraria'
});

// Conexão com o banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Middleware para processar corpos de requisição JSON
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rotas para livros
// Adicionar livro
app.post('/livros', (req, res) => {
    const { titulo, autor_id, genero, ano_publicacao, editora, quantidade_estoque } = req.body;

    // Validação de dados
    if (!titulo || !autor_id || !genero || !ano_publicacao || !editora || !quantidade_estoque) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const sql = 'INSERT INTO Livros (titulo, autor_id, genero, ano_publicacao, editora, quantidade_estoque) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [titulo, autor_id, genero, ano_publicacao, editora, quantidade_estoque], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar livro:', err);
            return res.status(500).json({ error: 'Erro ao adicionar livro no banco de dados' });
        }
        res.status(200).json({ message: 'Livro adicionado com sucesso!' });
    });
});

// Obter todos os livros
app.get('/livros', (req, res) => {
    const sql = 'SELECT * FROM Livros';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao obter livros:', err);
            return res.status(500).json({ error: 'Erro ao obter livros do banco de dados' });
        }
        res.status(200).json(results);
    });
});

// Obter um livro por ID
app.get('/livros/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM Livros WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar livro:', err);
            return res.status(500).json({ error: 'Erro ao buscar livro no banco de dados' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(200).json(results[0]);
    });
});

// Atualizar um livro por ID
app.put('/livros/:id', (req, res) => {
    const livroId = req.params.id;
    const { titulo, autor_id, genero, ano_publicacao, editora, quantidade_estoque } = req.body;

    // Validação de dados
    if (!titulo || !autor_id || !genero || !ano_publicacao || !editora || !quantidade_estoque) {
        return res.status(400).json({ error: 'Todos os campos devem ser preenchidos' });
    }

    const sql = 'UPDATE Livros SET titulo = ?, autor_id = ?, genero = ?, ano_publicacao = ?, editora = ?, quantidade_estoque = ? WHERE id = ?';
    db.query(sql, [titulo, autor_id, genero, ano_publicacao, editora, quantidade_estoque, livroId], (err, result) => {
        if (err) {
            console.error('Erro ao editar livro:', err);
            return res.status(500).json({ error: 'Erro ao editar livro no banco de dados' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(200).json({ message: 'Livro atualizado com sucesso' });
    });
});

// Excluir um livro por ID
app.delete('/livros/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM Livros WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar livro:', err);
            return res.status(500).json({ error: 'Erro ao deletar livro no banco de dados' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(200).json({ message: 'Livro deletado com sucesso' });
    });
});

// Rotas para autores
// Adicionar autor
app.post('/autores', (req, res) => {
    const { nome, biografia } = req.body;

    // Validação de dados
    if (!nome || !biografia) {
        return res.status(400).json({ error: 'Nome e biografia são obrigatórios' });
    }

    const sql = 'INSERT INTO Autores (nome, biografia) VALUES (?, ?)';
    db.query(sql, [nome, biografia], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar autor:', err);
            return res.status(500).json({ error: 'Erro ao adicionar autor no banco de dados' });
        }
        res.status(200).json({ message: 'Autor adicionado com sucesso!' });
    });
});

// Obter todos os autores
app.get('/autores', (req, res) => {
    const sql = 'SELECT * FROM Autores';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao obter autores:', err);
            return res.status(500).json({ error: 'Erro ao obter autores do banco de dados' });
        }
        res.status(200).json(results);
    });
});

// Obter um autor por ID
app.get('/autores/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM Autores WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar autor:', err);
            return res.status(500).json({ error: 'Erro ao buscar autor no banco de dados' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }
        res.status(200).json(results[0]);
    });
});

// Atualizar um autor por ID
app.put('/autores/:id', (req, res) => {
    const autorId = req.params.id;
    const { nome, biografia } = req.body;

    // Validação de dados
    if (!nome || !biografia) {
        return res.status(400).json({ error: 'Nome e biografia são obrigatórios' });
    }

    const sql = 'UPDATE Autores SET nome = ?, biografia = ? WHERE id = ?';
    db.query(sql, [nome, biografia, autorId], (err, result) => {
        if (err) {
            console.error('Erro ao editar autor:', err);
            return res.status(500).json({ error: 'Erro ao editar autor no banco de dados' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }
        res.status(200).json({ message: 'Autor atualizado com sucesso' });
    });
});

// Excluir um autor por ID
app.delete('/autores/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM Autores WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar autor:', err);
            return res.status(500).json({ error: 'Erro ao deletar autor no banco de dados' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Autor não encontrado' });
        }
        res.status(200).json({ message: 'Autor deletado com sucesso' });
    });
});
// Rotas para clientes

// Adicionar cliente
app.post('/clientes', (req, res) => {
    const { nome, email, telefone } = req.body;

    // Validação de dados
    if (!nome || !email || !telefone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const sql = 'INSERT INTO Clientes (nome, email, telefone) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, telefone], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar cliente:', err);
            return res.status(500).json({ error: 'Erro ao adicionar cliente no banco de dados' });
        }
        res.status(200).json({ message: 'Cliente adicionado com sucesso!' });
    });
});

// Obter todos os clientes
app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM Clientes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao obter clientes:', err);
            return res.status(500).json({ error: 'Erro ao obter clientes do banco de dados' });
        }
        res.status(200).json(results);
    });
});

// Obter um cliente por ID
app.get('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM Clientes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar cliente:', err);
            return res.status(500).json({ error: 'Erro ao buscar cliente no banco de dados' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json(results[0]);
    });
});

// Atualizar um cliente por ID
app.put('/clientes/:id', (req, res) => {
    const clienteId = req.params.id;
    const { nome, email, telefone } = req.body;

    // Validação de dados
    if (!nome || !email || !telefone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const sql = 'UPDATE Clientes SET nome = ?, email = ?, telefone = ? WHERE id = ?';
    db.query(sql, [nome, email, telefone, clienteId], (err, result) => {
        if (err) {
            console.error('Erro ao editar cliente:', err);
            return res.status(500).json({ error: 'Erro ao editar cliente no banco de dados' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json({ message: 'Cliente atualizado com sucesso' });
    });
});

// Excluir um cliente por ID
app.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM Clientes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar cliente:', err);
            return res.status(500).json({ error: 'Erro ao deletar cliente no banco de dados' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    });
});

