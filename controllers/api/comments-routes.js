const router = require('express').Router();
const { Comments } = require('../../models');
// const withAuth = require('../../utils/auth');

//get all comments
router.get('/', (req, res) => {
  Comments.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get one comment
router.get('/:id', (req, res) => {
  Comments.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//update comment
router.put('/:id', (req, res) => {
  Comments.update(
    {
      comments_text: req.body.comments_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create comment
router.post('/', /*withAuth,*/(req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comments.create({
    comments_text: req.body.comments_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

//delete comment
router.delete('/:id', /*withAuth,*/(req, res) => {
  Comments.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;