const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secreta-igreja-geracao-eleita';

// Credenciais fixas direto no código para acesso imediato
const EMAIL_PERMITIDO = 'adolescentes@igreja.com';
const SENHA_PERMITIDA = '304365';

// Rota para processar o Login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Validação direta sem banco de dados
        if (email !== EMAIL_PERMITIDO || senha !== SENHA_PERMITIDA) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
        }

        // Gerar token de acesso (1 dia de duração)
        const token = jwt.sign(
            { id: 1, nome: 'Líder', perfil: 'admin' },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Salvar token no cookie do navegador
        res.cookie('token', token, { httpOnly: true });
        return res.json({ mensagem: 'Login realizado com sucesso!', perfil: 'admin' });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ erro: 'Erro no servidor' });
    }
});

// Rota de Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ mensagem: 'Logout realizado' });
});

module.exports = router;