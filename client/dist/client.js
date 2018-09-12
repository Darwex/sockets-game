/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/Utils.js":
/*!*************************!*\
  !*** ./client/Utils.js ***!
  \*************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Utils\", function() { return Utils; });\nclass Utils {\n  intersect(a, b, offset = 0) {\n    return (\n      a.x < b.x + b.width + offset &&\n      a.x + a.width + offset > b.x &&\n      a.y < b.y + b.height + offset &&\n      a.height + offset + a.y > b.y\n    )\n  }\n\n  viewIntersect(a,b) {\n    this.intersect(a, b, 1)\n  }\n}\n\n\n\n//# sourceURL=webpack:///./client/Utils.js?");

/***/ }),

/***/ "./client/entities/Canvas.js":
/*!***********************************!*\
  !*** ./client/entities/Canvas.js ***!
  \***********************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Canvas\", function() { return Canvas; });\n/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils */ \"./client/Utils.js\");\n\n\nclass Canvas {\n  constructor (\n    utils = new _Utils__WEBPACK_IMPORTED_MODULE_0__[\"Utils\"]()\n  ) {\n    this.utils = utils\n    this.canvas = document.getElementById('world')\n    this.ctx = canvas.getContext('2d')\n  }\n\n  rescale () {\n    canvas.width = window.innerWidth\n    canvas.height = window.innerHeight\n  }\n\n  drawImage(assetId, x, y, width, height) {\n    const image = document.getElementById(assetId)\n    ctx.drawImage(image, x, y, width, height)\n  }\n\n  renderBlock(block, view = gameState.map.getView()) {\n    switch (block.blockType) {\n    case 'G':\n      drawImage('ground', block.x - view.x, block.y - view.y, block.width, block.height)\n      break\n    case 'C':\n      drawImage('cloud', block.x - view.x, block.y - view.y, block.width, block.height)\n      break\n    default:\n      // DO NOTHING NOW, EMPTY SPACE\n      break\n    }\n  }\n\n  renderViewCoordsBox(view) {\n    ctx.fillStyle = 'red'\n    ctx.font = `20px Verdana`\n    ctx.fillText(`View X: ${view.x} Y: ${view.y}`, 50, 50)\n  }\n\n  renderBackground() {\n    drawImage('background', 0, 0, canvas.width, canvas.height)\n  }\n\n  renderPlayer() {\n    drawImage('player-idle', canvas.width / 2 - 207 / 2, 410, 207, 364)\n  }\n\n  getDimensions() {\n    return {\n      width: canvas.width,\n      height: canvas.height\n    }\n  }\n\n  renderFrame(gameState) {\n    const view = gameState.map.\n    renderBackground()\n    gameState.map.getParsedMap().forEach(block => {\n      if (this.utils.viewIntersect(block, view)) {\n        this.renderBlock(block, view)\n      }\n    })\n    this.renderViewCoordsBox()\n  }\n}\n\n\n\n//# sourceURL=webpack:///./client/entities/Canvas.js?");

/***/ }),

/***/ "./client/entities/Map.js":
/*!********************************!*\
  !*** ./client/entities/Map.js ***!
  \********************************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Map\", function() { return Map; });\nclass Map {\n  constructor (mapModel, canvasDimensions) {\n    this.parsedMap = this.parseMap(mapModel)\n    this.canvasDimensions = canvasDimensions\n    this.view = {\n      x: 0,\n      y: 0,\n      width: canvasDimensions.width,\n      height: canvasDimensions.height,\n      viewMaxX: 0\n    }\n  }\n\n  getSizeMultiplicator() {\n    return (1 + Math.random())\n  }\n\n  parseMap(worldMap = []) {\n    const mapXBlockCount = worldMap[0] ? worldMap[0].length : 0\n    const mapYBlockCount = worldMap.length\n\n    const blockWidth = (this.canvasDimensions.height / 5)\n    const blockHeight = (this.canvasDimensions.height / mapYBlockCount)\n    const parsedMap = []\n    for (let i = 0; i < mapYBlockCount; i++) {\n      for (let j = 0; j < mapXBlockCount; j++) {\n        const currentBlock = worldMap[i][j]\n\n        const sizeMultiplicator = this.getSizeMultiplicator()\n        const parsedBlock = {\n          blockType: currentBlock,\n          x: (blockWidth * j),\n          y: (blockHeight * i),\n          width: (currentBlock === 'C') ? blockWidth * sizeMultiplicator : blockWidth,\n          height: (currentBlock === 'C') ? blockHeight * sizeMultiplicator : blockHeight\n        }\n        parsedMap.push(parsedBlock)\n        this.view.viewMaxX = Math.max(this.view.viewMaxX, (parsedBlock.x + parsedBlock.width))\n      }\n    }\n    return parsedMap\n  }\n\n  getParsedMap() {\n    return this.parsedMap\n  }\n\n\n  // render() {\n  //   // This code should be in move function\n  //   // if ((this.view.x + this.view.width + step) > this.view.viewMaxX) this.view.x = this.view.viewMaxX - this.view.width\n  //   // else if (this.view.x + step < 0) this.view.x = 0\n  //   // else this.view.x += step\n  //\n  // }\n}\n\n// const Map = gameState => {\n//   const moveView = step => {\n//   }\n//\n//\n//   This is responsibility of event emitter\n//   const moveViewRight = () => moveView(50)\n//   const moveViewLeft = () => moveView(-30)\n//\n//\n//   return {\n//     moveViewRight,\n//     moveViewLeft,\n//     getView: () => this.view,\n//     getParsedMap: () => this.parsedMap ? this.getParsedMap() : parseWorldMap()\n//   }\n// }\n\n\n\n//# sourceURL=webpack:///./client/entities/Map.js?");

/***/ }),

/***/ "./client/entities/Player.js":
/*!***********************************!*\
  !*** ./client/entities/Player.js ***!
  \***********************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Player\", function() { return Player; });\nconst Player = (canvas = Canvas()) => {\n  undefined.x = canvas.width / 2\n  undefined.y = canvas.height - 50\n\n  const render = () => {\n    canvas.drawImage('player-idle', undefined.x, undefined.y, 207, 364)\n  }\n\n  return {\n    render\n  }\n}\n\n\n\n//# sourceURL=webpack:///./client/entities/Player.js?");

/***/ }),

/***/ "./client/entities/World.js":
/*!**********************************!*\
  !*** ./client/entities/World.js ***!
  \**********************************/
/*! exports provided: World */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"World\", function() { return World; });\n/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ \"./client/entities/Canvas.js\");\n/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Map */ \"./client/entities/Map.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ \"./client/entities/Player.js\");\n\n\n\n\n\n\n// C - Cloud\n// G - Ground\n\nconst exampleWorldMap = [\n  ['-', '-', '-', '-', '-', 'C', '-', '-', '-', '-', 'C', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'C', '-', '-', '-', '-', '-', '-', '-', '-', 'C', '-', '-', '-', '-', '-'],\n  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],\n  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],\n  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],\n  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],\n  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],\n  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],\n  ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']\n]\n\n\nclass World {\n\n  constructor (canvas = new _Canvas__WEBPACK_IMPORTED_MODULE_0__[\"Canvas\"]()) {\n\n    this.canvas = canvas\n    this.gameState = {\n      map: new _Map__WEBPACK_IMPORTED_MODULE_1__[\"Map\"](exampleWorldMap, canvas.getDimensions())\n      // player: new Player(),\n    }\n\n    // this.gameState.entities.push(new Player())\n  }\n\n  // Responsibility of event emitter\n  // setUpEventListeners() {\n  //   // global events\n  //   window.addEventListener('resize', canvas.rescale)\n  //   document.addEventListener('keydown', e => {\n  //     // right\n  //     if (e.keyCode === 39) {\n  //       map.moveViewRight()\n  //     }\n  //     //left\n  //     if (e.keyCode === 37) {\n  //       map.moveViewLeft()\n  //     }\n  //   })\n  // }\n\n  gameLoop() {\n    this.xwcanvas.renderFrame()\n    requestAnimationFrame(gameLoop)\n  }\n\n  startGame() {\n    // setUpEventListeners()\n    requestAnimationFrame(gameLoop)\n  }\n}\n\n\n\n//# sourceURL=webpack:///./client/entities/World.js?");

/***/ }),

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _entities_World__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/World */ \"./client/entities/World.js\");\n\n\n\n\nconst assets = [\n  {\n    name: 'ground',\n    id: 'ground',\n    uri: 'https://s-media-cache-ak0.pinimg.com/236x/78/c8/d1/78c8d1962cd9ade2be59a35fdd9c8c1e.jpg'\n  },\n  {\n    name: 'background',\n    id: 'background',\n    uri: 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/yZhWZV2/cartoon-animation-of-a-blue-sky_ekh3vs5gg__F0000.png'\n  },\n  {\n    name: 'cloud',\n    id: 'cloud',\n    uri: 'http://www.clipartsfree.net/vector/medium/mcol_cloud_Clip_Art.png'\n  },\n  {\n    name: 'player-idle',\n    id: 'player-idle',\n    uri: '/assets/player/Idle1.png'\n  }\n]\n\nwindow.onload = () => {\n\n  assets.map(asset => {\n    const image = new Image()\n    image.src = asset.uri\n    image.id = asset.id\n    image.style.display = 'none'\n    document.body.appendChild(image)\n  })\n\n  // Hack to wait for all images to be loaded :-X\n  const world = new _entities_World__WEBPACK_IMPORTED_MODULE_0__[\"World\"]()\n  setTimeout(world.startGame, 500)\n}\n\n\n\n//# sourceURL=webpack:///./client/index.js?");

/***/ })

/******/ });