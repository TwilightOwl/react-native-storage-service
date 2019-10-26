export {}
/*
private add = <T>(name: string) => {
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
    )
  }
*/

const obj = { Old: null }
const storage = {} as { [K in string]: string }
const set = <T>(name: string, value: T) => {
    storage[name] = JSON.stringify(value)
}
const get = <T>(name: string) => {
    return JSON.parse(storage[name]) as T
}

// interface IItem<F, K extends string> {
//   [k: K]: F
// }
// interface IItems extends IItem {}
// 
// 
// type TItem1<F, K extends string> = { [k in K]: F }
// type TItem2<F, K extends string> = { [k: K]: F }
// type TItems1 = TItem2 & TItems1


const create = () => {
  // Create storage
  const Storage = { anyPreviousMethod: 3 };

  //const add = <T>() => <X extends string>(name: X) => {
  const add_ORIGINAL_WORKING = <X extends string, T>(name: X, t: T) => // <T>() => 
  {
      Object.defineProperty(
          obj, 
          name, 
          {
            get: (): T => {
              return get<T>(name)
            },
            set: (value: T): void => {
              set<T>(name, value)
            }
          }
      )
      type Q = typeof obj
      // даже если по факту свойство name добавляется как getter и setter в типах оно должно быть как просто поле со значением типа T 
      type K = { [k in X]: T } & Q
      // interface Result extends Q {
      //     [k in X]: T
      // }
      // return obj as { A: { set: (value: T) => void, get: () => T } }
      return obj as K
  }

  const add = <Target>(target: Target) => <X extends string, T>(name: X, t: T) => // <T>() => 
  {
      Object.defineProperty(
        target, 
        name, 
        {
          get: (): T => {
            return get<T>(name)
          },
          set: (value: T): void => {
            set<T>(name, value)
          }
        }
      )
      // type Q = typeof Storage
      // даже если по факту свойство name добавляется как getter и setter в типах оно должно быть как просто поле со значением типа T 
      type K = { [k in X]: T } & Target
      // interface Result extends Q {
      //     [k in X]: T
      // }
      // return Storage as { A: { set: (value: T) => void, get: () => T } }
      return {
        add: add(target as K),
        build: () => target as K
      }
  }

  return {
    add: add(Storage)
  }

  
}

const typed = <T>() => null as unknown as T

const _ = <unknown>null

const i1 = create()
const i2 = i1.add('a', _ as boolean)
const i3 = i2.add('b', _ as number)
const i4 = i3.build()
i4.a = false

create(/* accessors */)
  //.addPrivate('firtsPrivateField', _ as { s: string, n: number, b: boolean })
  //.addPublic('firtsPublicField', _ as { s: string, n: number, b: boolean })
  .add('first', _ as { s: string, n: number, b: boolean })
  .add('second', typed<{ s: string, n: number, b: boolean }>())
  .add('third', <{ s: string, n: number, b: boolean }>_)
  .build().

//  .add('a', _ as boolean)
  //.add('b', _ as number)
// ins.add('a', CC._ as boolean)
// ins.add('b', CC._ as number)
ins.a
ins.b




const Y = add('a', _ as { f: number })
Y.a.f

const O = add('A')<number>();
O.A = 3
O.A

const A = add<{ a: boolean }>()('A');
A.A = 3;
A.A = 'a'
A.A = { a: true }
const r = A.A

//////// getter и setter в итоге выглядят в типе объекта как одно свойство с одним типом

class Cl {
    a = 10
    get g() { return 1 }
    set g(x: number) {}
}

interface I extends Cl {}
const t: I = new Cl()
t.a
t.g


////////


const f1 = <X = number, T>(x: X) => {

}

f1(1)
f1<, number>(9)