export interface StorageAccessors {
  setItem: (key: string, value: string) => Promise<void>,
  getItem: (key: string) => Promise<string>,
  removeItem: (key: string) => Promise<void>,
  getAllKeys: () => Promise<string[]>,
  multiSet?: (keyValuePairs: [string, string][]) => Promise<void>,
  multiGet?: (keys: string[]) => Promise<[string, string][]>,
  multiRemove?: (keys: string[]) => Promise<void>,
}

export interface Items {
  publicItems?: string[],
  privateItems?: string[]
}


export interface StorageServiceConstructor /*extends Items*/ {
  storageAccessors: StorageAccessors
}

// const l: [string, number, 'x'][] = [['a',0,'x'], ['b',2,'x']]