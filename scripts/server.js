const express = require('express');
app = express();

const ROOT_DIR = 'www';
app.use(express.static(ROOT_DIR));

// Send the index.html for other files to support Angular routing
app.all('/*', function (req, res, next) {
  res.sendFile('index.html', {
    root: ROOT_DIR
  });
});

// Use the port set by Heroku in the environment
app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
