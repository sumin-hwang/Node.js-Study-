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

