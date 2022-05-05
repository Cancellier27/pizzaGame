class GameObject {
  constructor(config) {
    this.isMounted = false
    this.id = null
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/hero.png"
    })

    this.behaviorLoop = config.behaviorLoop || []
    this.behaviorLoopIndex = 0
  }

  mount(map) {
    console.log("mounting!")
    this.isMounted = true
    map.addWall(this.x, this.y)

    // if we have a behavior, kick off after a shor delay
    setTimeout(() => {
      this.doBehaviorEvent(map)
    }, 10)
  }

  update() {}

  async doBehaviorEvent(map) {

    //Don't do anything if there is a more importante cutscene or I do not have config to 
    // do anything anyway.
    if(map.isCutscenePlaying || this.behaviorLoop.length === 0) {
      return
    }

    // setting up our event with relevant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
    // create a new data line into the beahviorLoop object called who with its name, like hero or npcA
    eventConfig.who = this.id 

    // create an event instance out of our next event config
    const eventHandler = new OverworldEvent({map, event: eventConfig})
    // await this code to finish complete and then go forward
    await eventHandler.init()

    // setting the next event to fire
    this.behaviorLoopIndex += 1
    if(this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0
    }

    // do it again!
    this.doBehaviorEvent(map)

  }

}
