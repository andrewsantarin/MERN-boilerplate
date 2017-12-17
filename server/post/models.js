const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    default: '',
  },
  comment: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Post', PostSchema);
