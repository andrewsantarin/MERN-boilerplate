const Post = require('./models');

module.exports = (app) => {
  app.get('/api/posts', (req, res, next) => {
    Post.find()
      .exec()
      .then((post) => res.json(post))
      .catch((err) => next(err));
  });

  app.post('/api/posts', (req, res, next) => {
    const { author, comment } = req.body;
    const post = new Post({
      author,
      comment,
    });

    post.save()
      .then(() => res.json(post))
      .catch((err) => next(err));
  });

  app.delete('/api/posts/:id', (req, res, next) => {
    Post.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((post) => res.json())
      .catch((err) => next(err));
  });

  app.put('/api/posts/:id/', (req, res, next) => {
    const { author, comment } = req.body;

    Post.findById(req.params.id)
      .exec()
      .then((post) => {
        post.author = req.author;
        post.comment = req.comment;

        post.save()
          .then(() => res.json(post))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};
