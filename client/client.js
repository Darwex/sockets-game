'use strict'

// C - Cloud
// G - Ground

const worldMap = [
  ['-', '-', '-', '-', '-', 'C', '-', '-', '-', '-', 'C', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'C', 'C', 'C', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'C'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']
]

const Utils = () => {

  const intersect = (a, b) => (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.height + a.y > b.y
  )

  return {
    intersect
  }
}

const Map = (canvas = Canvas()
) => {
  this.view = {
    x: 0,
    y: 0,
    width: canvas.getDimensions().width,
    height: canvas.getDimensions().height
  }

  canvas.renderViewCoordsBox(this.view)

  const moveView = step => {
    this.view.x = (this.view.x + step > 0) ? this.view.x + step : 0
    canvas.renderBackground()
    canvas.renderViewCoordsBox(this.view)
    canvas.renderView(this.parsedMap, this.view)
  }

  const moveViewRight = () => moveView(10)
  const moveViewLeft = () => moveView(-10)

  const parseWorldMap = (worldMap = []) => {
    const mapXBlockCount = worldMap[0] ? worldMap[0].length : 0
    const mapYBlockCount = worldMap.length
    const canvasDimensions = canvas.getDimensions()

    const blockWidth = 200
    const blockHeight = 200
    const parsedMap = []
    for (let i = 0; i < mapYBlockCount; i++) {
      for (let j = 0; j < mapXBlockCount; j++) {
        const currentBlock = worldMap[i][j]
        const parsedBlock = {
          blockType: currentBlock,
          x: (blockWidth * j),
          y: (blockHeight + blockHeight * i),
          width: blockWidth,
          height: blockHeight
        }
        parsedMap.push(parsedBlock)
      }
    }
    return parsedMap
  }

  this.parsedMap = parseWorldMap(worldMap)
  canvas.renderView(this.parsedMap, this.view)


  return {
    moveViewRight,
    moveViewLeft,
    getView: () => this.view,
  }
}

const Canvas = (utils = Utils()) => {
  const canvas = document.getElementById('world')
  const ctx = canvas.getContext('2d')

  const rescale = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    renderBackground()
  }
  const renderBlock = block => {
    ctx.fillStyle = 'red'
    ctx.font = `50px Verdana`
    ctx.fillText(block.blockType, block.x, block.y)
  }


  const renderView = (parsedMap, view) => {
    console.log(parsedMap, view)
    parsedMap.forEach(block => {
      if (utils.intersect(block, view)) {
        renderBlock(block)
      }
    })
  }

  const renderViewCoordsBox = view => {
    ctx.fillStyle = 'red'
    ctx.font = `20px Verdana`
    ctx.fillText(`View X: ${view.x} Y: ${view.y}`, 50, 50)
  }

  const renderBackground = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const getDimensions = () => {
    return {
      width: canvas.width,
      height: canvas.height
    }
  }

  return {
    rescale,
    renderView,
    renderBackground,
    getDimensions,
    renderBlock,
    renderViewCoordsBox
  }
}

const initApp = () => {
  // init
  const canvas = Canvas()
  canvas.rescale()
  canvas.renderBackground()

  const map = Map(canvas)

  // global events
  window.addEventListener('resize', canvas.rescale)
  document.addEventListener('keydown', e => {
    // right
    if (e.keyCode === 39) {
      map.moveViewRight()
    }
    //left
    if (e.keyCode === 37) {
      map.moveViewLeft()
    }
  })
  // document.getElementById('world').addEventListener('mousemove', e => console.log(e.clientX))
}

window.onload = initApp
