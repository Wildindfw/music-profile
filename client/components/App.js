import React, {Component} from 'react';
import fetch from 'isomorphic-fetch';
import Playlist from './Playlist';
import Albums from './Albums';
import SetList from './SetList'


class App extends Component {
  render() {
    return (
      <div id='components-wrapper'>
        <SetList/>
        <Playlist/>
        <Albums/>
      </div>
      )
  }
}


export default App;
