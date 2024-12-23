import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes';
import swaggerUi from 'swagger-ui-express';

const swaggerDocs = require('./swagger.json');


const app = express();
app.use(express.json());

// Configuração do CORS
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {  
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Erro interno do Servidor.'
    });

});

// Apenas para rodar localmente
//app.listen(3333, () => console.log('Servidor está rodando em http://localhost:3333,'));

export default app;  // Exportando o app para que Vercel o utilize como uma função serverless
