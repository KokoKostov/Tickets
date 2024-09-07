const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ticketRoutes = require('./routes/ticket.routes'); 

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/ticket', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});


app.use('/api', ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
