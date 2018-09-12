'use strict'

import { Canvas } from './Canvas'
import { Map } from './Map'
import { Player } from './Player'

// C - Cloud
// G - Ground

const exampleWorldMap = [
  ['-', '-', '-', '-', '-', 'C', '-', '-', '-', '-', 'C', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'C', '-', '-', '-', '-', '-', '-', '-', '-', 'C', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']
]


class World {

  constructor (canvas = new Canvas()) {

    this.canvas = canvas
    this.gameState = {
      map: new Map(exampleWorldMap, canvas.getDimensions())
      // player: new Player(),
    }

    // this.gameState.entities.push(new Player())
  }

  // Responsibility of event emitter
  // setUpEventListeners() {
  //   // global events
  //   window.addEventListener('resize', canvas.rescale)
  //   document.addEventListener('keydown', e => {
  //     // right
  //     if (e.keyCode === 39) {
  //       map.moveViewRight()
  //     }
  //     //left
  //     if (e.keyCode === 37) {
  //       map.moveViewLeft()
  //     }
  //   })
  // }

  gameLoop() {
    this.canvas.renderFrame()
    requestAnimationFrame(gameLoop)
  }

  startGame() {
    // setUpEventListeners()
    requestAnimationFrame(gameLoop)
  }
}

export {
  World
}