require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerDocs = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => {
   console.log("Connected to MongoDB");
}).catch(err => {
   console.error("Could not connect to MongoDB", err);
});

const alunosRoutes = require('./routes/alunos');
const cursosRoutes = require('./routes/cursos');

app.use('/api/alunos', alunosRoutes);
app.use('/api/cursos', cursosRoutes);


const PORT = 3001;

swaggerDocs(app);

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
