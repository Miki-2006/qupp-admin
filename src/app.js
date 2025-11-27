import express from 'express';
import router from './routes/index.js';
const app = express()
import db from './services/firebase.js';


app.use(express.json());


app.get('/', (req, res) => {  
  res.send('Главная!');
});

app.use('/api', router)

const port = process.env.PORT || 3000;

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

export default app;