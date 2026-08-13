// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./src/routes/auth');
const integrantesRoutes = require('./src/routes/integrantes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Servir arquivos estáticos (HTML/CSS) e as Fotos Enviadas
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Rotas da API
app.use('/api', authRoutes);
app.use('/api/integrantes', integrantesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});