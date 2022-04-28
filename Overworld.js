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
        object.x += 1
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
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
    this.startGameLoop()

    

  }
}

// asprite to edit pixelArt

// 4:10
// https://www.youtube.com/watch?v=AMHHUIkUX-g&list=PLcjhmZ8oLT0r9dSiIK6RB_PuBWlG1KSq_&index=4&ab_channel=DrewConley
