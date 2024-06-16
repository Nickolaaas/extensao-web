const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Livraria'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/livros', (req, res) => {
    const { titulo, autor_id, genero, ano_publicacao, editora, quantidade_estoque } = req.body;
    console.log('Recebido para /livros:', req.body); // Log dos dados recebidos

    if (!titulo || !autor_id || !genero || !ano_publicacao || !editora || !quantidade_estoque) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const sql = 'INSERT INTO Livros (titulo, autor_id, genero, ano_publicacao, editora, quantidade_estoque) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [titulo, autor_id, genero, ano_publicacao, editora, quantidade_estoque], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar livro:', err); // Log do erro
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Livro adicionado com sucesso!' });
    });
});

app.post('/autores', (req, res) => {
    const { nome, biografia } = req.body;
    console.log('Recebido para /autores:', req.body); // Log dos dados recebidos

    if (!nome || !biografia) {
        return res.status(400).json({ error: 'Nome e biografia são obrigatórios' });
    }

    const sql = 'INSERT INTO Autores (nome, biografia) VALUES (?, ?)';
    db.query(sql, [nome, biografia], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar autor:', err); // Log do erro
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Autor adicionado com sucesso!' });
    });
});

app.post('/clientes', (req, res) => {
    const { nome, email, senha } = req.body;
    console.log('Recebido para /clientes:', req.body); // Log dos dados recebidos

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    const sql = 'INSERT INTO Clientes (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar cliente:', err); // Log do erro
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Cliente adicionado com sucesso!' });
    });
});

app.get('/livros', (req, res) => {
    const sql = 'SELECT * FROM Livros';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao obter livros:', err); // Log do erro
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

app.get('/autores', (req, res) => {
    const sql = 'SELECT * FROM Autores';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao obter autores:', err); // Log do erro
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM Clientes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao obter clientes:', err); // Log do erro
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
