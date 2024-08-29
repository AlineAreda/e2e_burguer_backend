import crypto from 'crypto';
import multer from 'multer';

export default {
    upload(p0: string) {
        return {
            storage: multer.memoryStorage(),
            filename: (request, file, callback) => {
                const fileHash = crypto.randomBytes(16).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;
                callback(null, fileName);
            }
        };
    }
};
