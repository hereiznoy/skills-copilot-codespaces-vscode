// Create web server with express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create an object to store comments
const commentsByPostId = {};

// Define route for getting comments
app.get('/posts/:id/comments', (req, res) => {
  // Return comments for a specific post
  res.send(commentsByPostId[req.params.id] || []);
});

// Define route for posting comments
app.post('/posts/:id/comments', (req, res) => {
  // Generate a random id
  const commentId = randomBytes(4).toString('hex');
  // Get the comment
  const { content } = req.body;

  // Get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];

  // Add the comment to the comments array
  comments.push({ id: commentId, content });

  // Add the comments to the object
  commentsByPostId[req.params.id] = comments;

  // Send back the comments
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});