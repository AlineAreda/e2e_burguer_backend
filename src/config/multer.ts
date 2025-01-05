import crypto from 'crypto';
import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Arquivo não suportado.'));
    }
  },
});
