const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Caminho do arquivo onde os cadastros serão salvos localmente
const FILE_PATH = path.join(__dirname, '../../integrantes.json');

// Função para ler os integrantes do arquivo JSON
function lerIntegrantes() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
        return [];
    }
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data || '[]');
}

// Função para salvar no arquivo JSON
function salvarIntegrantes(dados) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(dados, null, 2));
}

// ROTA: Listar todos os integrantes
router.get('/', (req, res) => {
    try {
        const lista = lerIntegrantes();
        return res.json(lista);
    } catch (error) {
        console.error('Erro ao buscar integrantes:', error);
        return res.status(500).json({ erro: 'Erro ao buscar dados.' });
    }
});

// ROTA: Criar novo cadastro
router.post('/', (req, res) => {
    try {
        const lista = lerIntegrantes();

        // Cria um novo objeto com id e data de criação
        const novoIntegrante = {
            id: Date.now(),
            ...req.body,
            criadoEm: new Date().toISOString()
        };

        lista.push(novoIntegrante);
        salvarIntegrantes(lista);

        return res.status(201).json({ mensagem: 'Cadastrado com sucesso!', integrante: novoIntegrante });
    } catch (error) {
        console.error('Erro ao salvar integrante:', error);
        return res.status(500).json({ erro: 'Erro ao salvar o cadastro.' });
    }
});

module.exports = router;