class PauseMenu {
  constructor({onComplete}) {
    this.onComplete = onComplete

  }

  getOptions(pageKey) {
    if (pageKey = "root") {
      return [
        // All of our pizza dynamic
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
    
    return []
  }

  createElement() {
    this.element = document.createElement("div")
    this.element.classList.add("PauseMenu")
    this.element.innerHTML = (`
      <h2>Pause Menu</h2>
    `)
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




