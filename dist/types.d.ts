export interface StorageAccessors {
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
    removeItem: (key: string) => Promise<void>;
    getAllKeys: () => Promise<string[]>;
    multiSet?: (keyValuePairs: [string, string][]) => Promise<void>;
    multiGet?: (keys: string[]) => Promise<[string, string | null][]>;
    multiRemove?: (keys: string[]) => Promise<void>;
}
export interface StorageServiceConstructor {
    storageAccessors: StorageAccessors;
    storagePrefix?: string;
}
export declare enum Constants {
    StoragePrefix = "~",
    CurrentUserKey = "storage-service-current-user:",
    CommonUser = "@"
}
