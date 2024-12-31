const { Router } = require('express');
const { getGameInfoBGG } = require('../bgg-api-helpers');
const { Games } = require('../database');

const gamesRouter = Router();

// End point starts with '/api/games'

/*
POST '/api/games => Sends request to BGG for info on board game name in req body
=> Stores game info in Database
*/
gamesRouter.post('/', async (req, res) => {
  // Grab game object from request's body
  const { game } = req.body;
  // Fetch game data from BGG
  const gameInfo = await getGameInfoBGG(game.name);
  // If nothing is returned from BGG
  if (!gameInfo) {
    // Send status 404
    res.status(200);
    res.send(null);
  } else {
    // Destructure gameInfo
    const {
      name,
      thumbnail,
      image,
      description,
      yearPublished,
      minPlayers,
      maxPlayers,
      playTime,
      minAge,
    } = gameInfo;
    // Query database to create a new game object with the game Info
    Games.create({
      name,
      thumbnail,
      image,
      description,
      yearPublished,
      minPlayers,
      maxPlayers,
      playTime,
      minAge,
    })
      // On success, send Status: 201
      .then(() => {
        res.sendStatus(201);
      })
      // On failure, log error and send Status: 500
      .catch((err) => {
        console.error('Failed to create new game object:', err);
        res.sendStatus(500);
      });
  }
});

/*
GET /api/games => Retrieve all games stored in DB
*/
gamesRouter.get('/', (req, res) => {
  // Query the database for all games
  Games.find({}).sort({ name: 'asc' })
    // Success, set Status: 200 & send array of games
    .then((gamesArr) => {
      res.status(200);
      res.send(gamesArr);
    })
    // Failure, log error & send Status: 500
    .catch((err) => {
      console.error('Failed to find all games in DB:', err);
      res.sendStatus(500);
    });
});

/*
DELETE /api/games/:id => Removes game using _id from the Database
*/
gamesRouter.delete('/:id', (req, res) => {
  // Grab the id from the request's path parameters
  const { id } = req.params;
  // Query the DB find the game by id and delete it
  Games.findByIdAndDelete(id)
    // Success
    .then((removedGame) => {
      // If no game is found, send Status: 404
      if (!removedGame) {
        res.sendStatus(404);
      // If a game is removed, send Status: 200
      } else {
        res.sendStatus(200);
      }
    })
    // Failure, log error and send Status: 500
    .catch((err) => {
      console.error('Failed to findByIdAndDelete:', err);
      res.sendStatus(500);
    });
});

/*
PATCH /api/games/:id => Updates game by _id using the object in the request's body
*/
gamesRouter.patch('/:id', (req, res) => {
  // Grab the game object from the request's body
  const { game } = req.body;
  // Grab the id from the request's path parameters
  const { id } = req.params;
  // Query the DB to update the game with the id using the game object
  Games.findByIdAndUpdate(id, game)
    .then((updatedGame) => {
      // If no game is found, send Status: 404
      if (!updatedGame) {
        res.sendStatus(404);
      // If a game is updated, send Status: 200
      } else {
        res.sendStatus(200);
      }
    })
    // Failure, log error & send Status: 500
    .catch((err) => {
      console.error('Failed to findByIdAndUpdate:', err);
      res.sendStatus(500);
    });
});

module.exports = {
  gamesRouter,
};
