const Canvas = (gameState = {},
  utils = Utils()
) => {
  const canvas = document.getElementById('world')
  const ctx = canvas.getContext('2d')

  const rescale = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  const drawImage = (assetId, x, y, width, height) => {
    const image = document.getElementById(assetId)
    ctx.drawImage(image, x, y, width, height)
  }

  const renderBlock = (block, view = gameState.map.getView()) => {
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

  const render = (block, view = gameState.map.getView()) => {
    gameState.map.getParsedMap().forEach(block => {
      if (utils.viewIntersect(block, view)) {
        renderBlock(block, view)
      }
    })
    renderViewCoordsBox()
  }

  const renderViewCoordsBox = view => {
    ctx.fillStyle = 'red'
    ctx.font = `20px Verdana`
    ctx.fillText(`View X: ${view.x} Y: ${view.y}`, 50, 50)
  }

  const renderBackground = () => {
    drawImage('background', 0, 0, canvas.width, canvas.height)
  }

  const renderPlayer = () => {
    drawImage('player-idle', canvas.width / 2 - 207 / 2, 410, 207, 364)
  }

  const getDimensions = () => {
    return {
      width: canvas.width,
      height: canvas.height
    }
  }

  return {
    rescale,
    render
  }
}