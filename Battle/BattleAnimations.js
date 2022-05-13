window.BattleAnimations = {
  async spin(event, onComplete) {
    const element = event.caster.pizzaElement
    const animationCalssName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left"
    element.classList.add(animationCalssName)

    // remove class when animation is finished
    element.addEventListener("animationend", () => {
      element.classList.remove(animationCalssName)
    }, {once: true})

    // continue battle cycle right when the pizza colides
    await utils.wait(100)
    onComplete()
  },
}