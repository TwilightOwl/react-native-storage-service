export interface StorageAccessors {
  setItem: (key: string, value: string) => Promise<void>,
  getItem: (key: string) => Promise<string>,
  removeItem: (key: string) => Promise<void>,
  getAllKeys: () => Promise<string[]>,
  multiSet?: (keyValuePairs: [string, string][]) => Promise<void>,
  multiGet?: (keys: string[]) => Promise<[string, string][]>,
  multiRemove?: (keys: string[]) => Promise<void>,
}

export interface StorageServiceConstructor {
  storageAccessors: StorageAccessors
}

export enum Constants {
  StoragePrefix = 'storage-service',
  CurrentUserKey = 'storage-service-current-user:',
  CommonUser = 'common',
}