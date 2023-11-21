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
    res.render('home', {postData, loggedIn: req.session.logged_in});
    // Serialize data so the template can read it
    const Posts = postData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      postData, 
      loggedIn: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Dashboard Route

// Login Route

// SignUp Route

// Post Route
router.get('/post/:id', async (req, res, next) => {
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
      where:{post_id:req.params.id}
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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/blog');
    return;
  }

  res.render('login');
});

module.exports = router;