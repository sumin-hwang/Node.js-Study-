const SocketIO = require('socket.io');

module.exports = (server, app)=> {
    const io = SocketIO(server, { path : '/socket.io '});
    app.set('io', io);
    const room = io.of('/room');
    const chat = io.of('/chat');

    room.on('connection', (socket) => {
        console.log('room 네임스페이스에 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection', (socket) => {
        console.log('chat 네임 스페이스에 접속');
        const req = socket.request;
        const { headers : { referer }} = req;
        const roomId = referer
            .split('/')[referer.split('/').length - 1]
            .replace(/\?.+/, '');
        socket.join(roomId);

        socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속 해제');
            socket.leave(roomId);
        });

    });

    // io.on('connection', (socket) => {
    //     const req = socket.request;
    //     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //     console.log('새로운 클라이언트 접속!', ip, socket.id, req.ip);

    //     socket.on('disconnect', () => {
    //         console.log('클라이언트 접속 해제 ', ip, socket.id);
    //         clearInterval(socket.interval);
    //     });
    //     socket.on('error', (error) => {
    //         console.error(error);
    //     });
    //     socket.on('reply', (data) => {
    //         console.log(data);
    //     });
    //     socket.interval = setInterval(() => {
    //         socket.emit('news', 'Hello Socke IO');
    //     },   3000);
    // })
}



// module.exports = (server) => {
//     const wss = new WebSocket.Server({server});

//     wss.on('connection', (ws, req) => {
//         const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //client IP 가져오는 것 
//         console.log('new client', ip);

//         ws.on('message', (message) => { //클라이언트로부터 메시지 수신
//             console.log(message.toString());
//         });

//         ws.on('error', (error) => { // 에러
//             console.error(error);
//         });

//        ws.on('close', () => {       // 연결 종료
//             console.log('클라이언트 접속 해제', ip);
//             clearInterval(ws.interval);
//         });

//         ws.interval = setInterval(()=> { // 3초마다 클라이언트로 메시지 전송
//             if(ws.readyState === ws.OPEN){
//                 ws.send('server send message to client');
//             }
//         }, 3000);
//     });
// };