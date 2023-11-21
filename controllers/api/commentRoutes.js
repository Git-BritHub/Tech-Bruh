const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET comment
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id, {
            include: [{ model: User }, { model: Post }]
        });
        const commentData = comment.get({plain:true});
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE comment
router.post('/:id', withAuth, async (req, res) => {

    try {
        req.body.post_id = req.params.id;
        req.body.user_id = req.session.user_id;
        const newComment = await Comment.create(req.body);
            res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comments found with this id!' });
        return;
      }
      res.status(200).json(commentData);
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;