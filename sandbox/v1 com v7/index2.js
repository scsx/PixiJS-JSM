const { Container, ParticleContainer, Renderer, Ticker } = PIXI
const canvas = document.getElementById('canvas')
const renderer = new Renderer({
  view: canvas,
  width: 1280,
  height: 720
})
const stage = new Container()
const cnt = new ParticleContainer()
stage.addChild(cnt)

const particleTexture = PIXI.Texture.from('./assets/fountain.png')

const emitter = new PIXI.particles.Emitter(cnt, {
  frequency: 0.001,
  lifetime: {
    min: 0.5,
    max: 0.5
  },
  emitterLifetime: 0,
  maxParticles: 1000,
  addAtBack: false,
  pos: {
    x: renderer.innerWidth / 2, // era 0
    y: renderer.innerHeight / 2 // era 0
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
      config: { textures: [particleTexture] }
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

emitter.emit = true

const ticker = new Ticker()
/* ticker.add((delta) => {
  console.log('run')
  emitter.update(delta * 0.001)
}) */
//let elapsed = 0
//ticker.start()

/* app.ticker.add((delta) => {
  emitter.update(delta * 0.001)
}) */

let elapsed = 0
ticker.add(() => renderer.render(stage))
ticker.start()
