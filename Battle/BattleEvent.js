class BattleEvent {
  constructor(event, battle) {
    this.event = event
    this.battle = battle
  }

  textMessage(resolve) {

    const text = this.event.text
    .replace("{CASTER}", this.event.caster?.name)
    .replace("{TARGET}", this.event.target?.name)
    .replace("{ACTION}", this.event.action?.name)



    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve()
      }
    })
    message.init(this.battle.element)
  }

  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      onComplete: submission => {
        // submission { what move to use, who to use it on...}
        resolve(submission)
      }
    })
    menu.init(this.battle.element)
  }

  stateChange(resolve) {
    const {caster, target, damage} = this.event
    if(damage) {
      // modify the target to have less HP

      // start blinking
    }

    //wait a little bit
    //stop blinking
    
    resolve()

  }

  init(resolve) {
    this[this.event.type](resolve)
  }

}