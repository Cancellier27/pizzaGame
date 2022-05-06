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
          arrow: this.directionInput.direction,
          map: this.map,
        })
      })

      // draw lower Layer
      this.map.drawLowerImage(this.ctx, cameraPerson)

      // draw game Objects
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y
      }).forEach(object => {
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

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      // Is there a person here to talk to?
      this.map.checkForActionCutscene()
    })
  }

  bindHeroPositionback() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "hero") {
        // hero position has changed
        this.map.checkForFootstepCutscene()
      } 
    })
  }

  startMap(mapConfig) {
    this.map = new OverworldMap(mapConfig)
    this.map.overworld = this
    this.map.mountObjects()
  }

  init() {
    this.startMap(window.OverworldMaps.DemoRoom)

    this.bindActionInput()
    this.bindHeroPositionback()
    
    this.directionInput = new DirectionInput()
    this.directionInput.init() 
    // this.directionInput.direction // down
    
    this.startGameLoop()

    // this.map.startCutscene([
    //   {who: "hero", type: "walk", direction: "down"},
    //   {who: "hero", type: "walk", direction: "down"},
    //   {who: "npcA", type: "walk", direction: "up"},
    //   {who: "npcA", type: "walk", direction: "left"},
    //   {who: "hero", type: "stand", direction: "right", time: 200},
    //   {type: "textMessage", text: "Hello There"}
    //   // {who: "npcA", type: "stand", direction: "up", time: 800},
    // ])
  }
}

// asprite to edit pixelArt


// stopped https://www.youtube.com/watch?v=U7fYOnedjzs&list=PLcjhmZ8oLT0r9dSiIK6RB_PuBWlG1KSq_&index=9&ab_channel=DrewConley
// 15 min

