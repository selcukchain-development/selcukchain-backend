const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/features', require('./routes/features'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/gallery-events', require('./routes/galleryEvents'));
app.use('/api/aboutus', require('./routes/aboutus'));
app.use('/api/join', require('./routes/join'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));