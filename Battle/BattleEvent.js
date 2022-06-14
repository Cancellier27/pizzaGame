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
      items: this.battle.items,
      onComplete: submission => {
        // submission { what move to use, who to use it on...}
        resolve(submission)
      }
    })
    menu.init(this.battle.element)
  }

  async stateChange(resolve) {
    const {caster, target, damage, recover, status, action} = this.event
    let who = this.event.onCaster ? caster : target

    if(damage) {
      // modify the target to have less HP
      target.update({
        hp: target.hp - damage
      })

      // start blinking
      target.pizzaElement.classList.add("battle-damage-blink")
    }

    if(recover) {
      let newHp = who.hp + recover
      if(newHp > who.maxHp) {
        newHp = who.maxHp
      }
      who.update({
        hp: newHp
      })
    }

    if(status === null) {
      who.update({
        status: null
      })
    }

    if(status) {
      who.update({
        status: {...status}
      })
    }
    
    
    //wait a little bit
    await utils.wait(600)

    //stop blinking
    target.pizzaElement.classList.remove("battle-damage-blink")
    
    resolve()

  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation]
    fn(this.event, resolve)
  }

  init(resolve) {
    this[this.event.type](resolve)
  }

}