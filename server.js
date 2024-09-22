const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const https = require('https');

//create api request for getting stats
app.get('/api/0', (req, res) => {
  // Open SqLite database
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('/home/ubuntu/Discord-UtilityBeltv2/data/database.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    // Get the last row from the stats table
    db.get('SELECT * FROM stats ORDER BY id DESC LIMIT 1', (err, row) => {
      if (err) {
        console.error(err.message);
      }
      let users = row.guild_member_total;
      let servers = row.guild_count;
      let commands = row.total_command_count + 17894; // add the commands from the old database
      // Send the response
      res.json({ users, servers, commands });
    });
  });

  // Close the database
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
}
);

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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
