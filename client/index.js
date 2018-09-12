'use strict'

import { World } from './entities/World'

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
  },
  {
    name: 'player-idle',
    id: 'player-idle',
    uri: '/assets/player/Idle1.png'
  }
]

window.onload = () => {

  assets.map(asset => {
    const image = new Image()
    image.src = asset.uri
    image.id = asset.id
    image.style.display = 'none'
    document.body.appendChild(image)
  })

  // Hack to wait for all images to be loaded :-X
  const world = new World()
  setTimeout(world.startGame, 500)
}

