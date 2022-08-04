const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside : {
        inside : {
            key : 'value',
        },
    },
};

console.time('전체 시간');
console.log('normal log');
console.log(string, number, boolean);
console.error('err msg');

console.table([{ name : '제로', birth : 1994}, {name : 'hero', birth : 1998}]);
console.table(obj);

console.dir(obj, {colors : false, depth : 2});
console.dir(obj, {colors : true, depth : 1});

console.time('시간 측정');
for(let i = 0; i < 10000; i ++){}
console.timeEnd('시간 측정');

function b(){
    console.trace('error 위치 추적');
}
function a() { 
    b ();
}

a();

console.timeEnd('전체 시간');


/** 출력 결과물
 * normal log
   abc 1 true
   err msg
┌─────────┬────────┬───────┐
│ (index) │  name  │ birth │
├─────────┼────────┼───────┤
│    0    │ '제로' │ 1994  │
│    1    │ 'hero' │ 1998  │
└─────────┴────────┴───────┘
┌─────────┬──────────────────┐
│ (index) │      inside      │
├─────────┼──────────────────┤
│ outside │ { key: 'value' } │
└─────────┴──────────────────┘
{ outside: { inside: { key: 'value' } } }
{ outside: { inside: [36m[Object][39m } }
시간 측정: 0.253ms
Trace: error 위치 추적
    at b (c:\Users\xxx\vscode_\NodeJS\Node.js-Study-\console.js:28:13)
    at a (c:\Users\xxx\vscode_\NodeJS\Node.js-Study-\console.js:31:5)
    at Object.<anonymous> (c:\Users\hsm95\vscode_\NodeJS\Node.js-Study-\console.js:34:1)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12)
    at internal/main/run_main_module.js:17:47
전체 시간: 8.597ms
 * 
 * 
 */
