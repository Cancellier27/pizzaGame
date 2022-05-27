class SubmissionMenu {
  constructor({caster, enemy, onComplete}) {
    this.caster = caster
    this.onComplete = onComplete
    this.enemy = enemy
  }

  getPages() {

    const backOption = {
      label: "Go Back",
      description: "Return to previous page",
      handler: () => {
        this.keyboardMenu.setOptions(this.getPages().root)
      }
    }

    return {
      root: [
        {
          label: "Attack",
          description: "Choose an attack",
          handler: () => {
            // so smt when chosen
            this.keyboardMenu.setOptions(this.getPages().attacks)
          }

        },
        {
          label: "Items",
          description: "Choose an item",
          handler: () => {
            // go to items
            this.keyboardMenu.setOptions(this.getPages().items)
          }
        },
        {
          label: "Swap",
          description: "Change to another pizza",
          handler: () => {
            // see pizza options
            this.keyboardMenu.setOptions(this.getPages().swap)
          }
        }
      ],
      attacks: [
        ...this.caster.actions.map(key => {
          const action = Actions[key]
          return {
            label: action.name,
            description: action.description,
            handler: () => {
              this.menuSubmit(action)
            }
          }
        }),
        backOption,
      ],
      items: [
        //items will go here
        backOption
      ],
      swap: [
        //items will go here 
        backOption
      ],

    }
  }

  menuSubmit(action, instanceId=null) {

    this.keyboardMenu?.end()

    this.onComplete({
      action,
      target: action.target === "friendly" ? this.caster : this.enemy
    })
  }

  decide() {
    // todo: enemies should decide what to do
    this.menuSubmit(Actions[this.caster.actions[0]])
  }

  showMenu(container) {
    this.keyboardMenu = new KeyboardMenu()
    this.keyboardMenu.init(container)
    this.keyboardMenu.setOptions(this.getPages().root)
  }

  init(container) {
    if (this.caster.isPlayerControlled) {
      // show some ui
      this.showMenu(container)
    } else {
      this.decide()
    }
  }
}
