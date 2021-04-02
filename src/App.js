import React from 'react';
import './App.css';
import Auth from './Authentication/Auth';
import Post from './Post/Post';

class App extends React.Component {
  render(){
    return (
    <div className="App">
      <Auth></Auth>
      <Post></Post>
    </div>
  );
}
}

export default App;
