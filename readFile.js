const fs = require('fs');

fs.readFile('./NodeJS/readme.txt', (err, data) => { // fs모듈 불러온 후 경로 지정, 경로는 콘솔 기준의 경로. 
    if(err){
        throw err;
    }
    console.log(data);
    console.log(data.toString());
})

// fs는 기본적으로 콜백형식의 모듈로, 실무에서 사용이 불편하므로 promise 로 변경해서 사용하는 것 권장함. 

fs.readFile('./NodeJs/readme.txt')
    .then((data) => {
        console.log(data);
        console.log(data.toString());
    })
    .catch((err)=> {
        console.error(err);
    });