class Overworld {
  constructor(config) {
    this.element = config.element
    this.canvas = this.element.querySelector(".game-canvas")
    this.ctx = this.canvas.getContext("2d")
  }

  // start the game loog fireing on every single frame loaded
  // like 60hz it will be called 60 times in a sec
  startGameLoop() {
    const step = () => {
      requestAnimationFrame(() => {
        step()
      })
    }
    step()
  }

  init() {

    this.startGameLoop()

    // draw the map first
    const image = new Image()
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0)
    }
    image.src = "/images/maps/DemoLower.png"

    //place some Game Objects (characters)
    const hero = new GameObject({
      x: 5, y: 6,
    })

    const npc1 = new GameObject({
      x: 7, y: 9,
      src: "/images/characters/people/npc1.png"
    })

    // draw the hero and npc1 on the screen

    // setTimeout(() => {
    //   hero.sprite.draw(this.ctx)
    //   npc1.sprite.draw(this.ctx)
    // }, 200)

  }
}

// asprite to edit pixelArt
