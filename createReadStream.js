const fs = require('fs');

const readStream = fs.createReadStream('./NodeJS/Node.js-Study-/readme.txt', {highWaterMark : 16}); //16B씩 읽도록 설정, 기본값은 64KB씩 전송함. 
const data = [];

readStream.on('data', (chunk)=> {
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
})

readStream.on('end', ()=> {
    console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error', err);
}

)

// data : <Buffer ec a1 b0 ea b8 88 ec 94 a9 20 ec a1 b0 ea b8 88> 16
// data : <Buffer ec 94 a9 20 eb 82 98 eb 88 a0 ec 84 9c 20 ec a0> 16
// data : <Buffer 84 eb 8b ac eb 90 a8 2e 20 eb 82 98 eb 88 a0 ec> 16
// data : <Buffer a7 84 20 ec a1 b0 ea b0 81 ec 9d 84 20 63 68 75> 16
// data : <Buffer 6e 6b eb 9d bc ea b3 a0 20 ed 95 a8 2e 20> 14
// end : 조금씩 조금씩 나눠서 전달됨. 나눠진 조각을 chunk라고 함. 