const express = require('express');
const app = express();
require('dotenv').config(".env");
const cors = require('cors');
//cors
app.use(cors({ origin: '*' }));
app.use(express.json());
//routes
app.use('/api', require('./routes/main-route'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})