const {
    Worker, isMainThread, parentPort,
} = require('worker_threads');

if(isMainThread){
    const worker = new Worker(__filename); // 현재파일을 워커스레드에서 실행, 워커 생성함
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker exit'));
    worker.postMessage('ping'); //워커에 데이터를 보냄
}else{
    //워커 일 때
    parentPort.on('message', (value) => { // 이벤트 리스터, 부모로부터 메시지를 받음
        console.log('from parent', value);
        parentPort.postMessage('pong'); // 부모에게 메시지 보냄 (postMessage가 메시지 보내는 함수)
        parentPort.close(); // 부모와의 연결이 종료됨. 종료시 worker.on('exit') 실행됨
    });
}