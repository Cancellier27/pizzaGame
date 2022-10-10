class Hud {
  constructor () {
    this.scoreboards = []
  }

  update() {
    this.scoreboards.forEach(s => {
      // update me!
    })
  }

  createElement() {
    this.element = document.createElement("div")
    this.element.classList.add("Hud")

    const {playerState} = window
    playerState.lineup.forEach( key => {
      const pizza = playerState.pizzas[key];
      const scoreboard = new Combatant({
        id: key,
        ...Pizzas[pizza.pizzaId],
        ...pizza,
      }, null)
      scoreboard.createElement()
      this.scoreboards.push(scoreboard)
      this.element.appendChild(scoreboard.hudElement)
    })
    this.update()
  }

  init(container) {
    this.createElement()
    container.appendChild(this.element)
  }

}
