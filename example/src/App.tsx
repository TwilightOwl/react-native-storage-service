import React from 'react';
import ReactDOM from 'react-dom';

import StorageService from '../../src';

window.StorageService = StorageService;

// interface Items {
//   privateItems: [
//     'PrivateA',
//     'PrivateB'
//   ],
//   publicItems: [
//     'PublicA',
//     'PublicB'
//   ]
// }

const service = new StorageService({
  storageAccessors: {
    setItem: async (key, value) => localStorage.setItem(key, value),
    getItem: async key => localStorage.getItem(key),
    removeItem: async key => localStorage.removeItem(key),
    getAllKeys: async () => Object.keys(localStorage)
  },
  privateItems: [
    'a',
    'b'
  ],
  publicItems: [
    'A',
    'B'
  ]
});





window.service = service



class App extends React.Component {

  constructor(props) {
    super(props)
    // this.retrieve();
  }

  init = () => service.init()

  setPrivateA = async () => {
    await service.setPrivateA(1)
    this.retrieve()
  }
  
  setPrivateB = async () => {
    await service.setPrivateB(2)
    this.retrieve()
  }

  retrieve = async () => {
    this.setState({
      A: await service.getPrivateA(),
      B: await service.getPrivateB(),
    })
  }

  render() {
    return (
      <div className="App">
        <br/>
        {JSON.stringify(this.state)}
        <br/><br/><br/>
        <button onClick={this.init}>Init</button>
        <br/><br/><br/>
        <button onClick={this.setPrivateA}>setPrivateA</button>
        <button onClick={this.setPrivateB}>setPrivateB</button>
        <br/><br/><br/>
      </div>
    );
  }
}

export default App;
