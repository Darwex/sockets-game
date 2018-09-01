'use strict'

// C - Cloud
// G - Ground

const worldMap = [
  ['-', '-', '-', '-', '-', 'C', '-', '-', '-', '-', 'C', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'C', '-', '-', '-', '-', '-', '-', '-', '-', 'C', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']
]

const assets = [
  {
    name: 'ground',
    id: 'ground',
    uri: 'https://s-media-cache-ak0.pinimg.com/236x/78/c8/d1/78c8d1962cd9ade2be59a35fdd9c8c1e.jpg'
  },
  {
    name: 'background',
    id: 'background',
    uri: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/yZhWZV2/cartoon-animation-of-a-blue-sky_ekh3vs5gg__F0000.png'
  },
  {
    name: 'cloud',
    id: 'cloud',
    uri: 'http://www.clipartsfree.net/vector/medium/mcol_cloud_Clip_Art.png'
  }
]

const Utils = () => {

  const intersect = (a, b, offset = 0) => (
    a.x < b.x + b.width + offset &&
    a.x + a.width  + offset > b.x &&
    a.y < b.y + b.height  + offset &&
    a.height + offset + a.y > b.y
  )

  // In case that block would be 1px off visible
  const viewIntersect = (a, b) => intersect(a, b, 1)

  return {
    intersect,
    viewIntersect
  }
}

const Map = (canvas = Canvas()
) => {
  this.view = {
    x: 0,
    y: 0,
    width: canvas.getDimensions().width,
    height: canvas.getDimensions().height,
    viewMaxX: 0
  }

  canvas.renderViewCoordsBox(this.view)

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
          width: (currentBlock  === 'C') ? blockWidth * sizeMultiplicator : blockWidth,
          height: (currentBlock  === 'C') ? blockHeight * sizeMultiplicator : blockHeight
        }
        parsedMap.push(parsedBlock)
        this.view.viewMaxX = Math.max(this.view.viewMaxX, (parsedBlock.x + parsedBlock.width))
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

  const drawImage = (assetId, x, y, width, height) => {
    const image = document.getElementById(assetId)
    ctx.drawImage(image, x, y, width, height)
  }

  const renderBlock = (block, view) => {
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

  const renderView = (parsedMap, view) => {
    parsedMap.forEach(block => {
      if (utils.viewIntersect(block, view)) {
        renderBlock(block, view)
      }
    })
  }

  const renderViewCoordsBox = view => {
    ctx.fillStyle = 'red'
    ctx.font = `20px Verdana`
    ctx.fillText(`View X: ${view.x} Y: ${view.y}`, 50, 50)
  }

  const renderBackground = () => {
    drawImage('background', 0, 0, canvas.width, canvas.height)
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

window.onload = () => {

  assets.map(asset => {
    const image = new Image()
    image.src = asset.uri
    image.id = asset.id
    image.style.display = 'none'
    document.body.appendChild(image)
  })

  // Hack to wait for all images to be loaded :-X
  setTimeout(initApp, 500)
}

