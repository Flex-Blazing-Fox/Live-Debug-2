const http = require('http');
const app = require('../app');
const PORT = process.env.PORT || 3001;

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT, function() {
  console.log('Express running on port', PORT);
});