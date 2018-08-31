'use strict'

// C - Cloud
// G - Ground

const worldMap = [
  ['-', '-', 'C', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']
]

const Map = (canvas = Canvas()) => {
  this.viewX = 0
  this.viewY = 0

  const renderView = () => {

  }

  const parseWorldMap = (worldMap = [], scale = 10) => {
    const mapXBlockCount = worldMap[0] ? worldMap[0].length : 0
    const mapYBlockCount = worldMap.length
    const canvasDimensions = canvas.getDimensions()

    const blockWidth = (canvasDimensions.width / mapXBlockCount) * scale
    const blockHeight = (canvasDimensions.height / mapYBlockCount) * scale
    const parsedMap = []
    for (let i = 0; i < mapYBlockCount; i++) {
      for (let j = 0; j < mapXBlockCount; j++) {
        const currentBlock = worldMap[i][j]
        parsedMap.push({
          blockType: currentBlock,
          x: (blockWidth * j),
          y: (blockHeight * i),
          width: blockWidth,
          height: blockHeight
        })
      }
    }
  }

  return {
    renderView
  }
}

const Canvas = () => {
  const canvas = document.getElementById('world')
  const ctx = canvas.getContext('2d')

  const rescale = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawBackground()
  }

  const drawBackground = () => {
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
    drawBackground,
    getDimensions
  }
}

const initApp = () => {
  // init
  const canvas = Canvas()
  canvas.rescale()
  canvas.drawBackground()

  const map = Map(canvas)

  // global events
  window.addEventListener('resize', canvas.rescale)
  // document.getElementById('world').addEventListener('mousemove', e => console.log(e.clientX))
}

window.onload = initApp
