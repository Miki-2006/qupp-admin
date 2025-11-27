import express from 'express';
import { loginAdmin, logoutAdmin } from '../controllers/loginController.js';

const loginRouter = express.Router();

loginRouter.post('/login', loginAdmin);
loginRouter.post('/logout', logoutAdmin);

export default loginRouter;