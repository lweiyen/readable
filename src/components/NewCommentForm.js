import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleNewComment } from '../actions/shared';

class NewCommentForm extends Component {
  state = {
    body: '',
    author: '',
  }

  componentDidMount() {
    this.authorInput.focus();
  }

  handleChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.id]: e.target.value
    }))
  };

  handleSummit = (e) => {
    const { body, author } = this.state;
    const { pid, dispatch } = this.props;

    e.preventDefault();
    dispatch(handleNewComment(body, author, pid))
      .then(this.props.toggleNewComment);
  };

  render() {
    const { body, author } = this.state;
    const { toggleNewComment, loading } = this.props;

    return (
      <form className='comment-container' onSubmit={this.handleSummit}>
        <span><h3 className='center'> Add Comment </h3></span>
        <div className='header-edit'>
          <textarea
            id='author'
            placeholder='Enter your name here...'
            value={author}
            onChange={this.handleChange}
            className='textarea-author'
            ref={(input) => { this.authorInput = input; }} 
          />
        </div>
        <div className='content'>
          <textarea
            id='body'
            placeholder='Enter comment here...'
            value={body}
            onChange={this.handleChange}
            className='textarea-body'
          />        
        </div>
        <div className='control'>
          <button className='btn' type='submit' disabled={loading||body===''||author===''}>Submit</button>
          <button className='btn' type='button' onClick={toggleNewComment}>Cancel</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps ({loadingBar}, {toggleNewComment, pid}) {
  return {
    loading: loadingBar? loadingBar.default === 1 : true,
    toggleNewComment,
    pid
  };
}

export default connect(mapStateToProps)(NewCommentForm);