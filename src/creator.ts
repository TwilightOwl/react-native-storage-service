import Storage from './storage-service';
import { StorageServiceConstructor } from './types';

export const create = (props: StorageServiceConstructor) => {
  // Create storage
  // const Storage = { anyPreviousMethod: 3 };
  const storage = new Storage(props)
  
  const add = <Target>(target: Target) => <X extends string, T>(name: X, t: T) => {
    storage.add<T>(name)
    // type Q = typeof Storage
    // даже если по факту свойство name добавляется как getter и setter в типах оно должно быть как просто поле со значением типа T 
    type K = { [k in X]: T } & Target
    // interface Result extends Q {
    //     [k in X]: T
    // }
    // return Storage as { A: { set: (value: T) => void, get: () => T } }
    return {
      add: add(target as K),
      build: () => target as K
    }
  }
  
  return {
    add: add(storage)
  }
  
}


export const _ = <unknown>null
export const typed = <T>() => <T>_

export default create
