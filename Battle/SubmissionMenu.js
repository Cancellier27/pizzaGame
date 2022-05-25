class SubmissionMenu {
  constructor({caster, enemy, onComplete}) {
    this.caster = caster
    this.onComplete = onComplete
    this.enemy = enemy
  }

  getPages() {
    return{
      root: [
        {
          label: "Attack",
          description: "Choose an attack",
          handler: () => {
            // so smt when chosen
            console.log("working")
          }
        },
        {
          label: "Items",
          description: "Choose an item",
          handler: () => {
            // go to items
          }
        },
        {
          label: "Swap",
          description: "Change to another pizza",
          handler: () => {
            // see pizza options
          }
        }
      ],
      attacks: [

      ]
    }
  }

  decide() {
    this.onComplete({
      action: Actions[ this.caster.actions[0] ],
      target: this.enemy
    })
  }

  showMenu(container) {
    this.keyboardMenu = new KeyboardMenu()
    this.keyboardMenu.init(container)
    this.keyboardMenu.setOptions( this.getPages().root )
  }

  init(container) {

    if(this.caster.isPlayerControlled) {
      // show some ui
      this.showMenu(container)
    } else {

      this.decide()
    }

  }
  
}