require('dotenv/config');
const db = require('./db');
const pg = require('pg');
const path = require('path');
const express = require('express');
const argon2 = require('argon2');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');


const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(staticMiddleware);
app.use(express.json());


app.get('/api/sitters', (req, res) => {
  const sql = `
    select * from "sitters"
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

app.get('/api/pets', (req, res) => {
  const sql = `
    select * from "pets"
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

app.get('/api/sitters/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sql = `
    select *

      from "sitters"
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



app.get('/api/pets/:petId', (req, res, next) => {
  const petId = Number(req.params.petId);
  if (!petId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sql = `
    select *

      from "pets"
     where "petId" = $1
  `;
  const params = [petId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find product with userId ${petId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/sitters', (req, res, next) => {
  const {
         userId,
         imageUrl,
         fullName,
         phoneNumber,
         streetAddress,
         city,
         zipCode,
         state,
         tagline,
         petSpecialty,
         service1,
         service2,
         service3,
         service4,
         service1Price,
         service2Price,
         service3Price,
         service4Price,
         aboutMe } = req.body;

  const sql = `
    insert into "sitters"
    ("userId", "imageUrl", "fullName", "phoneNumber",
    "streetAddress","city", "zipCode", "state", "tagline",
    "petSpecialty", "service1", "service2", "service3",
    "service4", "service1Price","service2Price",
    "service3Price", "service4Price","aboutMe")

    values
      ($1, $2, $3,
      $4, $5, $6,
      $7, $8, $9,
      $10, $11, $12,
      $13, $14, $15,
      $16, $17, $18, $19)

    returning *
  `;
  const params = [
    userId,
    imageUrl,
    fullName,
    phoneNumber,
    streetAddress,
    city,
    zipCode,
    state,
    tagline,
    petSpecialty,
    service1,
    service2,
    service3,
    service4,
    service1Price,
    service2Price,
    service3Price,
    service4Price,
    aboutMe];

  db.query(sql, params)
    .then(result => {
      const [newSitter] = result.rows;
      res.status(201).json(newSitter);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
