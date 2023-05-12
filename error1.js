// try/catch로 미리 error를 잡는 예제
setInterval(() => {
    console.log('시작');
    try{
        throw new Error('break server');
    }catch(err) {
        console.error(err);
    }
}, 1000);
