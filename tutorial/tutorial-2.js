// START
const Application = PIXI.Application
const Graphics = PIXI.Graphics

const app = new Application({
  width: 500,
  height: 500,
  transparent: true,
  antialias: true
})

app.renderer.background.color = 0x23395d
app.renderer.resize(window.innerWidth, window.innerHeight)
app.renderer.view.style.position = 'absolute'

document.body.appendChild(app.view)

// USING SPRITESHEETS.
async function loadSprites() {
  const spriteSheetTexture = PIXI.Assets.load('./tutorial_assets/images/tileset.png').then(
    (spriteSheetTexture) => {
      const rect1 = new PIXI.Rectangle(176, 160, 76, 86)
      spriteSheetTexture.frame = rect1
      const spriteSheet = PIXI.Sprite.from(spriteSheetTexture)
      spriteSheet.scale.set(1.1, 1.1)
      app.stage.addChild(spriteSheet)
    }
  )
}

loadSprites()