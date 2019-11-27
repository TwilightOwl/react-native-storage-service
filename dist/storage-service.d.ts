import * as Types from './types';
export default class Storage<T extends Types.StorageServiceConstructor> {
    private _user?;
    private initResolve?;
    private accessors;
    private prefix;
    constructor(props: T);
    private init;
    private setUser;
    login: (userId: string) => Promise<void>;
    logout: () => Promise<void>;
    getUser(): string | Promise<string>;
    private retrieveCurrentUser;
    private _key;
    private getUserPrefix;
    private _setItem;
    private _getItem;
    private _removeItem;
    setItem: (key: string, value: any) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
    removeItem: (key: string) => Promise<void>;
    getAllKeys: () => Promise<string[]>;
    multiGet: (keys: string[]) => Promise<[string, string | null][]>;
    multiRemove: (keys: string[]) => Promise<void>;
}
