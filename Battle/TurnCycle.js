class TurnCycle {
  constructor({battle, onNewEvent, onWinner}) {
    this.battle = battle
    this.onWinner = onWinner
    this.onNewEvent = onNewEvent
    this.currentTeam = "player" // or enemy
  }

  async turn() {
    // get the caster
    const casterId = this.battle.activeCombatants[this.currentTeam]
    const caster = this.battle.combatants[casterId]
    const enemyId =
      this.battle.activeCombatants[
        caster.team === "player" ? "enemy" : "player"
      ]
    const enemy = this.battle.combatants[enemyId]

    const submission = await this.onNewEvent({
      type: "submissionMenu",
      caster,
      enemy
    })

    if (submission.instanceId) {

      //Add list to persist to player state later
      this.battle.usedInstanceIds[submission.instanceId] = true

      //removing item from battle state
      this.battle.items = this.battle.items.filter(
        (i) => i.instanceId !== submission.instanceId
      )
    }

    // stop here it we are replacing this pizza
    if (submission.replacement) {
      await this.onNewEvent({
        type: "replace",
        replacement: submission.replacement
      })
      await this.onNewEvent({
        type: "textMessage",
        text: `Go get 'em, ${submission.replacement.name}`
      })
      this.nextTurn()
      return
    }

    const resultingEvents = caster.getReplacedEvents(submission.action.success)

    for (let i = 0; i < resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target
      }
      await this.onNewEvent(event)
    }

    // dit the target die?
    const targetDead = submission.target.hp <= 0
    if (targetDead) {
      await this.onNewEvent({
        type: "textMessage",
        text: `${submission.target.name} is ruined!`
      })

      if (submission.target.team === "enemy") {
        const playerActivePizzaId = this.battle.activeCombatants.player
        const xp = submission.target.givesXp

        console.log(this.battle)

        await this.onNewEvent({
          type: "textMessage",
          text: `${this.battle.combatants[playerActivePizzaId].name} gained ${xp} xp!`
        })

        await this.onNewEvent({
          type: "giveXp",
          xp: 20,
          combatant: this.battle.combatants[playerActivePizzaId]
        })
      }
    }

    // do we have an winnig team?
    const winner = this.getWinningTeam()
    if (winner) {
      await this.onNewEvent({
        type: "textMessage",
        text: "Winner!"
      })
      this.onWinner(winner)
      return
    }

    //we have a dead target, but still no winner, so bring in a replacement
    if (targetDead) {
      const replacement = await this.onNewEvent({
        type: "replacementMenu",
        team: submission.target.team
      })
      await this.onNewEvent({
        type: "replace",
        replacement: replacement
      })
      await this.onNewEvent({
        type: "textMessage",
        text: `${replacement.name} appears!`
      })
    }

    // Check for post events
    // (Do things after your original turn submission)
    const postEvents = caster.getPostEvents()
    for (let i = 0; i < postEvents.length; i++) {
      const event = {
        ...postEvents[i],
        submission,
        action: submission.action,
        caster,
        target: submission.target
      }
      await this.onNewEvent(event)
    }

    // check for status expire
    const expiredEvent = caster.decrementStatus()
    if (expiredEvent) {
      await this.onNewEvent(expiredEvent)
    }

    this.nextTurn()
  }

  nextTurn() {
    this.currentTeam = this.currentTeam === "player" ? "enemy" : "player"
    this.turn()
  }

  getWinningTeam() {
    let aliveTeams = {}
    Object.values(this.battle.combatants).forEach((c) => {
      if (c.hp > 0) {
        aliveTeams[c.team] = true
      }
    })
    if (!aliveTeams["player"]) {
      return "enemy"
    }
    if (!aliveTeams["enemy"]) {
      return "player"
    }
    return null
  }

  async init() {
    await this.onNewEvent({
      type: "textMessage",
      text: `${this.battle.enemy.name} wants to throw down!`
    })

    //starts the first turn
    this.turn()
  }
}
