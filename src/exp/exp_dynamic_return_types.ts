export {}

interface Cons {
    pub: string[]
}

interface Node<T> {

}


//const f = <T extends string, A extends { pub: T[] } >(arg: A) => {
const create = <PublicItems extends string, PrivateItems extends string>(
    { public: _pb = [], private: _pr = [] }: { readonly public: readonly PublicItems[], readonly private: readonly PrivateItems[] }
) => {
    //type B = A['pub'] extends (infer S)[] ? S : string;

    //type PR = PrivateItems extends string ? PrivateItems : []
    
    type R1 = { [K in PublicItems]: number }
    type R2 = { [K in PrivateItems]: number }
    return {} as R1 & R2
}

// обертка позволяющая подставлять пустые массивы вместо отсутствующих параметров. при отсутствии в оригинальной create
// параметров public или private (т.е. если их сделать опциональными) ломаются типы!!!
// Здесь также ломаются типы если нет обоих параметров public и private, но это нужно в коде в рантайме выкидывать исключение - 
//  должен быть хатя бы один параметр с хотя бы одним ключем
const createWithOptional = <CommonItemType extends string>(
    //{ public: _pb, private: _pr  }: { public?: readonly CommonItemType[], private?: readonly CommonItemType[] }
//) => f({ public: _pb || [], private: _pr || [] })
    arg: { public?: readonly CommonItemType[], private?: readonly CommonItemType[] }
) => create({ public: arg.public || [], private: arg.private || [] })

const ins = createWithOptional(
    //{ pub: ['a', 'b'] } as const
    //{ pub: ['a', 'b'] as const } 
    //{ pub: ['a' as const, 'b' as const] }
    { 
        public: ['a', 'b'], 
        private: ['b', 'c']
    }
); // as const !!!

//   const p1 = { pub: ['a', 'b'] } as const
//   const p2 = { pub: ['a', 'b'] as const } 
//   const p3 = { pub: ['a' as const, 'b' as const] }

ins.a
ins.b
ins.c
ins.other


/*

const f = <P>(x: P) => {
    type A = P extends (infer T)[] ? T : never;
    return [] as T
}

f<number>([1,2,3])

//type Foo<T> = 

const create2 = <P>() => <T extends string>(args: T[]) => {
    // return {} as P
    //return {} as { [k in T]: typeof args[number] }
    return {} as { [k in T]: T }
}

const str = 'str';
const Colors = {
    cherry: 'a',
  } 


  
  type size = "Small" | "Medium" | "Large";
type color = "Red" | "Green" | "Blue";

const options: (size + color)[] = [];

  type TT = 'xx'.concat('4')
  const tt: TT = '4' & '';

const t0 = 'x';
const t1 = String('x').valueOf();
const t2 = String('x'+'x').valueOf() as ()
const r = Symbol(`a${4}`)
interface I {
    [t]: number
}
const i: I = {
    []: 2
}


const ins2 = create2<{ seta: number}>()(['a', 'b', 'c'])
ins2.a
ins2.x
ins2.seta

const create = <P, T extends string>(args: A extends string[] ? ) => {

    const result = {
        [args[0]]: 0
    }

    const obj = {
        [`set${args[0]}`]: 1
    }

    return result
}

const instance = create(['a', 'b', 'c'])

instance.a
instance.b
instance.c
instance.seta
instance.x

*/