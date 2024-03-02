class ParticleExample {
  constructor(app, imagePaths, config, emitterPosX, emitterPosY) {
    this.app = app
    this.stage = app.stage
    console.log(this.stage)
    this.emitter = null
    this.bg = null
    this.updateHook = null
    this.containerHook = null

    // Calculate the current time
    let elapsed = Date.now()
    let updateId

    // Update function every frame
    const update = () => {
      // Update the next frame
      updateId = requestAnimationFrame(update)

      const now = Date.now()
      if (this.emitter) {
        // update emitter (convert to seconds)
        this.emitter.update((now - elapsed) * 0.001)
      }

      // call update hook for specialist examples
      if (this.updateHook) {
        this.updateHook(now - elapsed)
      }

      elapsed = now

      // render the stage
      this.app.renderer.render(this.stage)
    }

    // Resize the canvas to the size of the window
    window.onresize = () => {
      // this.app.renderer.resize(window.innerWidth, window.innerHeight)
      if (this.bg) {
        // bg is a 1px by 1px image
        this.bg.scale.x = this.app.renderer.width
        this.bg.scale.y = this.app.renderer.height
      }
    }
    window.onresize()

    // Check if the loader is already loading resources
    if (!PIXI.Loader.shared.loading) {
      // Preload the particle images and create PIXI textures from it
      let urls
      if (imagePaths.spritesheet) {
        urls = [imagePaths.spritesheet]
      } else if (imagePaths.textures) {
        urls = imagePaths.textures.slice()
      } else {
        urls = imagePaths.slice()
      }
      const loader = PIXI.Loader.shared
      for (let i = 0; i < urls.length; ++i) {
        loader.add('img' + i, urls[i])
      }
      loader.load(this.onLoad.bind(this, config, emitterPosX, emitterPosY))
    }
  }

  // onLoad method to be called once resources are loaded
  onLoad(config, emitterPosX, emitterPosY) {
    this.bg = new PIXI.Sprite(PIXI.Texture.WHITE)
    // bg is a 1px by 1px image
    /* this.bg.scale.x = this.app.renderer.width
    this.bg.scale.y = this.app.renderer.height */
    this.bg.tint = 0x000000
    this.stage.addChild(this.bg)
    // Create the new emitter and attach it to the stage
    let parentType = 0
    function getContainer() {
      switch (parentType) {
        case 1:
          const pc = new PIXI.ParticleContainer()
          pc.setProperties({
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
          })

          return [pc, 'PIXI.ParticleContainer']
        case 2:
          return [new PIXI.particles.LinkedListContainer(), 'PIXI.particles.LinkedListContainer']
        default:
          return [new PIXI.Container(), 'PIXI.Container']
      }
    }
    let [emitterContainer, containerName] = getContainer()
    this.stage.addChild(emitterContainer)

    window.emitter = this.emitter = new PIXI.particles.Emitter(emitterContainer, config)

    // Center on the stage
    this.emitter.updateOwnerPos(emitterPosX, emitterPosY)

    // Start the update
    this.update()
  }

  // Method to start the update loop
  update() {
    this.updateId = requestAnimationFrame(this.update.bind(this))
    this.app.renderer.render(this.stage)
  }

  // Method to stop the update loop
  stopUpdate() {
    cancelAnimationFrame(this.updateId)
  }

  // Method to destroy the emitter
  destroyEmitter() {
    if (this.emitter) {
      this.emitter.destroy()
      this.emitter = null
      // reset SpriteRenderer's batching to fully release particles for GC
      // if (this.app.renderer.plugins && this.app.renderer.plugins.sprite && this.app.renderer.plugins.sprite.sprites)
      // {
      //     this.app.renderer.plugins.sprite.sprites.length = 0;
      // }

      this.app.renderer.render(this.stage)
    }
  }
}

// Assign to global space
window.ParticleExample = ParticleExample
