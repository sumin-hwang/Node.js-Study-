const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
    console.log(`Master Process ID : ${process.pid}`);
    //CPU 수만큼 워커 생산
    for(let i =0; i < numCPUs; i +=1){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal)=> {
        console.log(`${worker.process.pid}번 워커 종료`);
        console.log('code', code, 'signal', signal);
    });
}else{
    http.createServer((req,res)=> {
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.write('<h1>Hello World! </h1>');
        res.end('<p>Hello Cluster</p>');
        setTimeout(()=> {
            process.exit(1);
        }, 1000);
    }).listen(8086);

    console.log(`${process.pid}번 워커 실행`);
}