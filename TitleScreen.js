class TitleScree {
  constructor({ progress }) {
    this.progress = progress
  }

  getOptions(resolve) {
    return [
      {
        label: "New Game",
        description: "Start a new pizza adventure!",
        handler: () => {
          this.close()
          resolve()
        }
      },
      // maybe insert a Continue here
    ]
  }

  createElement() {
    this.element = document.createElement("div")
    this.element.classList.add("TitleScreen")
    this.element.innerHTML = (`
    <img class="TitleScreen" src="/imgaes/logo.png" alt="Pizza Legends">
    `)

  }

  close() {
    this.keyboardMenu.end()
    this.element.remove()
  }

  init(container) {
    return new Promise(resolve => {
      this.createElement()
      container.appenChild(this.element)
      this.keyboardMenu = new keyboardMenu()
      this.keyboardMenu.init(this.element)
      this.keyboardMenu.setOptions(this.getOptions(resolve))
    })
  }

}