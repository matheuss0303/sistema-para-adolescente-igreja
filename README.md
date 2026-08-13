<div align="center">

  <img src="public/logo.png" alt="Geração Eleita Logo" width="120" />

# 🌿 Geração Eleita — Portal de Gestão Ministerial

**Plataforma Enterprise de Alta Performance para Acompanhamento, Matrículas e Métricas de Jovens e Adolescentes.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-00E676?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-00E676?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.x-00E676?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-00E676?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-00E676?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

</div>

---

## 📌 Sobre o Projeto

O **Geração Eleita** é um sistema completo de gestão de integrantes desenvolvido para simplificar o controle cadastral e o acompanhamento pastoral dos ministérios de **Adolescentes** e **Jovens** da Igreja Batista Amor Eterno.

A aplicação conta com uma interface moderna de padrão internacional (*Split-Screen Glassmorphism* com iluminação verde esmeralda), controle de acesso por perfis de liderança, numeração automática de matrículas e relatórios em tempo real.

---

## ✨ Funcionalidades Principais

- 🔐 **Autenticação & Controle de Acesso:** Sessões seguras com separação de perfis (`LIDER_ADOLESCENTES`, `LIDER_JOVENS` e `ADMIN`).
- 🆔 **Matrícula Sequencial Automática:** Formatação inteligente com 4 dígitos (`Nº 0001`, `Nº 0002`, ...).
- 📝 **Gestão Completa de Integrantes (CRUD):** Ficha cadastral detalhada com foto de perfil, dados dos pais, contato, endereço e alertas de alergias.
- 🔍 **Busca Dinâmica em Tempo Real:** Filtro rápido por nome ou número de matrícula sem recarregar a página.
- 📊 **Métricas e KPIs Globais:** Contagem total de registrados, destaques para aniversariantes do mês e indicadores de participantes com alergias.
- 📱 **Integração com WhatsApp:** Botão com atalho direto para iniciar conversas com os integrantes.
- 🎨 **UI/UX Enterprise Dark Emerald:** Design imersivo inspirado em plataformas *high-end* (Stripe, Vercel, Linear).

---

## 🛠️ Tecnologias Utilizadas

### **Backend**
- **Node.js** com **Express.js** — Estrutura de servidor HTTP e APIs RESTful.
- **Prisma ORM** — Modelagem e manipulação simplificada de banco de dados.
- **Multer** — Middleware para upload e processamento de imagens.
- **Express Session** — Gerenciamento seguro de autenticação.

### **Frontend**
- **HTML5 & CSS3 Avançado** — Layouts responsivos com variáveis CSS e efeitos Glassmorphism.
- **Bootstrap 5.3** — Componentes e modais interativos.
- **JavaScript (Vanilla ES6+)** — Manipulação assíncrona da DOM com Fetch API.

### **Banco de Dados**
- **SQLite** — Armazenamento relacional leve e portátil.

---

## 🚀 Como Executar o Projeto Localmente

### **Pré-requisitos**
- [Node.js](https://nodejs.org/) instalado (Versão 18 ou superior).
- Gerenciador de pacotes `npm` ou `yarn`.

### **Passo a Passo**

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/matheuss0303/geracao-eleita-app.git](https://github.com/matheuss0303/geracao-eleita-app.git)
   cd geracao-eleita-app