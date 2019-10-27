import Storage from './storage-service';
import { StorageServiceConstructor } from './types';
interface AddResult<I> {
    <PropertyName extends string, PropertyType, TargetWithAddedProperty = {
        [K in PropertyName]: PT<PropertyType>;
    } & I, R = T<TargetWithAddedProperty>>(propertyName: PropertyName, propertyTypedStubValue: PropertyType): R;
}
interface T<I> {
    build: () => I;
    addPrivate: AddResult<I>;
    addPublic: AddResult<I>;
}
interface PT<T> {
    set: (value: T) => Promise<void>;
    get: () => Promise<T>;
    remove: () => Promise<void>;
}
export declare const createStorage: (props: StorageServiceConstructor) => {
    addPrivate: <PropertyName extends string, PropertyType, TargetWithAddedProperty = { [K in PropertyName]: PT<PropertyType>; } & Storage<StorageServiceConstructor>, R = T<TargetWithAddedProperty>>(propertyName: PropertyName, propertyTypedStubValue: PropertyType) => R;
    addPublic: <PropertyName extends string, PropertyType, TargetWithAddedProperty = { [K in PropertyName]: PT<PropertyType>; } & Storage<StorageServiceConstructor>, R = T<TargetWithAddedProperty>>(propertyName: PropertyName, propertyTypedStubValue: PropertyType) => R;
};
export declare const _: unknown;
export declare const typed: <T_1>() => T_1;
export default createStorage;
