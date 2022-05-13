class TurnCycle {
  constructor({battle, onNewEvent}) {
    this.battle = battle
    this.onNewEvent = onNewEvent
    this.currentTeam = "player" // or enemy
  }

  async turn() {
    // get the caster
    const casterId = this.battle.activeCombatants[this.currentTeam]
    const caster = this.battle.combatants[casterId]

    const submission = await this.onNewEvent({
      type: "submissionMenu",
      caster
    })

  }

  async init() {
    await this.onNewEvent({
      type: "textMessage",
      text: "the battle is starting!"
    })

    //starts the first turn
    this.turn()
  }

}