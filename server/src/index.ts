import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectToDatabase from './config/db';
import {DataModel} from './model/schema';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json()); 
const path = require('path');


connectToDatabase();

// Connect to MongoDB

// POST request to save data
app.post('/api/data', async (req:any, res:any) => {
  const data = new DataModel(req.body);
  try {
    await data.save();
    res.status(201).json(data);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// GET request to fetch data
app.get('/api/data', async (req:any, res:any) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
