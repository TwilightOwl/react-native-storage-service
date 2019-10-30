import React from 'react';
import ReactDOM from 'react-dom';

import CreateStorage, { _ } from '../../src';

const storage = CreateStorage({
    storageAccessors: {
      setItem: async (key, value) => localStorage.setItem(key, value),
      getItem: async key => localStorage.getItem(key),
      removeItem: async key => localStorage.removeItem(key),
      getAllKeys: async () => Object.keys(localStorage)
    }
  })
  //.addPrivate('a', _ as number).addPrivate('b', _ as number).
  .addPublic('A', _ as number)
  .addPrivate('b', _ as boolean)
  .addPrivate('c', _ as { a: { b: number[] }})
  .build();
  

(async () => {
  await storage.login('user')
  await new Promise(r => setTimeout(r, 5000))
  await storage.b.set(true)
  storage.A.set(10)
  storage.A.get().then(console.log)
  storage.c.set({a:{b: [1,2,3]}})
  await new Promise(r => setTimeout(r, 3000))
  storage.A.remove()
})()

window.storage = storage;

  //debugger;


class App extends React.Component {
/*
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
  */
  
  render() { return <div></div> }
}

export default App;
