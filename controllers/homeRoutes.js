const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage Route
router.get('/', async (req, res) => {
  try {
    // Get all post data and JOIN with user data
    const post = await Post.findAll({
      include: [{ model: Comment }, { model: User }]
    });
    let postData = [];
    if (post === undefined || post === null || post.length === 0) {
      postData = [];
    } else {
      postData = post.map((post) => post.get({ plain: true }));
    }
    res.render('homepage', { 
      postData, 
      loggedIn: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logged In Navbar Route
// Use withAuth middleware to prevent unauthorized access
router.get('/navbar', withAuth, async (req, res) => {
  try {
    const post = await Post.findAll({
      include: [{ model: Comment }, { model: User }],
      where: {user_id:req.session.user_id}
    });
    let postData = [];
    if (post === undefined || post.length === 0) {
      postData = [];
    } else {
      postData = post.map((post) => post.get({ plain: true }));
    }
    res.render('navbar', { 
      postData, 
      loggedIn: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// SignUp Route
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/navbar');
    return;
  }
  res.render('signup');
});

// Login Route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/navbar');
    return;
  }
  res.render('login');
});

// Post Route
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User }]
    });
    let postData = [];
    if (post === undefined || post === null || post.length === 0) {
      postData = [];
    } else {
      postData = post.get({ plain: true });
    }
    const comment = await Comment.findAll({
      include: [{ model: User }],
      where: {post_id:req.params.id}
    });
    let commentData = [];
    if (comment === undefined || comment === null || comment.length === 0) {
      commentData = [];
    } else {
      commentData = comment.map((comment) => comment.get({ plain: true }));
    }
    res.render('post', {
      postData,
      commentData,
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Post Route 
// Use withAuth middleware to prevent unauthorized access
router.get('/post-update/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const post = await Post.findByPk(req.session.user_id, {
      include: [{ model: Comment }, { model: User }],
    });
    let postData = [];
    if (post === undefined || post === null || post.length === 0) {
      postData = [];
    } else {
      postData = post.get({ plain: true });
    }
    res.render('updatePost', {
      postData,
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// New Post Route
// Use withAuth middleware to prevent unauthorized access
router.get('/post-new', withAuth, async (req, res, next) => {
  res.render('newPost', {
    loggedIn: req.session.logged_in
  });
});

module.exports = router;