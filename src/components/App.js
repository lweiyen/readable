import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import { connect } from 'react-redux';
import PostList from './PostList';
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import PostPage from './PostPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { categories, loading } = this.props;

    return (
      <Router>
      <div className='App'>
        <LoadingBar />
        <Nav categories={categories} />
        <h2 className='title'> Welcome to Readable! </h2>
        <Switch>
          <Route path='/' exact render={() => <PostList category='All' />} />
          {Object.values(categories).map(({name, path}) => (
            <Route key={name} path={`/${path}`} exact render={() => <PostList category={name} />} />
          ))}
          <Route path='/:category/:pid' component={PostPage} />
          <Route render={() => <PageNotFound loading={loading}/>} />
        </Switch>
      </div>
      </Router>
    );
  }
}

function mapStateToProps ({ categories, loadingBar }) {
  return {
    categories,
    loading: loadingBar? loadingBar.default === 1 : true
  }
}

export default connect(mapStateToProps)(App);