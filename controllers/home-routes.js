const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['text','created_at'],
        include: [
          {
          model: User,
          attributes: ['username'],
          }
        ]
      }
      ],
    });
    // serialize the data
    const post = allPosts.map((post) => post.get({ plain: true }));
    // we should render all the post here
    res.render('all-posts', { 
      post,
      logged_in: req.session.logged_in 
   });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async(req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      
      // helping you out with the include here, no changes necessary
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      // serialize the data
      const post = postData.get({ plain: true });
      // which view should we render for a single-post?
      res.render('single-post', { 
        post,
        loggedIn: req.session.loggedIn 
       });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// giving you the login and signup route pieces below, no changes needed.
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
