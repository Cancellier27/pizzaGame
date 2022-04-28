class Overworld {
  constructor(config) {
    this.element = config.element
    this.canvas = this.element.querySelector(".game-canvas")
    this.ctx = this.canvas.getContext("2d")
    this.map = null
  }

  // start the game loog fireing on every single frame loaded
  // like 60hz it will be called 60 times in a sec
  startGameLoop() {
    const step = () => {

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // draw lower Layer
      this.map.drawLowerImage(this.ctx)

      // draw game Objects
      Object.values(this.map.gameObjects).forEach(object => {
        // object.x += 0.02
        object.sprite.draw(this.ctx)
      })
      
      // draw Upper Layer
      this.map.drawUpperImage(this.ctx)
      
      requestAnimationFrame(() => {
        step()
      })
    }
    step()
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.Kitchen)
    this.startGameLoop()

    

  }
}

// asprite to edit pixelArt
