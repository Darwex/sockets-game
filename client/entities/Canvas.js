import { Utils } from '../Utils'

class Canvas {
  utils = null
  canvas = null
  ctx = null

  constructor (
    utils = new Utils()
  ) {
    this.utils = utils
    this.canvas = document.getElementById('world')
    this.ctx = this.canvas.getContext('2d')
    this.rescale()
  }

  rescale () {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  drawImage(assetId, x, y, width, height) {
    const image = document.getElementById(assetId)
    this.ctx.drawImage(image, x, y, width, height)
  }

  renderBlock(block, view = gameState.map.getView()) {
    switch (block.blockType) {
    case 'G':
      this.drawImage('ground', block.x - view.x, block.y - view.y, block.width, block.height)
      break
    case 'C':
      this.drawImage('cloud', block.x - view.x, block.y - view.y, block.width, block.height)
      break
    default:
      // DO NOTHING NOW, EMPTY SPACE
      break
    }
  }

  renderViewCoordsBox(view) {
    this.ctx.fillStyle = 'red'
    this.ctx.font = `20px Verdana`
    this.ctx.fillText(`View X: ${view.x} Y: ${view.y}`, 50, 50)
  }

  renderBackground() {
    this.drawImage('background', 0, 0, this.canvas.width, this.canvas.height)
  }

  renderPlayer() {
    this.drawImage('player-idle', canvas.width / 2 - 207 / 2, 410, 207, 364)
  }

  getDimensions() {
    return {
      width: this.canvas.width,
      height: this.canvas.height
    }
  }

  renderFrame(gameState) {
    this.renderBackground()
    const view = gameState.map.getView()
    gameState.map.getParsedMap().forEach(block => {
      if (this.utils.viewIntersect(block, view)) {
        this.renderBlock(block, view)
      }
    })
    this.renderViewCoordsBox(view)
  }
}

export {
  Canvas
}