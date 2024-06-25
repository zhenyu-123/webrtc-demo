const { Server } = require("socket.io");

const io = new Server({ cors: {
    origin: "*", // 允许任何来源
    methods: ["GET", "POST"] // 允许的 HTTP 请求类型
  } });

io.on("connection", (socket) => {
  // ...
  console.log('连接成功');
});
io.listen(3000);