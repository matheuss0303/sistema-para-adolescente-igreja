// seed.js
const prisma = require('./src/lib/prisma');
const bcrypt = require('bcryptjs');

async function main() {
    const senhaPadrao = await bcrypt.hash('123456', 10);

    // Líder de Adolescentes
    await prisma.usuario.upsert({
        where: { email: 'adolescentes@igreja.com' },
        update: {},
        create: {
            nome: 'Líder Adolescentes',
            email: 'adolescentes@igreja.com',
            senha: senhaPadrao,
            perfil: 'LIDER_ADOLESCENTES'
        }
    });

    // Líder de Jovens
    await prisma.usuario.upsert({
        where: { email: 'jovens@igreja.com' },
        update: {},
        create: {
            nome: 'Líder Jovens',
            email: 'jovens@igreja.com',
            senha: senhaPadrao,
            perfil: 'LIDER_JOVENS'
        }
    });

    console.log('✅ Usuários de teste criados com sucesso!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });