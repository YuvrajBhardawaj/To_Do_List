import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getItem, deleteItem, addItem } from './db.js';

const app = express();

app.use(cors({
  origin: 'https://to-do-list-azjm.vercel.app/',  // Allow requests from your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // if you need to handle cookies
}));

app.use(express.json());

const uri = 'mongodb+srv://yuvrajbhardawaj31018:yuvraj123@cluster0.ftqitxg.mongodb.net/to_do_list';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/api/to_do_list', async (req, res) => {
  try {
    const tasks = await getItem();
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/to_do_list', async (req, res) => {
  try {
    const { list } = req.body;
    const result = await addItem(list);
    res.send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/to_do_list/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await deleteItem(_id);
    res.send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log("Server running at 3000");
});
