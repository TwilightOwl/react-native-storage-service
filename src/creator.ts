import Storage from './storage-service';
import { StorageServiceConstructor } from './types';

// Метод вынесен из класса Storage, чтобы в клиентском коде не было к нему доступа. Добавлять поля можно только на этапе создания!
const addProperty = <T, Target>(name: string, isPrivate = true, target: Target) => {
  type TargetWithPrivateMethods = Target & {
    _setPrivateItem: <T>(name: string) => (value: T) => Promise<void>,
    _setPublicItem: <T>(name: string) => (value: T) => Promise<void>,
    _getPrivateItem: <T>(name: string) => () => Promise<T>,
    _getPublicItem: <T>(name: string) => () => Promise<T>,
  };
  const _target = target as TargetWithPrivateMethods;
  Object.defineProperty(
    target, name, {
      value: {
        set: (value: T): Promise<void> => isPrivate
          ? _target._setPrivateItem<T>(name)(value)
          : _target._setPublicItem<T>(name)(value)
        ,
        get: (): Promise<T> => isPrivate
          ? _target._getPrivateItem<T>(name)()
          : _target._getPublicItem<T>(name)()
        ,
        remove: () => { throw 'TODO' }
      }
    }
  );
  return null as unknown as {
    set: (value: T) => Promise<void>,
    get: () => Promise<T>,
    remove: () => Promise<void>
  }
}

export const createStorage = (props: StorageServiceConstructor) => {
  const storage = new Storage(props)
  const add = <Target>(target: Target, isPrivate = true) => (
    <PropertyName extends string, PropertyType>(propertyName: PropertyName, propertyTypedStubValue: PropertyType) => {
      const typedStubValue = addProperty<PropertyType, Target>(propertyName, isPrivate, target)
      type AddedPropertyType = typeof typedStubValue
      type TargetWithAddedProperty = { [K in PropertyName]: AddedPropertyType } & Target
      return {
        build: () => target as TargetWithAddedProperty,
        addPrivate: addPrivate(target as TargetWithAddedProperty),
        addPublic: addPublic(target as TargetWithAddedProperty)
      }
    }
  )

  const addPrivate = <PropertyType>(target: PropertyType) => add(target)
  const addPublic = <PropertyType>(target: PropertyType) => add(target, false)
  
  return {
    addPrivate: addPrivate(storage),
    addPublic: addPublic(storage)
  }
  
}

// Это нужно для передачи типа добовляемого свойства, т.к. на данный момент typescript не поддерживает частичный вывод аргументов типа
// https://github.com/Microsoft/TypeScript/pull/26349
// https://github.com/microsoft/TypeScript/issues/26242
export const _ = <unknown>null
export const typed = <T>() => <T>_

export default createStorage
