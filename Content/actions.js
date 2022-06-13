window.Actions = {
  damage1: {
    name: "Whomp!",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      {type: "animation", animation: "spin"},
      {type: "stateChange", damage: 10},
    ],
    description: "Whomp attack"
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
    targetType: "friendly",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      {type: "stateChange", status: {type: "saucy", expiresIn: 3}},
    ],
    description: "Saucy status attack"
  },
  clumsyStatus: {
    name: "Olive Oil",
    success: [
      {type: "textMessage", text: "{CASTER} uses {ACTION}!"},
      {type: "animation", animation: "glob", color: "#dafd2a"},
      {type: "stateChange", status: {type: "clumsy", expiresIn: 3}},
      {type: "textMessage", text: "{TARGET} is slipping all around!"},
    ],
    description: "Clumsy status attack"
  },
  //items
  item_recoverStatus: {
    name: "Heating Lamp",
    description: "Feeling fresh and warm",
    targetType: "friendly",
    success: [
      {type: "textMessage", text: "{CASTER} uses a {ACTION}!"},
      {type: "stateChange", status: null},
      {type: "textMessage", text: "Feeling fresh!"},
    ],
  }
}