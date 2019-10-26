import Storage from './storage-service';
import { StorageServiceConstructor } from './types';

export const create = (props: StorageServiceConstructor) => {
  // Create storage
  // const Storage = { anyPreviousMethod: 3 };
  const storage = new Storage(props)

  const add = <Target>(target: Target, isPrivate = true) => <X extends string, T>(name: X, t: T) => {
    const typedStubValue = storage.add<T>(name, isPrivate)
    type t = typeof typedStubValue;
    // type Q = typeof Storage
    // даже если по факту свойство name добавляется как getter и setter в типах оно должно быть как просто поле со значением типа T 
    type K = { [k in X]: t } & Target
    // interface Result extends Q {
    //     [k in X]: T
    // }
    // return Storage as { A: { set: (value: T) => void, get: () => T } }
    return {
      //add: add(target as K),
      build: () => target as K,
      addPrivate: addPrivate(target as K),
      addPublic: addPublic(target as K)
    }
  }

  const addPrivate = <T>(target: T) => add(target)
  const addPublic = <T>(target: T) => add(target, false)
  
  return {
    //add: add(storage),
    addPrivate: addPrivate(storage),
    addPublic: addPublic(storage)
  }
  
}


export const _ = <unknown>null
export const typed = <T>() => <T>_

export default create
