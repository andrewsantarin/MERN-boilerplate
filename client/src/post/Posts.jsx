import React, { Component } from 'react';
import 'whatwg-fetch';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      newPost: {
        author: '',
        comment: '',
      },
    }; 
  }

  testUser = () => {
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ page: "one", filter: "none" }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(JSON.stringify(json, null, 2));
      });
  }

  componentDidMount() {
    console.log('asdf');
    fetch('/api/posts')
      .then(res => res.json())
      .then(json => {
        this.setState({
          posts: json
        });
      });
  }

  newPost = () => {
    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(this.state.newPost),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        let data = this.state.posts;
        data.push(json);

        this.setState({
          posts: data
        });
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.newPost();
  }

  handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const name = target.getAttribute('name');

    this.setState({
      newPost: {
        ...this.state.newPost,
        [`${name}`]: value,
      },
    });
  }

  incrementPost = (index) => {
    const id = this.state.posts[index]._id;

    fetch(`/api/posts/${id}/increment`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        this._modifyPost(index, json);
      });
  }

  decrementPost = (index) => {
    const id = this.state.posts[index]._id;

    fetch(`/api/posts/${id}/decrement`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        this._modifyPost(index, json);
      });
  }

  deletePost = (index) => {
    const id = this.state.posts[index]._id;

    fetch(`/api/posts/${id}`, { method: 'DELETE' })
      .then(_ => {
        this._modifyPost(index, null);
      });
  }

  _modifyPost = (index, data) => {
    let prevData = this.state.posts;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      posts: prevData
    });
  }

  render() {
    return (
      <div>
        <p>Posts:</p>

        <ul>
          {this.state.posts.map((post, i) => (
            <li key={i}>
              <span>{post.author}</span>
              <span>{post.comment}</span>
            </li>
          ))}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            name="author"
            value={this.state.newPost.author}
            onChange={this.handleChange}
            placeholder="Your name"
          />
          <textarea
            name="comment"
            value={this.state.newPost.comment}
            onChange={this.handleChange}
            placeholder="Your words..."
          />
          <button type="submit">Post comment</button>
        </form>
      </div>
    );
  }
}

export default Posts;
