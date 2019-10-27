import Storage from './storage-service';
import { StorageServiceConstructor } from './types';
interface AddPropertyMethod<Target> {
    <PropertyName extends string, PropertyType, TargetWithAddedProperty = {
        [K in PropertyName]: PropertyAccessors<PropertyType>;
    } & Target, Result = IntermediateConstructionObject<TargetWithAddedProperty>>(propertyName: PropertyName, propertyTypedStubValue: PropertyType): Result;
}
interface IntermediateConstructionObject<ModifiedTarget> {
    build: () => ModifiedTarget;
    addPrivate: AddPropertyMethod<ModifiedTarget>;
    addPublic: AddPropertyMethod<ModifiedTarget>;
}
interface PropertyAccessors<T> {
    set: (value: T) => Promise<void>;
    get: () => Promise<T>;
    remove: () => Promise<void>;
}
export declare const createStorage: (props: StorageServiceConstructor) => {
    addPrivate: <PropertyName extends string, PropertyType, TargetWithAddedProperty = { [K in PropertyName]: PropertyAccessors<PropertyType>; } & Storage<StorageServiceConstructor>, Result = IntermediateConstructionObject<TargetWithAddedProperty>>(propertyName: PropertyName, propertyTypedStubValue: PropertyType) => Result;
    addPublic: <PropertyName extends string, PropertyType, TargetWithAddedProperty = { [K in PropertyName]: PropertyAccessors<PropertyType>; } & Storage<StorageServiceConstructor>, Result = IntermediateConstructionObject<TargetWithAddedProperty>>(propertyName: PropertyName, propertyTypedStubValue: PropertyType) => Result;
};
export declare const _: unknown;
export declare const typed: <T>() => T;
export default createStorage;
