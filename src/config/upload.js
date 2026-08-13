const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garante que o diretório public/uploads exista
const uploadFolder = path.resolve(__dirname, '..', '..', 'public', 'uploads');
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const time = new Date().getTime();
        cb(null, `${time}_${file.originalname.replace(/\s+/g, '_')}`);
    }
});

const upload = multer({ storage });

module.exports = upload;