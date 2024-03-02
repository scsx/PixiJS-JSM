

let fountainConfig = {
  lifetime: {
    min: 0.25,
    max: 1
  },
  frequency: 0.001,
  emitterLifetime: 0,
  maxParticles: 1000,
  addAtBack: false,
  pos: {
    x: 0,
    y: 0
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
    {
      type: 'textureRandom',
      config: {
        textures: ['assets/fountain.png']
      }
    },
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
}

// See js/ParticleExample.js for actual setup
new ParticleExample(
  // The image to use
  ['assets/fountain.png'],
  fountainConfig

  // Emitter configuration, edit this to change the look
  // of the emitter
)
