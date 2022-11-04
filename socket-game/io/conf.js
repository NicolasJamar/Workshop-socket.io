const socketio = require('socket.io');

module.exports = function (server) {
  // io server
  const io = socketio(server);

  const players = {};

  io.on("connection", (socket) => {
    console.log("Players:", players)
    console.log("Player connected: ", socket.id);
    players[socket.id] = {
      x: 0,
      y: 0,
      size: 20,
      speed: 7,
      c: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
    };

    socket.on("disconnect", () => {
      delete players[socket.id]
    });

    socket.on('move left',  () => { if(players[socket.id].x >= 5) players[socket.id].x -= players[socket.id].speed; });
    socket.on('move up',  () => { if(players[socket.id].y >= 5) players[socket.id].y -= players[socket.id].speed; });
    socket.on('move right',  () => { if(players[socket.id].x < 620) players[socket.id].x += players[socket.id].speed; });
    socket.on('move down',  () => { if(players[socket.id].y < 458) players[socket.id].y += players[socket.id].speed; });
  });

  function update() {
    io.volatile.emit("players list", Object.values(players))
  }

  setInterval(update, 1000 / 60)

};
