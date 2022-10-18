class PizzaStone extends GameObject {
  constructor(config) {
    super(config)
    this.sprite = new this.sprite({
      gameObject: this,
      src: "/images/characters/pizza-stone.png",
      animations: {
        "used-down": [ [0,0] ],
        "unused-down": [ [1,0] ],
      },
      currentAnimation: "used-down"
    })
  }
}