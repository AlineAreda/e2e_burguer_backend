import multer from 'multer';

export const upload = multer({
  // Não é necessário configurar `storage` ou `fileFilter` se os arquivos não forem enviados no momento
  limits: {
    fileSize: 2 * 1024 * 1024, // Limita o tamanho a 2MB (caso seja necessário no futuro)
  },
});

