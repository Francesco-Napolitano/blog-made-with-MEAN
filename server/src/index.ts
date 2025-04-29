import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { User } from './Models/user-model';
import { router } from './Routes/auth';
import { auth } from './Middleware/Auth';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
     console.error(
       "No ATLAS_URI environment variable has been defined in config.env"
     ); 
     process.exit(1);
   }
   

app.use(cors());
app.use(express.json());



// Routes
app.use('/api/auth', router);

// Protected route (only accessible with a valid token)
app.get('/api/private', auth, (req, res) => {
     res.send('This is a protected route');
   });



app.get('/', (req, res) => {
     res.send('Hello World!');
});

app.post('/user', async (req, res) => {
     const newMessage = new User({ text: req.body.text });
     try{
         await newMessage.save();
         res.status(201).json(newMessage);
     } catch (error) {
         res.status(500).json({ error: 'Error saving message' });
     }
})


mongoose
     .connect(ATLAS_URI)
     .then(() => console.log('MongoDB Connected'))
     .catch((err) => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});
