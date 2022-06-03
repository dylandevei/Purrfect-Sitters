require('dotenv/config');
const db = require('./db');
const path = require('path');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(staticMiddleware);

app.get('/api/users', (req, res) => {
  const sql = `
    select * from "sitterProfile"
  `;

  const params = sql.body;

  db.query(sql, params)
    .then(result => {
      const users = result.rows;
      res.status(200).json(users);
    }
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an error occured.'
      });
    });
});

app.get('/api/users/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sql = `
    select *

      from "sitterProfile"
     where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with userId ${userId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
