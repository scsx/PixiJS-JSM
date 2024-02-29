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
// app.view is the canvas itself.
app.renderer.view.style.position = 'absolute'

document.body.appendChild(app.view)

// DRAW STUFF.
const rectangle = new Graphics()
rectangle.beginFill(0xaa33bb)
rectangle.lineStyle(4, 0xff33bb, 1)
rectangle.drawRect(200, 200, 100, 120)
rectangle.endFill()
// ^ same as rectangle.beginFill(0xaa33bb).lineStyle(4, 0xFF33bb, 1).drawRect(200, 200, 100, 120).endFill()

app.stage.addChild(rectangle)

const poly = new Graphics()
poly
  .beginFill(0x2266ff)
  .lineStyle(4, 0xffaa77, 1)
  .drawPolygon([600, 50, 800, 150, 900, 300, 400, 400])
  .endFill()

app.stage.addChild(poly)

const circle = new Graphics()
circle.beginFill(0x22ccff).drawCircle(440, 200, 80).endFill()

app.stage.addChild(circle)

const line = new Graphics()
line.lineStyle(5, 0xffea00, 1).moveTo(200, 100).lineTo(300, 300)

app.stage.addChild(line)

const torus = new Graphics()
torus.beginFill(0xfffddd).drawTorus(200, 500, 80, 100, 0, Math.PI / 2)

app.stage.addChild(torus)

const star = new Graphics()
star.beginFill(0xffea00).drawStar(600, 500, 100, 80)

app.stage.addChild(star)

const myTextStyle = new PIXI.TextStyle({
  fontFamily: 'sans-serif',
  fontSize: 48,
  fill: 'deepskyblue',
  stroke: '#FFFFFF',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowDistance: 10,
  dropShadowAngle: Math.PI / 2,
  dropShadowBlur: 4,
  dropShadowColor: '#000000'
})
const myText = new PIXI.Text('Hello World', myTextStyle)

app.stage.addChild(myText)

myText.text = 'Text changed!'
myText.style.wordWrap = true
myText.style.wordWrapWidth = 100
myText.style.align = 'center'

// ADD STUFF AUTOMATICALLY.
/* app.ticker.add((delta) => loop(delta))

function loop(delta) {
  const autoRectangle = new Graphics()
  rectangle.beginFill(0xFF33bb)
  rectangle.drawRect(Math.random() * app.screen.width, Math.random() * app.screen.height, 10, 10)
  rectangle.endFill()

  app.stage.addChild(autoRectangle)
} */

// LOAD IMAGES.
// 1
// const char1Texture = PIXI.Texture.from('./tutorial_assets/images/char1.png')
// const char1Sprite = new PIXI.Sprite(char1Texture)
// or 2 (shorter)
const char1Sprite = PIXI.Sprite.from('./tutorial_assets/images/char1.png')
app.stage.addChild(char1Sprite)

// WORK WITH IMAGES.
// char1Sprite.width = 500
// char1Sprite.height = 500

// char1Sprite.scale.x = 1.5
// char1Sprite.scale.y = 2

char1Sprite.scale.set(1.2, 1.2)

char1Sprite.x = 200
char1Sprite.y = 200

// ANIMATE
app.ticker.add((delta) => loopChar(delta))

const loopChar = (delta) => {
  char1Sprite.rotation += 0.01
  char1Sprite.x += 1
  // Back to the left when out of screen:
  if (char1Sprite.x > app.screen.width) {
    char1Sprite.x = 0
  }
}

char1Sprite.rotation = 1
// define center like in transform-origin
//char1Sprite.anchor.x = 0.5
//char1Sprite.anchor.y = 0.5 // or:
char1Sprite.anchor.set(0.5, 0.5)

// CLICK.
// char1Sprite.interactive = true // v6.
char1Sprite.eventMode = 'static' // v7.
char1Sprite.buttonMode = true // cursor: pointer v6.
char1Sprite.cursor = 'pointer' // cursor: pointer v7.

char1Sprite.on('pointerdown', () => {
  char1Sprite.scale.x += 0.1
  char1Sprite.scale.y += 0.1
})

// EVENTS.
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') char1Sprite.x += 10
  if (e.key === 'ArrowLeft') char1Sprite.x -= 10
})

// CONTAINERS.
const container = new PIXI.Container()
const char2Sprite = PIXI.Sprite.from('./tutorial_assets/images/char2.png')
const char3Sprite = PIXI.Sprite.from('./tutorial_assets/images/char3.png')
container.addChild(char2Sprite, char3Sprite)

app.stage.addChild(container)
char3Sprite.position.set(100, 200) // Relative to container. To know relative to document use char3Sprite.getGlobalPosition()
container.x = 30
container.y = 140

// PARTICLE CONTAINERS.
const particleContainer = new PIXI.ParticleContainer(1000, {
  position: true,
  rotation: true,
  vertices: true,
  tint: true,
  uvs: true
})

// const loader = PIXI.Loader.shared... // v6
// v7
async function loadCharacter4() {
  const char4texture = PIXI.Assets.load('./tutorial_assets/images/char4.png').then(
    (char4texture) => {
      const char4Sprite = PIXI.Sprite.from(char4texture)
      char4Sprite.x = 30
      char4Sprite.y = 600
      app.stage.addChild(char4Sprite)
    }
  )
}

loadCharacter4()
