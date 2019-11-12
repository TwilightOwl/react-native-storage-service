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

class App extends React.Component {
  render() { return <div>See what happens in local storage via chrome devtools</div> }
}

export default App;
