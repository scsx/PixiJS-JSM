import { fountainConfig, rocketConfig } from './scripts/emitterConfigs.js'

// Create a PIXI Application
const app = new PIXI.Application({
  width: 1280,
  height: 720,
  backgroundColor: 0x000000
})

// Append the PIXI Application's view (canvas) to the document body
document.body.appendChild(app.view)

new ParticleExample(app, ['assets/fountain.png'], fountainConfig, 300, 300)
new ParticleExample(app, ['assets/fountain.png'], fountainConfig, 600, 600)

// Create a Graphics object
const graphics = new PIXI.Graphics()
graphics.beginFill(0xff0000)
graphics.lineStyle(2, 0xffffff, 1) // Line style: white, thickness: 2
graphics.drawRect(50, 50, 200, 100) // Draw a rectangle at (50, 50) with width 200 and height 100
graphics.endFill()
app.stage.addChild(graphics)

// ATE AQUI
/*import { fountainConfig, rocketConfig } from './scripts/emitterConfigs.js'

const canvas = document.getElementById('stage')

// START
const Application = PIXI.Application
const Graphics = PIXI.Graphics

const app = new Application({
  width: 1280,
  height: 720,
  antialias: true,
  backgroundAlpha: 1,
  backgroundColor: 0x000000
})

app.renderer.view = canvas


let canvasCenter = {
  x: 640,
  y: 350
}

const resizeRenderer = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
  canvasCenter.x = window.innerWidth / 2
  canvasCenter.y = window.innerHeight / 2
}

window.addEventListener('resize', resizeRenderer)
resizeRenderer()

app.renderer.view.style.position = 'absolute'

//document.body.appendChild(app.view)
const rectangle = new Graphics()
rectangle.beginFill(0xaa33bb)
rectangle.lineStyle(4, 0xff33bb, 1)
rectangle.drawRect(200, 200, 100, 120)
rectangle.endFill()
app.stage.addChild(rectangle)

// See js/ParticleExample.js for actual setup.
//new ParticleExample(app, ['assets/fountain.png'], fountainConfig, 300, 300)
*/
