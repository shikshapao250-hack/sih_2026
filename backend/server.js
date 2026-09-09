import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import skillsRoutes from './routes/skillsRoute.js';
import projectsRoutes from './routes/projectsRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import jobsRoutes from './routes/jobRoutes.js';
import studentsRoutes from './routes/studentsRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/skills', skillsRoutes);
app.use('/projects', projectsRoutes);
app.use('/education', educationRoutes);
app.use('/jobs', jobsRoutes);
app.use('/students', studentsRoutes);

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});