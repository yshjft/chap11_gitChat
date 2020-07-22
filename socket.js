const SocketIO=require('socket.io');

module.exports=(server)=>{
  const io=SocketIO(server, {path : '/socket.io'});
  
  io.on('connection', (socket)=>{
    const req=socket.request; //socket.request 속성으로 요청 객체에 접근할 수 있다, socket.request.res로는 응답 객체에 접근할 수 있다
    const ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속', ip, socket.id, req.ip); //socket.id를 통해 socket 공유의 id를 가져올 수 있다.

    socket.on('disconnect', ()=>{
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.interval);
    });

    socket.on('error', (error)=>{
      console.error(error);
    });

    socket.on('reply', (data)=>{
      console.log(data);
    });

    socket.interval=setInterval(()=>{
      socket.emit('news', 'Hello Socket.IO'); //news라는 이벤트 이름으로 data를 전송한다.
    }, 3000);
  });
};