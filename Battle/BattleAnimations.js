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

  async glob(event, onComplete) {
    const {caster} = event;
    let div = document.createElement("div");
    div.classList.add("glob-orb");
    div.classList.add(caster.team === "player" ? "battle-glob-right" : "battle-glob-left");

    div.innerHTML = (`
      <svg viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="16" fill="${event.color}" />
      </svg>
    `);

    //Remove class when animation is fully complete
    div.addEventListener("animationend", () => {
      div.remove();
    });

    //Add to scene
    document.querySelector(".Battle").appendChild(div);

    await utils.wait(820);
    onComplete();
  }


}