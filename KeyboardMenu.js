class KeyboardMenu {
  constructor() {
    this.options = []  // set by updater method
    this.up = null
    this.down = null
    this.prevFocus = null
  }

  setOptions(option) {
    this.options = option
    this.element.innerHTML = this.options.map((option, index) => {
      const disabledAttr = option.desabled ? "disabled" : ""
      return (`
        <div class="option">
          <button ${disabledAttr} data-button="${index}" data-description="${option.description}" >
            ${option.label}
          </button>
          <span class="right">${option.right ? option.right() : ""}</span>
        </div>
      `)
    }).join("")
  }

  createElement() {
    this.element = document.createElement("div")
    this.element.classList.add("KeyboardMenu")
  }

  init(container) {
    this.createElement()
    container.appendChild(this.element)
  }


}