import Storage from './storage-service';
import { StorageServiceConstructor } from './types';

interface AddPropertyMethod<Target> {
  <PropertyName extends string, PropertyType, TargetWithAddedProperty = { [K in PropertyName]: PropertyAccessors<PropertyType> } & Target, Result = IntermediateConstructionObject<TargetWithAddedProperty>>(propertyName: PropertyName, propertyTypedStubValue: PropertyType): Result
}

interface IntermediateConstructionObject<ModifiedTarget> {
  build: () => ModifiedTarget,
  addPrivate: AddPropertyMethod<ModifiedTarget>,
  addPublic: AddPropertyMethod<ModifiedTarget>,
}

interface PropertyAccessors<T> {
  set: (value: T) => Promise<void>,
  get: () => Promise<T>,
  remove: () => Promise<void>
}

// Метод вынесен из класса Storage, чтобы в клиентском коде не было к нему доступа. Добавлять поля можно только на этапе создания!
const addProperty = <T, Target>(name: string, isPrivate = true, target: Target) => {
  type TargetWithPrivateMethods = Target & {
    _setItem: <T>(name: string, value: T, common?: boolean) => Promise<void>,
    _getItem: <T>(name: string, common?: boolean) => Promise<T>,
    _removeItem: (name: string, common?: boolean) => Promise<void>
  };
  const _target = target as TargetWithPrivateMethods;
  Object.defineProperty(
    target, name, {
      value: {
        set: (value: T): Promise<void> => _target._setItem(name, JSON.stringify(value), !isPrivate),
        get: async (): Promise<T> => JSON.parse(await _target._getItem(name, !isPrivate)),
        remove: (): Promise<void> => _target._removeItem(name, !isPrivate)
      } as PropertyAccessors<T>
    }
  );
}

export const createStorage = (props: StorageServiceConstructor) => {
  const storage = new Storage(props);

  const add = <Target>(target: Target, isPrivate: boolean = true) => (
    <PropertyName extends string, 
      PropertyType, 
      TargetWithAddedProperty = { [K in PropertyName]: PropertyAccessors<PropertyType> } & Target,
      Result = IntermediateConstructionObject<TargetWithAddedProperty>
    >(propertyName: PropertyName, propertyTypedStubValue: PropertyType): Result => {
      addProperty<PropertyType, Target>(propertyName, isPrivate, target)      
      return {
        build: () => target as unknown as TargetWithAddedProperty,
        addPrivate: addPrivate(target as unknown as TargetWithAddedProperty),
        addPublic: addPublic(target as unknown as TargetWithAddedProperty)
      } as unknown as Result
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
