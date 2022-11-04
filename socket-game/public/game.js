const socket = io();

// const player = {
//   x: 0,
//   y: 0,
//   size: 20,
//   speed: 7
// };

let players = [];

socket.on("players list", (list) => {
  players = list;
})

const ctx = canvas.getContext("2d");

function drawPlayer() {
  players.forEach(({ x, y, size, c }) => {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = c;
    ctx.fill();
  })
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  movePlayer()
  requestAnimationFrame(update)
}

requestAnimationFrame(update);

const keyboard = {};

window.onkeydown = (e) => {
  keyboard[e.key] = true;
}

window.onkeyup = (e) => {
  delete keyboard[e.key];
}

function movePlayer() {
  if (keyboard['ArrowLeft']) socket.emit('move left');
  if (keyboard['ArrowUp']) socket.emit('move up');
  if (keyboard['ArrowRight']) socket.emit('move right');
  if (keyboard['ArrowDown']) socket.emit('move down');
};
