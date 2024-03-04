//import * as particles from './node_modules/@pixi/particle-emitter'

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
  y: 360
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
const explodeRocket = (x, y) => {
  console.log(x, y)
}

// Function to create and manage firework
const createFirework = (type, colour, duration, x, y, velocityX, velocityY) => {
  // FOUNTAIN.
  if (type === 'Fountain') {
    let fountain
    fountain = PIXI.Sprite.from('./assets/fountain.png')
    fountain.tint = parseInt(colour, 16)
    fountain.position.set(canvasCenter.x - x, canvasCenter.y - y)
    app.stage.addChild(fountain)

    // EMITTER.
    // Create Particle Textures
    const particleTexture = PIXI.Texture.from('./assets/fountain.png')

    // Configure Particle Emitter
    const emitter = new PIXI.particles.Emitter(app.stage, {
      frequency: 0.001,
      lifetime: {
        min: 0.5,
        max: 0.5
      },
      emitterLifetime: 0,
      maxParticles: 1000,
      addAtBack: false,
      /* pos: {
        x: 0,
        y: 0
      }, */
      pos: {
        x: x,
        y: y
      },
      behaviors: [
        {
          type: 'alpha',
          config: {
            alpha: {
              list: [
                {
                  time: 0,
                  value: 1
                },
                {
                  time: 1,
                  value: 0.31
                }
              ]
            }
          }
        },
        {
          type: 'moveAcceleration',
          config: {
            accel: {
              x: 0,
              y: 2000
            },
            minStart: 600,
            maxStart: 600,
            rotate: true
          }
        },
        {
          type: 'scale',
          config: {
            scale: {
              list: [
                {
                  time: 0,
                  value: 0.5
                },
                {
                  time: 1,
                  value: 1
                }
              ]
            },
            minMult: 1
          }
        },
        {
          type: 'color',
          config: {
            color: {
              list: [
                {
                  time: 0,
                  value: 'ffffff'
                },
                {
                  time: 1,
                  value: '9ff3ff'
                }
              ]
            }
          }
        },
        {
          type: 'rotationStatic',
          config: {
            min: 260,
            max: 280
          }
        },
        /* {
          type: 'textureRandom',
          config: {
            textures: ['images/Sparks.png']
          }
        }, */
        { type: 'textureSingle', config: { texture: PIXI.Texture.WHITE } },
        {
          type: 'spawnShape',
          config: {
            type: 'torus',
            data: {
              x: 0,
              y: 0,
              radius: 0,
              innerRadius: 0,
              affectRotation: false
            }
          }
        }
      ]
    })

    // Start emitting particles
    emitter.emit = true

    // Animate Particles
    app.ticker.add((delta) => {
      emitter.update(delta * 0.001) // Convert delta to seconds
    })

    setTimeout(() => {
      app.stage.removeChild(fountain)
    }, duration)

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
        console.log(type, colour, duration, x, y, velocityX, velocityY)
        createFirework(type, colour, duration, x, y, velocityX, velocityY)
      }, beginTime)
    }
  })
  .catch((error) => {
    console.error('Error fetching XML file:', error)
  })
