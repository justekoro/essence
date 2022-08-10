const express = require('express');
const app = express();
require('dotenv').config('.env');
const cors = require('cors');
const port = process.env.PORT || 3042;

// cors
app.use(cors({origin: '*'}));
app.use(express.json());

// routes
app.use('/api', require('./routes/main-route'));

app.listen(port, function() {
  console.log('server is running on port ' + port);
});
