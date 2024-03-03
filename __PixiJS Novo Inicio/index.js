import { fountainConfig } from './scripts/emitterConfigs.js'
import { explodeRocket } from './scripts/explodeRocket.js'

// Create a PIXI Application
const app = new PIXI.Application({
  width: 1280,
  height: 720,
  backgroundColor: 0x000000
})

let canvasCenter = {
  x: app.renderer.width / 2,
  y: app.renderer.height / 2
}

document.body.appendChild(app.view)

// Example call
//new ParticleExample(app, ['assets/fountain.png'], fountainConfig, 300, 300)

// Function to create and manage firework
const createFirework = (type, colour, duration, x, y, velocityX, velocityY) => {
  // FOUNTAIN.
  if (type === 'Fountain') {
    fountainConfig.behaviors[3].config.color.list[1].value = colour

    new ParticleExample(
      app,
      ['assets/fountain.png'],
      fountainConfig,
      canvasCenter.x - x,
      canvasCenter.y - y,
      duration
    )

    // ROCKET
  } else if (type === 'Rocket') {
    let rocket
    rocket = PIXI.Sprite.from('./assets/particle.png')
    rocket.tint = parseInt(colour, 16)
    rocket.position.set(canvasCenter.x - x, canvasCenter.y - y)
    app.stage.addChild(rocket)

    // Animate rocket.
    app.ticker.add((delta) => loopRocket(delta))

    const loopRocket = (delta) => {
      // Calculate displacement based on velocity and time (delta)
      const displacementX = (velocityX * delta) / 1000
      const displacementY = (velocityY * delta) / 100 // Should be 1000 but rockets were exploding right at the beggining.

      // Update rocket's position
      rocket.x += displacementX
      rocket.y += displacementY * -1
    }

    setTimeout(() => {
      app.stage.removeChild(rocket)
      explodeRocket(app, rocket.x, rocket.y, colour) // Call function with last position
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
      const velocityElement = firework.getElementsByTagName('Velocity')[0]
      let velocityX = 0
      let velocityY = 0
      if (velocityElement) {
        velocityX = parseFloat(velocityElement.getAttribute('x'))
        velocityY = parseFloat(velocityElement.getAttribute('y'))
      }

      // Create firework based on extracted attributes
      setTimeout(() => {
        createFirework(type, colour, duration, x, y, velocityX, velocityY)
      }, beginTime)
    }
  })
  .catch((error) => {
    console.error('Error fetching XML file:', error)
  })
