// src/routes/integrantes.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const autenticar = require('../middlewares/authMiddleware');
const upload = require('../config/upload');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Aplica autenticação em todas as rotas abaixo
router.use(autenticar);

// Função auxiliar para tratar a data sem sofrer fuso horário (evita voltar 1 dia)
function converterDataSegura(dataString) {
    if (!dataString) return null;
    // Se a data vier no formato AAAA-MM-DD (padrão do input date)
    if (dataString.includes('-')) {
        const [ano, mes, dia] = dataString.split('T')[0].split('-');
        return new Date(Date.UTC(Number(ano), Number(mes) - 1, Number(dia), 12, 0, 0));
    }
    // Se a data vier no formato DD/MM/AAAA
    if (dataString.includes('/')) {
        const [dia, mes, ano] = dataString.split('/');
        return new Date(Date.UTC(Number(ano), Number(mes) - 1, Number(dia), 12, 0, 0));
    }
    return new Date(dataString);
}

// 1. Listar Integrantes
router.get('/', async (req, res) => {
    try {
        const usuario = req.usuario || {};
        const perfil = usuario.perfil;
        let filtro = {};

        if (perfil === 'LIDER_ADOLESCENTES') {
            filtro.categoria = 'ADOLESCENTES';
        } else if (perfil === 'LIDER_JOVENS') {
            filtro.categoria = 'JOVENS';
        }

        const integrantes = await prisma.integrante.findMany({
            where: filtro,
            orderBy: { nomeCompleto: 'asc' }
        });

        return res.json({
            liderLogado: usuario.nome || 'Líder',
            perfil: perfil || 'GERAL',
            total: integrantes.length,
            integrantes
        });
    } catch (error) {
        console.error('Erro na listagem:', error);
        return res.status(500).json({ erro: 'Erro ao buscar integrantes.' });
    }
});

// 2. Cadastrar Novo Integrante
router.post('/', upload.single('foto'), async (req, res) => {
    try {
        const usuario = req.usuario || {};
        const perfil = usuario.perfil;

        const {
            nomeCompleto,
            dataNascimento,
            nomeLider,
            nomePai,
            nomeMae,
            telefone,
            emailResponsavel,
            endereco,
            eAlergico,
            detalhesAlergia
        } = req.body;

        // Validação simples de campos obrigatórios
        if (!nomeCompleto || !dataNascimento) {
            return res.status(400).json({ erro: 'Nome completo e Data de Nascimento são obrigatórios.' });
        }

        // Trata a categoria com valor fallback
        let categoria = req.body.categoria;
        if (perfil === 'LIDER_ADOLESCENTES') {
            categoria = 'ADOLESCENTES';
        } else if (perfil === 'LIDER_JOVENS') {
            categoria = 'JOVENS';
        } else if (!categoria) {
            categoria = 'GERAL';
        }

        // Conversão segura da data
        const dataNascValida = converterDataSegura(dataNascimento);
        if (isNaN(dataNascValida.getTime())) {
            return res.status(400).json({ erro: 'Data de nascimento inválida.' });
        }

        const fotoUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const novoIntegrante = await prisma.integrante.create({
            data: {
                nomeCompleto,
                dataNascimento: dataNascValida,
                nomeLider: nomeLider || null,
                nomePai: nomePai || null,
                nomeMae: nomeMae || null,
                telefone: telefone || null,
                emailResponsavel: emailResponsavel || null,
                endereco: endereco || null,
                eAlergico: eAlergico === 'true' || eAlergico === true,
                detalhesAlergia: detalhesAlergia || null,
                categoria,
                fotoUrl
            }
        });

        return res.status(201).json({
            mensagem: 'Integrante cadastrado com sucesso!',
            integrante: novoIntegrante
        });
    } catch (error) {
        console.error('🔥 Erro detalhado no POST /api/integrantes:', error);
        return res.status(500).json({ erro: 'Erro ao salvar integrante no banco de dados.' });
    }
});

// 3. Editar Integrante Existente
router.put('/:id', upload.single('foto'), async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nomeCompleto,
            dataNascimento,
            nomeLider,
            nomePai,
            nomeMae,
            telefone,
            emailResponsavel,
            endereco,
            eAlergico,
            detalhesAlergia
        } = req.body;

        const integranteExistente = await prisma.integrante.findUnique({ where: { id: Number(id) } });
        if (!integranteExistente) {
            return res.status(404).json({ erro: 'Integrante não encontrado.' });
        }

        let fotoUrl = integranteExistente.fotoUrl;
        if (req.file) {
            fotoUrl = `/uploads/${req.file.filename}`;
        }

        const dataNascValida = converterDataSegura(dataNascimento);

        const integranteAtualizado = await prisma.integrante.update({
            where: { id: Number(id) },
            data: {
                nomeCompleto,
                dataNascimento: dataNascValida,
                nomeLider: nomeLider || null,
                nomePai: nomePai || null,
                nomeMae: nomeMae || null,
                telefone: telefone || null,
                emailResponsavel: emailResponsavel || null,
                endereco: endereco || null,
                eAlergico: eAlergico === 'true' || eAlergico === true,
                detalhesAlergia: detalhesAlergia || null,
                fotoUrl
            }
        });

        return res.json({
            mensagem: 'Integrante atualizado com sucesso!',
            integrante: integranteAtualizado
        });
    } catch (error) {
        console.error('🔥 Erro ao atualizar integrante:', error);
        return res.status(500).json({ erro: 'Erro ao atualizar integrante.' });
    }
});

// 4. Excluir Integrante
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const integrante = await prisma.integrante.findUnique({ where: { id: Number(id) } });
        if (!integrante) {
            return res.status(404).json({ erro: 'Integrante não encontrado.' });
        }

        await prisma.integrante.delete({ where: { id: Number(id) } });

        return res.json({ mensagem: 'Integrante excluído com sucesso!' });
    } catch (error) {
        console.error('🔥 Erro ao excluir integrante:', error);
        return res.status(500).json({ erro: 'Erro ao excluir integrante.' });
    }
});

module.exports = router;