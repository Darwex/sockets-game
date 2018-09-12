class Map {
  parsedMap = null
  canvasDimensions = null
  view = null

  constructor (mapModel, canvasDimensions) {
    this.canvasDimensions = canvasDimensions
    this.view = {
      x: 0,
      y: 0,
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      viewMaxX: 0
    }
    this.parsedMap = this.parseMap(mapModel)
  }

  getSizeMultiplicator = () => {
    return (1 + Math.random())
  }

  parseMap = (worldMap = []) => {
    const mapXBlockCount = worldMap[0] ? worldMap[0].length : 0
    const mapYBlockCount = worldMap.length

    const blockWidth = (this.canvasDimensions.height / 5)
    const blockHeight = (this.canvasDimensions.height / mapYBlockCount)
    const parsedMap = []
    for (let i = 0; i < mapYBlockCount; i++) {
      for (let j = 0; j < mapXBlockCount; j++) {
        const currentBlock = worldMap[i][j]

        const sizeMultiplicator = this.getSizeMultiplicator()
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

  getParsedMap = () => this.parsedMap
  getView = () => this.view


  // render() {
  //   // This code should be in move function
  //   // if ((this.view.x + this.view.width + step) > this.view.viewMaxX) this.view.x = this.view.viewMaxX - this.view.width
  //   // else if (this.view.x + step < 0) this.view.x = 0
  //   // else this.view.x += step
  //
  // }
}

// const Map = gameState => {
//   const moveView = step => {
//   }
//
//
//   This is responsibility of event emitter
//   const moveViewRight = () => moveView(50)
//   const moveViewLeft = () => moveView(-30)
//
//
//   return {
//     moveViewRight,
//     moveViewLeft,
//     getView: () => this.view,
//     getParsedMap: () => this.parsedMap ? this.getParsedMap() : parseWorldMap()
//   }
// }

export  {
  Map
}