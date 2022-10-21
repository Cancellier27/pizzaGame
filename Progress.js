class Progress {
  constructor() {
    this.mapId = "DemoRoom",
    this.StartingHeroX = 0
    this.StartingHeroY = 0
    this.StartingHeroDirection = "down"
    this.saveFileKey = "PizzaLegends_SaveFile1"
  }

  save() {
    window.localStorage.setItem(this.saveFileKey, JSON.stringify({
      mapId: this.mapId,
      StartingHeroX: this.StartingHeroX,
      StartingHeroY: this.StartingHeroY,
      StartingHeroDirection: this.StartingHeroDirection,
      playerState: {
        pizzas: playerState.pizzas,
        lineup: playerState.lineup,
        items: playerState.items,
        storyFlags: playerState.storyFlags
      }    
    }))
  }

  getSaveFile() {
    const file = window.localStorage.getItem(this.saveFileKey)
    return file ? JSON.parse(file) : null
  }

  load() {
    const file = this.getSaveFile()
    if(file) {
      this.mapId = file.mapId
      this.StartingHeroX = file.StartingHeroX
      this.StartingHeroY = file.StartingHeroY 
      this.StartingHeroDirection = file.StartingHeroDirection 
      Object.keys(file.playerState).forEach(key => {
        playerState[key] = file.playerState[key]
      })
    }
  }


}
