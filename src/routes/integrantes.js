const express = require('express');
const router = express.Router();

// Array em memória para simular o banco de dados
let integrantes = [];

// Listar todos os integrantes
router.get('/', (req, res) => {
    try {
        return res.json(integrantes);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao listar integrantes' });
    }
});

// Cadastrar novo integrante
router.post('/', (req, res) => {
    try {
        const novoIntegrante = { id: Date.now(), ...req.body };
        integrantes.push(novoIntegrante);
        return res.status(201).json(novoIntegrante);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro ao salvar integrante' });
    }
});

module.exports = router;