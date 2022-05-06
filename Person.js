class Person extends GameObject {
  constructor(config) {
    super(config)
    this.movingProgressRemaining = 0
    this.isStanding = false

    this.inPlayerControlled = config.inPlayerControlled || false

    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1]
    }
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition()
    } else {

      // More cases for startig to walk will come here
      // 
      // 

      // case: we're keyboard ready and habe arrow pressed
      if (!state.map.isCutscenePlaying && this.inPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow
        })
      }
      this.updateSprite(state)
    }
  }

  startBehavior(state, behavior) {
    // set character direction to whatever behavior has
    this.direction = behavior.direction
    if (behavior.type === "walk") {
      // stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {

        behavior.retry && setTimeout(() => {
          this.startBehavior(state, behavior)
        }, 10)
        
        return
      }

      // ready to walk
      state.map.moveWall(this.x, this.y, this.direction)
      this.movingProgressRemaining = 16
      this.updateSprite(state)
    }

    if (behavior.type === "stand") {
      this.isStanding = true
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id
        })
        this.isStanding = false
      }, behavior.time) 
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction]
    this[property] += change
    this.movingProgressRemaining -= 1

    if(this.movingProgressRemaining === 0) {
      // we finish walking

      utils.emitEvent("PersonWalkingComplete", {
        whoId: this.id
      })

    }
  }

  updateSprite() {

    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction)
      return 
    }
    this.sprite.setAnimation("idle-" + this.direction)

  }
}