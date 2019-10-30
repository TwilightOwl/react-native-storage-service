import * as Types from './types';
export default class Storage<T extends Types.StorageServiceConstructor> {
    private _user?;
    private initResolve?;
    private accessors;
    constructor(props: T);
    init(): Promise<string>;
    private setUser;
    login: (userId: string) => Promise<void>;
    logout: () => Promise<void>;
    getUser(): string | Promise<string>;
    retrieveCurrentUser: () => Promise<string>;
    _show: () => Promise<void>;
    private _key;
    private getUserPrefix;
    private _setItem;
    private _getItem;
    private _removeItem;
    setItem: (key: string, value: any) => Promise<void>;
    getItem: (key: string) => Promise<string>;
    removeItem: (key: string) => Promise<void>;
    getAllKeys: () => Promise<string[]>;
    multiGet: (keys: string[]) => Promise<[string, string][]>;
    multiRemove: (keys: string[]) => Promise<void>;
}
