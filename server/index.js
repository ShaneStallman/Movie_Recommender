
import chalkAnimation from 'chalk-animation';
import express from 'express';
import logger from 'morgan';
import { mongo } from './database.js';
import { readFile } from 'fs/promises';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb'}));
app.use(logger('dev'));
app.use('/', express.static('src'));

app.post('/addMovie', async (req, res) => {
    const {information, rating} = req.body;
    try {
      await mongo.connect();
      await mongo.createNewMovie(information, rating)
      .then(() => {
        res.status(200).json({ status: 'success' });
      })
      .catch((error) => {
        console.error('Error adding Movie:', error);
        res.status(500).json({ status: 'error', message: 'Failed to add Movie' });
      });
      await mongo.close();
    } catch (error) {
        console.error('Error adding Movie:', error);
        res.status(500).json({ status: 'error', message: 'Failed to add Movie' });
    }
});
 
app.get('/getMovie', async (req, res) => {
    const id = req.query.id;
    try {
    await mongo.connect();
    const data = await mongo.searchMovieByID(id);
    const movie = data[0];
    res.status(200).json(movie);
    await mongo.close();
    }
    catch (error) {
      console.error('Error retrieving movie', error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve movie' });
    }
  });

  app.get('/getMyList', async (req, res) => {
    const list = req.query.list;
    const listArray = list.split(',');
    try {
    await mongo.connect();
    const data = await mongo.getMyList(listArray);
    res.status(200).json(data);
    await mongo.close();
    }
    catch (error) {
      console.error('Error retrieving movie', error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve movie' });
    }
  });

  app.get('/getGenre', async (req, res) => {
    const genre = req.query.genre;
    try {
    await mongo.connect();
    const data = await mongo.searchMoviesByGenre(genre);
    res.status(200).json(data);
    await mongo.close();
    }
    catch (error) {
      console.error('Error retrieving movie', error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve movie' });
    }
  });

  app.get('/getSimilar', async (req, res) => {
    const type = req.query.type;
    const title = req.query.title;
    try {
    await mongo.connect();
    const data = await mongo.compareAllMovies(type, title);
    res.status(200).json(data);
    await mongo.close();
    }
    catch (error) {
      console.error('Error retrieving movie', error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve movie' });
    }
  });

  app.get('/getRandom', async (req, res) => {
    try {
    await mongo.connect();
    const data = await mongo.getRandom();
    const movie = data[0];
    res.status(200).json(movie);
    await mongo.close();
    }
    catch (error) {
      console.error('Error retrieving movie', error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve movie' });
    }
  });

  app.get('/whatsNew', async (req, res) => {
    try {
    await mongo.connect();
    const data = await mongo.getWhatsNew();
    res.status(200).json(data);
    await mongo.close();
    }
    catch (error) {
      console.error('Error retrieving movie', error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve movie' });
    }
  });

  app.get('/atoz', async (req, res) => {
    try {
    await mongo.connect();
    const data = await mongo.readAllMovies();
    res.status(200).json(data);
    await mongo.close();
    }
    catch (error) {
      console.error('Error retrieving movie', error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve movie' });
    }
  });

  app.patch('/editMovie', async (req, res) => {
    const {title, field, newValue} = req.body;
    try {
    await mongo.connect();
    const data = await mongo.editMovie(title, field, newValue);
    res.status(200).json(data);
    await mongo.close();
    }
    catch (error) {
      console.error('Error retrieving movie', error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve movie' });
    }
  });

  app.patch('/addRating', async (req, res) => {
    const {title, rating} = req.body;
    try {
    await mongo.connect();
    const data = await mongo.addRatingMovie(title, rating);
    res.status(200).json(data);
    await mongo.close();
    }
    catch (error) {
      console.error('Error retrieving movie', error);
      res.status(500).json({ status: 'error', message: 'Failed to retrieve movie' });
    }
  });

app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
  });
  
  app.listen(port, () => {
    const banner = `WELCOME`;
    const msg = `${banner}\n     Server started on http://localhost:${port}`;
    const rainbow = chalkAnimation.rainbow(msg);
  
    setTimeout(() => {
      rainbow.stop();
    }, 2000);
  });