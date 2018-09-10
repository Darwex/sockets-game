const Player = (canvas = Canvas()) => {
  this.x = canvas.width / 2
  this.y = canvas.height - 50

  const render = () => {
    canvas.drawImage('player-idle', this.x, this.y, 207, 364)
  }

  return {
    render
  }
}