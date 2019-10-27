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
    console.log('   setUser', this._user)
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
    console.log('getUser', this._user)
    return this._user === undefined ? this.retrieveCurrentUser() : this._user;
  }

  public retrieveCurrentUser = async (): Promise<string> => {
    console.log('retrieveCurrentUser begin')
    const result = (this._user = await this.accessors.getItem(Types.Constants.CurrentUserKey) || Types.Constants.CommonUser);
    console.log('retrieveCurrentUser end', result)
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

  // ========= AsyncStorage API for current user: =========

  public removeItem = async (key: string) => this.accessors.removeItem((await this._key(key)) as string)

  public getItem = async (key: string) => this.accessors.getItem((await this._key(key)) as string)

  public setItem = async (key: string, value: any) => this.accessors.setItem((await this._key(key)) as string, value)
  
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

  private _key = async (
    key: string | string[],
    user?: string
  ): Promise<string | string[]> => {
    const prefix = this.getUserPrefix(user === undefined ? await this.getUser() : user);
    const resultKeys = ([] as string[]).concat(key).map(key => `${prefix}${key}`);
    return key instanceof Array ? resultKeys : resultKeys[0];
  };

  private _setPrivateItem = <T>(key: string) => async (
    value: T
  ): Promise<void> => {
    // У общего пользователя тоже могут быть приватные поля и они не доступны залогиненному пользователю. Т.к. по бизнес логике вполне могут быть такие ситуации
    // По сути common это такой же пользователь как и другие, но другие пользователи могут иметь доступ к его публичным полям.
    // Все публичные поля - это поля пользователя common, а приватные поля у каждого пользователя свои
    await this.accessors.setItem(
      (await this._key(key)) as string,
      JSON.stringify(value)
    );
  };

  private _getPrivateItem = <T>(key: string) => async (): Promise<T> => {
    // У общего пользователя тоже могут быть приватные поля и они не доступны залогиненному пользователю. Т.к. по бизнес логике вполне могут быть такие ситуации
    // По сути common это такой же пользователь как и другие, но другие пользователи могут иметь доступ к его публичным полям.
    // Все публичные поля - это поля пользователя common, а приватные поля у каждого пользователя свои
    return JSON.parse(
      await this.accessors.getItem((await this._key(key)) as string)
    ) as T;
  };

  private _setPublicItem = <T>(key: string) => async (
    value: T
  ): Promise<any> => {
    return this.accessors.setItem(
      (await this._key(key, Types.Constants.CommonUser) as string),
      JSON.stringify(value)
    );
  };

  private _getPublicItem = <T>(key: string) => async (): Promise<T> => {
    return JSON.parse(
      await this.accessors.getItem(
        await this._key(key, Types.Constants.CommonUser) as string
      )
    ) as T
  };

  private getUserPrefix = (userId: string) => `${Types.Constants.StoragePrefix}-user-${userId}:`;
  
}