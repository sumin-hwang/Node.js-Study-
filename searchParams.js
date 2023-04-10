const { URL } = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

console.log('searchParmas: ', myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category'));
console.log('searchParmas.get():', myURL.searchParams.get('limit'));
console.log('searchParams.has():', myURL.searchParams.has('page')); //가지고 있는지 여부

console.log('searchParams.keys()', myURL.searchParams.keys());
console.log('searchParams.values()', myURL.searchParams.values());

myURL.searchParams.append('filter', 'es3');