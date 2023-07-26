const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({server});

    wss.on('connection', (ws, req) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //client IP 가져오는 것 
        console.log('new client', ip);

        ws.on('message', (message) => { //클라이언트로부터 메시지 수신
            console.log(message.toString());
        });

        ws.on('error', (error) => { // 에러
            console.error(error);
        });

       ws.on('close', () => {       // 연결 종료
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);
        });

        ws.interval = setInterval(()=> { // 3초마다 클라이언트로 메시지 전송
            if(ws.readyState === ws.OPEN){
                ws.send('server send message to client');
            }
        }, 3000);
    });
};