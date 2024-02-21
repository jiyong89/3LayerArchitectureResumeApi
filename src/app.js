import express from 'express';
import dotenv from 'dotenv';
import router from './routes/user.router';


dotenv.config();

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/api', router);


app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
