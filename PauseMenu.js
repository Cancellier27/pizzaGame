class PauseMenu {
  constructor({onComplete}) {
    this.onComplete = onComplete
  }

  getOptions(pageKey) {


    if (pageKey === "root") {

      const lineupPizzas = playerState.lineup.map(id => {
        const {pizzaId} = playerState.pizzas[id]
        const base = Pizzas[pizzaId]
        return {
          label: base.name,
          description: base.description,
          handler: () => {
            this.keyboardMenu.setOptions( this.getOptions(id) )
          }
        }
      })
        console.log("aqui")

      return [
        ...lineupPizzas,
        {
          label: "Save",
          description: "save your progress",
          handler: () => {
            // ...
          }
        },
        {
          label: "Close",
          description: "Close the pause menu",
          handler: () => {
            this.close()
          }
        }
      ]
    }

    console.log("chegou aqui")

    const unequipped = Object.keys(playerState.pizzas).filter(id => {
      return playerState.lineup.indexOf(id) === -1
    }).map(id => {
      const {pizzaId} = playerState.pizzas[id]
      const base = Pizzas[pizzaId]
      return {
        label: `Swap for ${base.name}`,
        description: base.description,
        handler: () => {
          //
        }
      }
    })

    return [
      ...unequipped,
      {
        label: "Move to front",
        description: "Move this pizza to the front of the list",
        handler: () => {
          //
        }
      },
      {
        label: "Back",
        description: "Back to root menu",
        handler: () => {
          this.keyboardMenu.setOptions(this.getOptions("root"))
        }
      }
    ]
  }

  createElement() {
    this.element = document.createElement("div")
    this.element.classList.add("PauseMenu")
    this.element.innerHTML = `
      <h2>Pause Menu</h2>
    `
  }

  close() {
    this.esc?.unbind()
    this.keyboardMenu.end()
    this.element.remove()
    this.onComplete()
  }

  async init(container) {
    this.createElement()
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container
    })

    this.keyboardMenu.init(this.element)
    this.keyboardMenu.setOptions(this.getOptions("root"))

    container.appendChild(this.element)

    utils.wait(200)
    this.esc = new KeyPressListener("Escape", () => {
      this.close()
    })
  }
}
