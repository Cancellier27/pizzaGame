class Overworld {
  constructor(config) {
    this.element = config.element
    this.canvas = this.element.querySelector(".game-canvas")
    this.ctx = this.canvas.getContext("2d")
    this.map = null
    this.fps = 60
  }

  // start the game loog fireing on every single frame loaded
  // like 60hz it will be called 60 times in a sec
  startGameLoop() {
    const step = () => {

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      
      // estabilish the camera person
      const cameraPerson = this.map.gameObjects.hero

      //update all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction
        })
      })

      // draw lower Layer
      this.map.drawLowerImage(this.ctx, cameraPerson)

      // draw game Objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson)
      })
      
      // draw Upper Layer
      this.map.drawUpperImage(this.ctx, cameraPerson)

      // set 60 fps game
        setTimeout(() => {   
        requestAnimationFrame(() => {
          step()
        })
      }, 1000 / this.fps)
    }
    step()
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom)
    
    this.directionInput = new DirectionInput()
    this.directionInput.init() 
    this.directionInput.direction // down
    
    this.startGameLoop()
  }
}

// asprite to edit pixelArt

