const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const https = require('https');

//create api request for getting stats
app.get('/api/stats', (req, res) => {
  fs.readFile("/home/ubuntu/utilBot/data/data.csv", 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    
    // Split the data into lines
    let lines = data.split('\n');

    // Get the last line
    let lastLine = lines[lines.length - 2]; // -2 because the last element is an empty string due to the split

    // Split the line by commas
    let parts = lastLine.split(',');

    // Get the last three numbers
    let numbers = parts.slice(-3);

    // Send the numbers as a response
    res.json({
      users: parseInt(numbers[0]),
      servers: parseInt(numbers[1]),
      commands: parseInt(numbers[2])
    });
  });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 page when route not found
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


// Start the server with http
const port = 3000;
app.listen(port, () => {
  console.log('Server is running on port ${port}');
});
