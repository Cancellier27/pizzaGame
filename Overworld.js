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
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map
        })
      })

      // draw lower Layer
      this.map.drawLowerImage(this.ctx, cameraPerson)

      // draw game Objects
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y
        })
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson)
        })

      // draw Upper Layer
      this.map.drawUpperImage(this.ctx, cameraPerson)

      // set 60 fps game
      if(!this.map.isPaused) {
        setTimeout(() => {
          requestAnimationFrame(() => {
            step()
          })
        }, 1000 / this.fps)
      }
    }
    step()
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      // Is there a person here to talk to?
      this.map.checkForActionCutscene()
    })
    new KeyPressListener("Escape", () => {
      if (!this.map.isCutscenePlaying) {
        this.map.startCutscene([{type: "pause"}])
      }
    })
  }

  bindHeroPositionback() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "hero") {
        // hero position has changed
        this.map.checkForFootstepCutscene()
      }
    })
  }

  startMap(mapConfig, heroInitialState=null) {
    this.map = new OverworldMap(mapConfig)
    this.map.overworld = this
    this.map.mountObjects()
    
    if(heroInitialState) {
      this.map.gameObjects.hero.x = heroInitialState.x
      this.map.gameObjects.hero.y = heroInitialState.y
      this.map.gameObjects.hero.direction = heroInitialState.direction
    }

  }

  init() {
    this.hud = new Hud()
    this.hud.init(document.querySelector(".game-container"))

    this.startMap(window.OverworldMaps.Street)

    this.bindActionInput()
    this.bindHeroPositionback()

    this.directionInput = new DirectionInput()
    this.directionInput.init()
    // this.directionInput.direction // down

    this.startGameLoop()

    // this.map.startCutscene([
    //   {type: "battle", enemyId: "beth"}
    //   // {type: "changeMap", map: "DemoRoom"}
    //   // {type: "textMessage", text: "This is my very fist message to you mate!"}
    // ])
  }
}

// asprite to edit pixelArt
