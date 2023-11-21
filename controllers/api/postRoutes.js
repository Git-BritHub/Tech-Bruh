const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET Post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }]
    });
    const postData = post.get({plain:true});
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE Post
router.post('/', withAuth, async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    const newPost = await Post.create(req.body);
      res.status(200).json(newPost);

  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE Post
router.put('/:id', withAuth, async (req, res) => {
  try {
    req.body.user_id = req.session.user_id;
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    (updatePost[0]) ? res.status(200).json({id:req.params.id, msg: 'Post successfully updated!'})
      :res.status(400).json({msg: 'Post Update Failed'});  

  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post data found with this id!' });
      return;
    }
    res.status(200).json(blogData);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
