import express from 'express';
import { setDailyQuoteVideo } from '../controllers/quoteVideoController.js';

const quoteVideoRoutes = express.Router();

quoteVideoRoutes.put('/daily-quote-video', setDailyQuoteVideo);

export default quoteVideoRoutes;