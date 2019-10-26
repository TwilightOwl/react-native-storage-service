/**
 * @author Denis Zhelnerovich
 * @version 1.0
 */

import { aiWithAsyncInit, aiInit, aiMethod } from 'asynchronous-tools';

import * as Types from './types';

const STORAGE_PREFIX = 'storage-service';
const CURRENT_USER_KEY = STORAGE_PREFIX + '-current-user:';
const COMMON_DATA_KEY = 'common';

    

/*

function functionGenerator<T extends string, U = { [K in T]?: string }> (keys: T[]): (p: U) => U {
  return (p: U) => p
}

const testFun = functionGenerator(['one', 'two'])

const r1 = testFun({one: '1'}) // no error
const r2 = testFun({two: '2'}) // no error
//testFun({three: '3'}) // no error
console.log(r1,r2)
debugger;


const obj = {one: 1, two: 2}
type Prop = {
  [k in keyof typeof obj]?: string;
}
function test(p: Prop) {  
  return p;
}

test({three: '3'}) // throws an error


interface Args {
  private: string[],
  public: string[]
}

const pre = { private: ['a1', 'a2'], public: ['b1', 'b2']};
const priv = ['a1', 'a2'];

// <T extends string, U = { [K in T]?: string }> (keys: T[])
const create = <T1 extends string, U = { [K in T1]?: string }> (args: { private: T1[] }) => {
  // { private: ['a1', 'a2'], public: ['b1', 'b2']}
  // type T = {
  //   [k in keyof typeof pre]: number;
  //   //[k in priv]: number;
  // }

  const pr: T1[] = args.private;
  const asLiterals = <T extends string>(arr: T[]): T[] => arr;
  const setpr = pr.map((key: T1) => `set${key}`);
  

const rr = `set${4}`;

  type tsad = typeof rr
  
  type TT = typeof setpr[number]
  
  const acss = pr.reduce((acc, key) => ({ ...acc, 
    [`set${key}`]: 1, 
    [`get${key}`]: 2
  }), {} as { [k in T1]: number })

  const keys = asLiterals(Object.keys(acss))
  const tt = typeof keys 

  const P = asLiterals(pr)
  type D = typeof keys[number]
  type D2 = typeof P[number]
  
  // const keys = asLiterals(['a', 'b', 'c']);
  

  type Acs = ['get', 'set']
  const a = '1'
  type A = [typeof a]
  
  const ar = ['ar'];
  type Tar = typeof ar;
  const sar = [`s${ar[0]}`]
  type Tsar = typeof sar;
  const tar: Tar = ['as']

  type aaa = keyof typeof ar;


  type t = typeof acss

  type R = {
    //[k in keyof U]: number
    //[k in keyof typeof keys]: number
    //[k in keyof typeof acss]: number
    [k in T1]: number
    //[k in typeof setpr[number]]: number
    //[k in ('a1'|'a2')]: number
  }

  const result: R = args.private.reduce((acc, key) => ({ ...acc, [key]: 1}), {} as R)
  return result
}

const ins1 = create({ private: [`a1`, `a2`] });
ins1.a1;
ins1.seta1;
ins1.a3;

const s = `s${4}`
const s2 = `s2`

interface II {
  [s]: 'as'
}


class S {
  constructor(args: string[]): S {
    args.forEach((key, index) => this[key] = index)
  }
}

interface IS extends S {}

const inst = new S(['a', 'b'])

type t = typeof inst

inst.a

*/

@aiWithAsyncInit
export class Storage<T extends Types.StorageServiceConstructor> {
  private _user?: string;
  private initResolve?: Function;
  private accessors: Types.StorageAccessors;

  constructor(props: T) {

    const { storageAccessors, ...items } = props;

    // TODO: Во входных параметрах теперь нету publicItems и privateItems, сделать старое добавление методов в функции add (нужно ли?)
    const { publicItems = [], privateItems = [] } = items;

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

    // This code generates public setters and getters for items
    privateItems.forEach(item => {
      //this.add(item);
      ['set', 'get'].forEach(
        method => {
          this[`${method}${item}`] = this[`_${method}PrivateItem`](item)
        }
      );
    });

    publicItems.forEach(item => {
      // this.add(item);
      ['set', 'get'].forEach(
        method => {
          this[`${method}${item}`] = (...args) => this[`_${method}PublicItem`](item)(...args, COMMON_DATA_KEY)
        }
      );
    });

    this.init();
    //global.S = this;
    
    //this.newInit();
  }

  public add = <T>(name: string, isPrivate = true) => {
    // Нельзя работать с асинхронными геттерами и сеттерами: 
    //  - нельзя дождаться выполнения асинхронного сеттера из вызывающего кода
    //  - проблематично описывать типы
    //  - метод для удаления придется делать отдельно от геттера/сеттера
    //  - неочевидное использование
    /*
    Object.defineProperty(
      this, 
      name, 
      {
        get: (): Promise<T> => {
          return this._getPrivateItem<T>(name)()
        },
        set: (value: T): Promise<void> => {
          return this._setPrivateItem<T>(name)(value)
        }
      }
    )*/
    Object.defineProperty(
      this, name, {
        value: {
          set: (value: T): Promise<void> => isPrivate
            ? this._setPrivateItem<T>(name)(value)
            : this._setPublicItem<T>(name)(value)
          ,
          get: (): Promise<T> => isPrivate
            ? this._getPrivateItem<T>(name)()
            : this._getPublicItem<T>(name)()
          ,
          remove: () => { throw 'TODO' }
        }
      }
    );
    return null as unknown as {
      set: (value: T) => Promise<void>,
      get: () => Promise<T>,
      remove: () => Promise<void>
    }
    /*
    this[name] = {
      set: (value: T): Promise<void> => {
        return this._setPrivateItem<T>(name)(value)
      },
      get: (): Promise<T> => {
        return this._getPrivateItem<T>(name)()
      },
      remove: () => { throw 'TODO' }
    }*/
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
    await this.accessors.setItem(CURRENT_USER_KEY, id);
    // if (this.initResolve) {
    //   this.initResolve();
    //   this.initResolve = undefined;
    // }
  };

  public login = async (userId: string) => this.setUser(userId);

  public logout = async () => this.setUser(COMMON_DATA_KEY);

  @aiMethod
  public getUser() {
    console.log('getUser', this._user)
    return this._user === undefined ? this.retrieveCurrentUser() : this._user;
  }

  public retrieveCurrentUser = async (): Promise<string> => {
    console.log('retrieveCurrentUser begin')
    const result = (this._user = await this.accessors.getItem(CURRENT_USER_KEY) || COMMON_DATA_KEY);
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
    console.log('prefix', prefix)
    const getPublicKey = (key: string): string =>
      key.substr(0, prefix.length) === prefix
        ? key.substr(prefix.length)
        : undefined;
    return this.accessors.getAllKeys().then(keys =>
      keys.reduce((acc, key) => {
        const publicKey = getPublicKey(key);
        return acc.concat(publicKey || []);
      }, [])
    );
  };

  public multiGet = async (keys: string[]) => this.accessors.multiGet!((await this._key(keys)) as string[])

  public multiRemove = async (keys: string[]) => this.accessors.multiRemove!((await this._key(keys)) as string[])

  private _key = async (
    key: string | string[],
    user?: string
  ): Promise<string | string[]> => {
    const prefix = this.getUserPrefix(user === undefined ? await this.getUser() : user);
    const resultKeys = [].concat(key).map(key => `${prefix}${key}`);
    return key instanceof Array ? resultKeys : resultKeys[0];
  };

  private _setPrivateItem = <T>(key: string) => async (
    value: T
  ): Promise<void> => {
    // У общего пользователя тоже могут быть приватные поля и они не доступны залогиненному пользователю. Т.к. по бизнес логике вполне могут быть такие ситуации
    // По сути common это такой же пользователь как и другие, но другие пользователи могут иметь доступ к его публичным полям.
    // Все публичные поля - это поля пользователя common, а приватные поля у каждого пользователя свои
    //TODO: если выбрасывать исключение, то в http сервисе когда не авторизованный все равно пытется получить доступ к deviceId в сторадже чтобы засунуть в хэдер
    //const currentUser = await this.getUser();
    //if (currentUser === COMMON_DATA_KEY) throw `Access to private field ${key}`
    await this.accessors.setItem(
      (await this._key(key)) as string,
      JSON.stringify(value)
    );
  };

  private _getPrivateItem = <T>(key: string) => async (): Promise<T> => {
    // У общего пользователя тоже могут быть приватные поля и они не доступны залогиненному пользователю. Т.к. по бизнес логике вполне могут быть такие ситуации
    // По сути common это такой же пользователь как и другие, но другие пользователи могут иметь доступ к его публичным полям.
    // Все публичные поля - это поля пользователя common, а приватные поля у каждого пользователя свои
    //TODO: если выбрасывать исключение, то в http сервисе когда не авторизованный все равно пытется получить доступ к deviceId в сторадже чтобы засунуть в хэдер
    //const currentUser = await this.getUser();
    //if (currentUser === COMMON_DATA_KEY) throw `Access to private field ${key}`
    return JSON.parse(
      await this.accessors.getItem((await this._key(key)) as string)
    ) as T;
  };

  private _setPublicItem = <T>(key: string) => async (
    value: T
  ): Promise<any> => {
    return this.accessors.setItem(
      (await this._key(key, COMMON_DATA_KEY) as string),
      JSON.stringify(value)
    );
  };

  private _getPublicItem = <T>(key: string) => async (): Promise<T> => {
    return JSON.parse(
      await this.accessors.getItem(
        await this._key(key, COMMON_DATA_KEY) as string
      )
    ) as T
  };

  private getUserPrefix = (userId: string) => `${STORAGE_PREFIX}-user-${userId}:`;
  
}

export default Storage;

// new Storage({
//   private: ['a', 'b']
// })

// export default new Storage({
//   privateItems: [
//     'VisitStatuses',
//     'VisitGeocodes',
//     'DoctorId',
//     'DeviceId',
//     'HospitalId',
//     'LastRequestDate',
//     'InspectionDrafts',
//     'TextNote',
//     'AudioNotes'
//   ],
//   publicItems: [
//     'Address'
//   ]
// });
