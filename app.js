const sql = require('mssql'),
  express = require('express'),
  bodyParser = require('body-parser');

var dbConfig = {
  server: 'localhost',
  user: 'sa',
  password: 'imran123',
  database: 'DB_travel'
};

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.post('/dailyRoute', function(req, res) {
  sql
    .connect(dbConfig)
    .then(pool => {
      var name = req.body.name;
      return pool.request().query(`INSERT INTO demo (name) VALUES (${name})`);
    })
    .then(result => {
      console.log(`${name} Added`);
      sql.close();
    })
    .catch(err => {
      console.log(err);
      sql.close();
    });
});

app.get('/all', function(req, res) {
  sql
    .connect(dbConfig)
    .then(pool => {
      var name = req.body.name;
      return pool.request().query(`SELECT * FROM demo`);
    })
    .then(result => {
      res.json(result.recordset);
      sql.close();
    })
    .catch(err => {
      console.log(err);
      sql.close();
    });
});

app.listen(3000, function() {
  console.log('server started at 3000');
});
