import { aiWithAsyncInit, aiInit, aiMethod } from 'asynchronous-tools';
import * as Types from './types';

@aiWithAsyncInit
export default class Storage<T extends Types.StorageServiceConstructor> {
  private _user?: string;
  private initResolve?: Function;
  private accessors: Types.StorageAccessors;

  constructor(props: T) {
    const { storageAccessors } = props;
    this.accessors = storageAccessors;

    if (!this.accessors.multiSet) {
      this.accessors.multiSet = keyValuePairs => Promise.all(keyValuePairs.map(([key, value]) => this.accessors.setItem(key, value))) as Promise<any>
    }
    if (!this.accessors.multiGet) {
      this.accessors.multiGet = keys => Promise.all(keys.map(async key => [key, await this.accessors.getItem(key)] as [string, string]))
    }
    if (!this.accessors.multiRemove) {
      this.accessors.multiRemove = keys => Promise.all(keys.map(key => this.accessors.removeItem(key))) as Promise<any>
    }

    this.init();
  }

  // Плохая идея, т.к. login можем вообще не вызывать и подефолту должны проинициализироваться с общим пользователем и под ним и работать
  // @aiInit
  // public async newInit() {
  //   return await this.retrieveCurrentUser() === undefined
  //     ? new Promise(resolve => this.initResolve = resolve)
  //     : undefined
  // }

  @aiInit
  public init() {
    return this.retrieveCurrentUser();
  }

  @aiMethod
  private async setUser(id: string): Promise<void> {
    this._user = id;
    await this.accessors.setItem(Types.Constants.CurrentUserKey, id);
    // if (this.initResolve) {
    //   this.initResolve();
    //   this.initResolve = undefined;
    // }
  };

  public login = async (userId: string) => this.setUser(userId);

  public logout = async () => this.setUser(Types.Constants.CommonUser);

  @aiMethod
  public getUser() {
    return this._user === undefined ? this.retrieveCurrentUser() : this._user;
  }

  public retrieveCurrentUser = async (): Promise<string> => {
    const result = (this._user = await this.accessors.getItem(Types.Constants.CurrentUserKey) || Types.Constants.CommonUser);
    return result
  };

  public _show =
    /**
     * @deprecated
     */
    async () => {
      const keys = await this.accessors.getAllKeys();
      await Promise.all(
        keys.sort().map(async key =>
          /* tslint:disable-next-line:no-console */
          console.log(
            '   --- storage ---   ',
            key,
            await this.accessors.getItem(key)
          )
        )
      );
    };


  // =============== Storage manipulations ================

  private _key = async (
    key: string | string[],
    user?: string
  ): Promise<string | string[]> => {
    const prefix = this.getUserPrefix(user === undefined ? await this.getUser() : user);
    const resultKeys = ([] as string[]).concat(key).map(key => `${prefix}${key}`);
    return key instanceof Array ? resultKeys : resultKeys[0];
  };

  private getUserPrefix = (userId: string) => `${Types.Constants.StoragePrefix}-user-${userId}:`;

  private _setItem = async (key: string, value: any, common = false) => (
    this.accessors.setItem(
      (await this._key(key, common ? Types.Constants.CommonUser : undefined)) as string, 
      value
    )
  )

  private _getItem = async (key: string, common = false) => (
    this.accessors.getItem((await this._key(key, common ? Types.Constants.CommonUser : undefined)) as string)
  )

  private _removeItem = async (key: string, common = false) => (
    this.accessors.removeItem((await this._key(key, common ? Types.Constants.CommonUser : undefined)) as string)
  )


  // ========= AsyncStorage API for current user: =========

  public setItem = (key: string, value: any) => this._setItem(key, value)
  
  public getItem = (key: string) => this._getItem(key)
  
  public removeItem = (key: string) => this._removeItem(key)
  
  public getAllKeys = async (): Promise<string[]> => {
    const prefix = this.getUserPrefix(await this.getUser());
    const getPublicKey = (key: string): (string | undefined) =>
      key.substr(0, prefix.length) === prefix
        ? key.substr(prefix.length)
        : undefined;
    return this.accessors.getAllKeys().then(keys =>
      keys.reduce((acc, key) => {
        const publicKey = getPublicKey(key);
        return acc.concat(publicKey || []);
      }, [] as string[])
    );
  };

  public multiGet = async (keys: string[]) => this.accessors.multiGet!((await this._key(keys)) as string[])

  public multiRemove = async (keys: string[]) => this.accessors.multiRemove!((await this._key(keys)) as string[])
  
}