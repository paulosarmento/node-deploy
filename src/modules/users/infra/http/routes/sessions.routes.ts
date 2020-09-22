import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';


// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const sessionsRouter = Router();
const sessionsController = new SessionsController()


sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
