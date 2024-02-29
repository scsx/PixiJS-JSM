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

/* const char1Sprite = PIXI.Sprite.from('./tutorial_assets/images/char1.png')
app.stage.addChild(char1Sprite) */

// Function to run after rocket's duration
function explodeRocket(x, y) {
  let container = new ParticleContainer()

  for (let i = 0; i < 100; ++i) {
    let sprite = new PIXI.Sprite.fromImage('./assets/rocket.png')
    container.addChild(sprite)
  }
}

// Function to create and manage firework
function createFirework(type, colour, duration, x, y) {
  let firework
  if (type === 'Fountain') {
    firework = PIXI.Sprite.from('./assets/fountain.png')
  } else if (type === 'Rocket') {
    firework = PIXI.Sprite.from('./assets/rocket.png')
  }

  firework.tint = parseInt(colour, 16)
  firework.position.set(canvasCenter.x - x, canvasCenter.y - y)
  app.stage.addChild(firework)

  // ANIMATE
  app.ticker.add((delta) => loopChar(delta))

  const loopChar = (delta) => {
    firework.x += 1
  }

  // Optionally, animate firework
  //TweenMax.to(firework, duration / 1000, {
  /* Animation properties */
  //})
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

      // Create and manage firework based on extracted attributes

      setTimeout(() => {
        console.log(beginTime, type, colour, duration, x, y)
        createFirework(type, colour, duration, x, y)
      }, beginTime)
    }
  })
  .catch((error) => {
    console.error('Error fetching XML file:', error)
  })
