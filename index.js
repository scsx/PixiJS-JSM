// START
const Application = PIXI.Application
const Graphics = PIXI.Graphics

const app = new Application({
  width: 1280,
  height: 720,
  transparent: true,
  antialias: true
})

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

app.renderer.background.color = 0x000000
app.renderer.view.style.position = 'absolute'

document.body.appendChild(app.view)

// Function to run after rocket's duration
function explodeRocket(x, y) {
  /* let container = new ParticleContainer()

  for (let i = 0; i < 100; ++i) {
    let sprite = new PIXI.Sprite.fromImage('./assets/rocket.png')
    container.addChild(sprite)
  } */
  console.log(x, y)
}

// Function to create and manage firework
function createFirework(type, colour, duration, x, y, velocityX, velocityY) {
  if (type === 'Fountain') {
    let fountain
    fountain = PIXI.Sprite.from('./assets/fountain.png')
    fountain.tint = parseInt(colour, 16)
    fountain.position.set(canvasCenter.x - x, canvasCenter.y - y)
    app.stage.addChild(fountain)

    setTimeout(() => {
      app.stage.removeChild(fountain)
    }, duration)

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
        console.log(type, colour, duration, x, y, velocityX, velocityY)
        createFirework(type, colour, duration, x, y, velocityX, velocityY)
      }, beginTime)
    }
  })
  .catch((error) => {
    console.error('Error fetching XML file:', error)
  })
