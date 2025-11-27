import express from 'express';
import router from './routes/index.js';
const app = express()
import db from './services/firebase.js';


app.use(express.json());


app.get('/', (req, res) => {  
  res.send('Home!');
});

app.use('/api', router)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;