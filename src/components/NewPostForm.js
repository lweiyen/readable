import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleNewPost } from '../actions/shared';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { withRouter } from 'react-router-dom';

class NewPostForm extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: ''
  }

  componentDidMount() {
    const pathname = this.props.location.pathname;
    this.setState(() => ({
      category: pathname.slice(1)
    }))
    this.authorInput.focus();
  }

  handleChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.id]: e.target.value
    }))
  };

  categoryChange = (input) => {
    this.setState(() => ({
      category: input.value
    }))
  };

  handleSummit = (e) => {
    const { title, body, author, category } = this.state;
    const { dispatch } = this.props;

    e.preventDefault();
    dispatch(handleNewPost(title, body, author, category))
      .then(this.props.toggleNewPost);
  };

  render() {
    const { title, body, author, category } = this.state;
    const { toggleNewPost, loading, categories } = this.props;
    const options = Object.keys(categories);

    return (
      <form className='post-container' onSubmit={this.handleSummit}>
        <span><h3 className='center'> Create New Post </h3></span>
        <div className='header-edit'>
          <textarea
            id='author'
            placeholder='Enter your name here...'
            value={author}
            onChange={this.handleChange}
            className='textarea-author'
            ref={(input) => { this.authorInput = input; }} 
          />
          <span className='category-select'>
            <Dropdown options={options} onChange={this.categoryChange} value={category} placeholder="Select category" />
          </span>
        </div>
        <div className='content'>
          <textarea
            id='title'
            placeholder='Enter post title here...'
            value={title}
            onChange={this.handleChange}
            className='textarea-title'
          />
          <textarea
            id='body'
            placeholder='Enter post body here...'
            value={body}
            onChange={this.handleChange}
            className='textarea-body'
          />        
        </div>
        <div className='control'>
          <button className='btn' type='submit' disabled={loading||title===''||body===''||author===''||category===''}>Submit</button>
          <button className='btn' type='button' onClick={toggleNewPost}>Cancel</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps ({loadingBar, categories}, {toggleNewPost}) {
  return {
    loading: loadingBar? loadingBar.default === 1 : true,
    categories,
    toggleNewPost
  };
}

export default withRouter(connect(mapStateToProps)(NewPostForm));