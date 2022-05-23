window.Actions = {
  damage1: {
    name: "Whomp!",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      {type: "animation", animation: "spin"},
      {type: "stateChange", damage: 10},
    ]
  },
  damage2: {
    name: "Pickle!",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      {type: "animation", animation: "spin"},
      {type: "stateChange", damage: 10},
    ]
  },
  saucyStatus: {
    name: "Tomato Squeeze!",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      {type: "stateChange", status: {type: "saucy", expiresIn: 3}},
    ]
  },
}
