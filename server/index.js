require('dotenv/config');
const db = require('./db')
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));

app.get('/api/users/', (req, res) => {
  const sql =  `
    select * from "sitterProfile"
  `;

  const params = sql.body;

  db.query(sql,params)
  .then(result => {
    const users = result.rows;
    res.status(200).json(users);
  }
  )
  .catch(err=> {
    console.error(err);
    res.status(500).json({
      error: 'an error occured.'
    });
  });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
