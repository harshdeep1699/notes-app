import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Auth from './Authentication/Auth';
import Post from './Post/Post';
import WelcomePage from './WelcomePage/WelcomePage';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
      <div className="App">
      <Route path="/" exact><WelcomePage></WelcomePage></Route>
      <Route path="/login" exact><Auth></Auth></Route>
      <Route path="/posts" exact>
        <Auth></Auth>
        <Post></Post></Route>
      
    </div>
      </BrowserRouter>
    
  );
}
}

export default App;
