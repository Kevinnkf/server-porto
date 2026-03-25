import dotenv from 'dotenv';
import db from './models/index.js';
import routes from './routes/index.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const port = 3005;
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
import authRoutes from './routes/auth.js';
import skillRoutes from './routes/skill.js';
import experiencesRoutes from './routes/experiences.js';
import projectsRoutes from './routes/projects.js';
import summaryRoutes from './routes/summary.js';

app.use('/api', routes);
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/summary', summaryRoutes);

app.get('/', (req, res) => {
    res.send('Welco to my portofolio!');
    console.log("Test")
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);

});