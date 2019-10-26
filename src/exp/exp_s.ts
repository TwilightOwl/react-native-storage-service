export {}


//const f = <A extends T[], T extends string>(arg: A) => {
const f = <A extends string>(arg: A[]) => {
    // type B = A['pub'] extends (infer S)[] ? S : never;
    // type W = A['pub']    
    type R = {
        [K in A]: number
    }
    return {} as R
}

const ins = f([ 'a', 'b' ]); // as const !!!

//   const p1 = { pub: ['a', 'b'] } as const
//   const p2 = { pub: ['a', 'b'] as const } 
//   const p3 = { pub: ['a' as const, 'b' as const] }

ins.a
ins.b
ins.x
ins.