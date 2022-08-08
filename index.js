const express = require('express');
const app = express();
require('dotenv').config('.env');
const cors = require('cors');
const geocoder = require('local-reverse-geocoder');

let isGeocodeInitialized = false;

// cors
app.use(cors({origin: '*'}));
app.use(express.json());

// routes
app.use('/api', require('./routes/main-route'));

app.get('/geocode', function(req, res) {
  if (!isGeocodeInitialized) {
    return res.status(503).send('Not ready yet.');
  }

  const lat = req.query.latitude || false;
  const lon = req.query.longitude || false;
  const maxResults = req.query.maxResults || 1;
  if (!lat || !lon) {
    return res.status(400).send('Bad Request');
  }
  const points = [];
  if (Array.isArray(lat) && Array.isArray(lon)) {
    if (lat.length !== lon.length) {
      return res.status(400).send('Bad Request');
    }
    for (let i = 0, lenI = lat.length; i < lenI; i++) {
      points[i] = {latitude: lat[i], longitude: lon[i]};
    }
  } else {
    points[0] = {latitude: lat, longitude: lon};
  }
  geocoder.lookUp(points, maxResults, function(err, addresses) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(addresses);
  });
});

app.listen(process.env.PORT || 3042, function() {
  console.log('server is running on port ' + process.env.PORT || 3042);
  console.log('Initializing Geocoder…');
  console.log(
      '(This may take a long time and will download ~300MB worth of data.)',
  );
  geocoder.init(
      {
        citiesFileOverride: 'cities15000',
        load: {
          admin1: true,
          admin2: false,
          admin3And4: false,
          alternateNames: false,
        },
        dumpDirectory: './dump',
      },
      function() {
        console.log('Geocoder initialized and ready.');
        console.log('Endpoints:');
        console.log(`- http://localhost:${process.env.PORT || 3042}/api`);
        console.log(`- http://localhost:${process.env.PORT || 3042}/geocode`);
        console.log('Examples:');
        console.log(
            `- http://localhost:${process.env.PORT || 3042}/geocode?latitude=54.6875248&longitude=9.7617254`,
        );
        isGeocodeInitialized = true;
      },
  );
});
