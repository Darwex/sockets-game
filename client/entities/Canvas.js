import { Utils } from '../Utils'

class Canvas {
  constructor (
    utils = new Utils()
  ) {
    this.utils = utils
    this.canvas = document.getElementById('world')
    this.ctx = canvas.getContext('2d')
  }

  rescale () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  drawImage(assetId, x, y, width, height) {
    const image = document.getElementById(assetId)
    ctx.drawImage(image, x, y, width, height)
  }

  renderBlock(block, view = gameState.map.getView()) {
    switch (block.blockType) {
    case 'G':
      drawImage('ground', block.x - view.x, block.y - view.y, block.width, block.height)
      break
    case 'C':
      drawImage('cloud', block.x - view.x, block.y - view.y, block.width, block.height)
      break
    default:
      // DO NOTHING NOW, EMPTY SPACE
      break
    }
  }

  renderViewCoordsBox(view) {
    ctx.fillStyle = 'red'
    ctx.font = `20px Verdana`
    ctx.fillText(`View X: ${view.x} Y: ${view.y}`, 50, 50)
  }

  renderBackground() {
    drawImage('background', 0, 0, canvas.width, canvas.height)
  }

  renderPlayer() {
    drawImage('player-idle', canvas.width / 2 - 207 / 2, 410, 207, 364)
  }

  getDimensions() {
    return {
      width: canvas.width,
      height: canvas.height
    }
  }

  renderFrame(gameState) {
    const view = gameState.map.
    renderBackground()
    gameState.map.getParsedMap().forEach(block => {
      if (this.utils.viewIntersect(block, view)) {
        this.renderBlock(block, view)
      }
    })
    this.renderViewCoordsBox()
  }
}

export {
  Canvas
}