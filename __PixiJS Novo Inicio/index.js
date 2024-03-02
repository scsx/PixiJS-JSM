import { fountainConfig, rocketConfig } from './scripts/emitterConfigs.js'

// Create a PIXI Application
const app = new PIXI.Application({
  width: 1280,
  height: 720,
  backgroundColor: 0x000000
})

let canvasCenter = {
  x: 640,
  y: 360
}

const resizeRenderer = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
  canvasCenter.x = window.innerWidth / 2
  canvasCenter.y = window.innerHeight / 2
}

window.addEventListener('resize', resizeRenderer)
resizeRenderer()

// Append the PIXI Application's view (canvas) to the document body
document.body.appendChild(app.view)

// Example call
//new ParticleExample(app, ['assets/fountain.png'], fountainConfig, 300, 300)

// Call Multiple
/*
function myFunction(x, y) {
  new ParticleExample(app, ['assets/fountain.png'], fountainConfig, x, y)
}

let counter = 1;
const intervalId = setInterval(() => {
  myFunction(100 * counter, 500);
  counter++;
  if (counter === 6) {
    clearInterval(intervalId); // Stop the interval after three executions
  }
}, 1000)
*/

// Explode Rocket  - DELETE AFTER.
const explodeRocket = (x, y) => {
  console.log(x, y)
}

// Function to create and manage firework
const createFirework = (type, colour, duration, x, y, velocityX, velocityY) => {
  // FOUNTAIN.
  if (type === 'Fountain') {
    /* let fountain
    fountain = PIXI.Sprite.from('./assets/fountain.png')
    fountain.tint = parseInt(colour, 16)
    fountain.position.set(canvasCenter.x - x, canvasCenter.y - y)
    app.stage.addChild(fountain) */
    /* setTimeout(() => {
      app.stage.removeChild(fountain)
    }, duration) */

    new ParticleExample(app, ['assets/fountain.png'], fountainConfig, canvasCenter.x - x, canvasCenter.y - y, duration)

    // ROCKET
  } else if (type === 'Rocket') {
    let rocket
    rocket = PIXI.Sprite.from('./assets/rocket.png')
    rocket.tint = parseInt(colour, 16)
    rocket.position.set(canvasCenter.x - x, canvasCenter.y - y)
    app.stage.addChild(rocket)

    // Animate rocket.
    app.ticker.add((delta) => loopRocket(delta))

    const loopRocket = (delta) => {
      // Calculate displacement based on velocity and time (delta)
      const displacementX = (velocityX * delta) / 1000
      const displacementY = (velocityY * delta) / 1000

      // Update rocket's position
      rocket.x += displacementX
      rocket.y += displacementY * -1
    }

    setTimeout(() => {
      app.stage.removeChild(rocket) // Remove rocket from stage
      explodeRocket(rocket.x, rocket.y) // Call function with last position
    }, duration)
  }
}

// Fetch the XML file
fetch('./data/fireworks.xml')
  .then((response) => response.text())
  .then((xmlData) => {
    const parser = new DOMParser()
    const xml = parser.parseFromString(xmlData, 'text/xml')
    const fireworkElements = xml.getElementsByTagName('Firework')

    for (let i = 0; i < fireworkElements.length; i++) {
      const firework = fireworkElements[i]
      const beginTime = parseInt(firework.getAttribute('begin'))
      const type = firework.getAttribute('type')
      const colour = firework.getAttribute('colour')
      const duration = parseInt(firework.getAttribute('duration'))
      const position = firework.getElementsByTagName('Position')[0]
      const x = parseFloat(position.getAttribute('x'))
      const y = parseFloat(position.getAttribute('y'))
      // Velocity.
      const velocityElement = firework.getElementsByTagName('Velocity')[0]
      let velocityX = 0
      let velocityY = 0
      if (velocityElement) {
        velocityX = parseFloat(velocityElement.getAttribute('x'))
        velocityY = parseFloat(velocityElement.getAttribute('y'))
      }

      // Create and manage firework based on extracted attributes
      setTimeout(() => {
        console.log(type, x, y)
        createFirework(type, colour, duration, x, y, velocityX, velocityY)
      }, beginTime)
    }
  })
  .catch((error) => {
    console.error('Error fetching XML file:', error)
  })

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
