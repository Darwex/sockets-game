const Map = gameState => {
  this.view = {
    x: 0,
    y: 0,
    width: gameState.canvas.getDimensions().width,
    height: gameState.canvs.getDimensions().height,
    viewMaxX: 0
  }

  const moveView = step => {
    if ((this.view.x + this.view.width + step) > this.view.viewMaxX) this.view.x = this.view.viewMaxX - this.view.width
    else if (this.view.x + step < 0) this.view.x = 0
    else this.view.x += step

    canvas.renderBackground()
    canvas.renderViewCoordsBox(this.view)
    canvas.renderView(this.parsedMap, this.view)
  }

  const getSizeMultiplicator = () => (1 + Math.random())

  const moveViewRight = () => moveView(50)
  const moveViewLeft = () => moveView(-30)

  const parseWorldMap = (worldMap = []) => {
    const mapXBlockCount = worldMap[0] ? worldMap[0].length : 0
    const mapYBlockCount = worldMap.length
    const canvasDimensions = canvas.getDimensions()

    const blockWidth = (canvasDimensions.height / 5)
    const blockHeight = (canvasDimensions.height / mapYBlockCount)
    const parsedMap = []
    for (let i = 0; i < mapYBlockCount; i++) {
      for (let j = 0; j < mapXBlockCount; j++) {
        const currentBlock = worldMap[i][j]

        const sizeMultiplicator = getSizeMultiplicator()
        const parsedBlock = {
          blockType: currentBlock,
          x: (blockWidth * j),
          y: (blockHeight * i),
          width: (currentBlock === 'C') ? blockWidth * sizeMultiplicator : blockWidth,
          height: (currentBlock === 'C') ? blockHeight * sizeMultiplicator : blockHeight
        }
        parsedMap.push(parsedBlock)
        this.view.viewMaxX = Math.max(this.view.viewMaxX, (parsedBlock.x + parsedBlock.width))
      }
    }
    return parsedMap
  }

  this.parsedMap = parseWorldMap()

  return {
    moveViewRight,
    moveViewLeft,
    getView: () => this.view,
    getParsedMap: () => this.parsedMap ? this.getParsedMap() : parseWorldMap()
  }
}

export  {
  Map
}