import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleEditPost } from '../actions/shared';

class PostEdit extends Component {
  state = {
    title: this.props.title,
    body: this.props.body
  }

  componentDidMount(){
    this.bodyText.focus();
  }

  handleChange = (e) => {
    e.persist();
    this.setState(() => ({
      [e.target.id]: e.target.value
    }))
  };

  handleSummit = (e) => {
    const {title, body} = this.state;
    const { dispatch, pid } = this.props;

    e.preventDefault();
    dispatch(handleEditPost(pid, title, body))
      .then(this.props.toggleEdit);
  };

  render() {
    const { title, body } = this.state;
    const { toggleEdit, loading } = this.props;

    return (
      <form className='post' onSubmit={this.handleSummit}>
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
            ref={(input) => { this.bodyText = input; }} 
          />        
        </div>
        <div className='control'>
          <button className='btn' type='submit' disabled={loading||title===''||body===''}>Submit</button>
          <button className='btn' type='button' onClick={toggleEdit}>Cancel</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps ({posts, loadingBar}, {pid, toggleEdit}) {
  return {
    title: posts[pid].title,
    body: posts[pid].body,
    toggleEdit,
    loading: loadingBar? loadingBar.default === 1 : true
  };
}

export default connect(mapStateToProps)(PostEdit);