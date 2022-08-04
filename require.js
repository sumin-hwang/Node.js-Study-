console.log('require는 맨 위에 오지 않아도 괜찮음.');

module.exports('find this');

require('./var');

console.log('require.cache : ');
console.log(require.cache);
console.log('require.main : ');
console.log(require.main);
console.log(require.main === module);
console.log(require.main.filename);