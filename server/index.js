require('dotenv/config');
const db = require('./db');
const path = require('path');
const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(staticMiddleware);
app.use(express.json());

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
  select "userId",
         "hashedPassword"
  from   "users"
  where  "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.status(200).json({ token, user: payload });

        });
    })
    .catch(err => next(err));
});

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

app.get('/api/users', (req, res) => {
  const sql = `
    select "userId", "username", "createdAt"
    from "users"
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

app.get('/api/sitters/pets/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sql = `
    select *
      from "sitters"
      join "pets" using ("userId")
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

app.get('/api/users/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sql = `
    select "userId", "username", "createdAt"
    from "users"
    where "userId" = $1
  `;

  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find user with userId ${userId}`);
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

app.get('/api/users/pets/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sql = `
    select *
      from "pets"
     where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);

app.post('/api/sitters', (req, res, next) => {
  const { userId } = req.user;
  const {
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
    aboutMe
  } = req.body;

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

app.post('/api/users/pets', (req, res, next) => {
  const { userId } = req.user;
  const {
    imageUrl,
    petType,
    petName,
    weight,
    age,
    sex,
    breed,
    favoriteToy,
    spayedNeutered,
    friendlyWithChildren,
    friendlyWithAnimals,
    vetContact,
    foodType,
    foodSchedule,
    bathroomRoutine,
    additionalInformation
  } = req.body;

  const sql = `
    insert into "pets"
    ("userId", "imageUrl", "petType", "petName",
    "weight", "age", "sex", "breed", "favoriteToy",
    "spayedNeutered", "friendlyWithChildren", "friendlyWithAnimals", "vetContact",
    "foodType", "foodSchedule", "bathroomRoutine",
    "additionalInformation")

    values
      ($1, $2, $3,
      $4, $5, $6,
      $7, $8, $9,
      $10, $11, $12,
      $13, $14, $15,
      $16, $17)

    returning *
  `;

  const params = [
    userId,
    imageUrl,
    petType,
    petName,
    weight,
    age,
    sex,
    breed,
    favoriteToy,
    spayedNeutered,
    friendlyWithChildren,
    friendlyWithAnimals,
    vetContact,
    foodType,
    foodSchedule,
    bathroomRoutine,
    additionalInformation];

  db.query(sql, params)
    .then(result => {
      const [newPet] = result.rows;
      res.status(201).json(newPet);
    })
    .catch(err => next(err));
});

app.get('/api/users/pets/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    throw new ClientError(400, 'userId must be a positive integer');
  }
  const sql = `
    select *
      from "pets"

     where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(404, `cannot find pet with petId ${userId}`);
      }
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
