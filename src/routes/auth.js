const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secreta-igreja-geracao-eleita';

// Rota para processar o Login sem Banco de Dados
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    // Pega as credenciais configuradas nas variáveis de ambiente (.env ou Render)
    const adminEmail = process.env.ADMIN_EMAIL || 'adolescentes@igreja.com';
    const adminPassword = process.env.ADMIN_PASSWORD || '304365';

    try {
        // Valida se o e-mail e a senha conferem
        if (email !== adminEmail || senha !== adminPassword) {
            return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
        }

        // Gerar token de acesso
        const token = jwt.sign(
            { id: 1, nome: 'Líder', perfil: 'admin' },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Salva o token em um Cookie
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