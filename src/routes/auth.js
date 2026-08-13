// src/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secreta-igreja-geracao-eleita';

// Rota para processar o Login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await prisma.usuario.findUnique({ where: { email } });

        if (!usuario) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
        }

        // Gerar token com o ID, Nome e Perfil do Líder
        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, perfil: usuario.perfil },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Salva o token em um Cookie seguro no navegador
        res.cookie('token', token, { httpOnly: true });
        return res.json({ mensagem: 'Login realizado com sucesso!', perfil: usuario.perfil });

    } catch (error) {
        return res.status(500).json({ erro: 'Erro no servidor' });
    }
});

// Rota de Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ mensagem: 'Logout realizado' });
});

module.exports = router;