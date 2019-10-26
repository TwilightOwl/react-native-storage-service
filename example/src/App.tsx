import React from 'react';
import ReactDOM from 'react-dom';

import StorageService from '../../src';
import { create, _ } from '../../src/creator';



// window.StorageService = StorageService;

        // const ss = new StorageService({
        //   storageAccessors: {
        //     setItem: async (key, value) => localStorage.setItem(key, value),
        //     getItem: async key => localStorage.getItem(key),
        //     removeItem: async key => localStorage.removeItem(key),
        //     getAllKeys: async () => Object.keys(localStorage)
        //   },
        //   privateItems: [
        //     'a',
        //     'b'
        //   ],
        //   publicItems: [
        //     'A',
        //     'B'
        //   ]
        // });
        
        // type S = typeof ss;
        // const s: S = ss;
        // s

const storage = create({
    storageAccessors: {
      setItem: async (key, value) => localStorage.setItem(key, value),
      getItem: async key => localStorage.getItem(key),
      removeItem: async key => localStorage.removeItem(key),
      getAllKeys: async () => Object.keys(localStorage)
    }
  })
  .add('a', _ as number)
  .add('b', _ as boolean)
  .build()

const f = async () => {
  console.log('res: start')
  const r: number = await storage.a
  console.log('res: start storage.a getter', await storage.a)
  await (storage.a = 4)
  console.log('res: start storage.a setter')

  TODO: проверить как будут работать асинхронные геттеры и сеттеры, если ничего не выйдет с этим, то сделать через обычные функции get и set
  попробовать отдельно сделать простой класс с асинхронными типизированными геттером и сеттером и поиграться с ними
}

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
