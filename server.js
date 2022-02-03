const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const data = require("./data/data.json");
const turno = require("./data/turno.json");
const reportes = require("./data/reportes.json");

const { writeFile } = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send(data);
});

app.get('/api/turno', (req, res) => {
  res.send(turno);
});

app.get('/api/reporte', (req, res) => {
  res.send(reportes);
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  const path = './data/turno.json';
  const config = { turno: 0 };

  writeFile(path, JSON.stringify(config, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }
    console.log('Data written successfully to disk');

  })
  res.send(200);
});

app.post('/api/newTurn', (req, res) => {
  console.log(req.body);
  const path = './data/turno.json';
  const config = req.body;

  writeFile(path, JSON.stringify(config, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }
    console.log('Data written successfully to disk');

  })
  res.send(200);
});

app.post('/api/newReporte', (req, res) => {
  console.log(req.body);
  const path = './data/reportes.json';
  const config = req.body;

  writeFile(path, JSON.stringify(config, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }
    console.log('Data written successfully to disk');

  })
  res.send(200);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
