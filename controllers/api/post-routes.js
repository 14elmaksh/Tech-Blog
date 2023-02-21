const router = require('express').Router();
const { Post, Comment } = require('../../models/');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{model: Comment}]
    }) 
    res.status(200).json(postData)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk( {
      where: {
        id: req.params.id
      },
      include: [{model: Comment}]
    }) 
    if(!postData) {
      res.status(404).json({message: "No Post found with that id"})
      return
    }
    res.status(200).json(postData)
  } catch(err) {
    res.status(500).json(err)
  }
})

router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const post = await Post.create({ ...body, userId: req.session.userId });
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
