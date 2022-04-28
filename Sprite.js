class Sprite {
  constructor(config) {
    // set up the Image
    this.image = new Image()
    this.image.src = config.src
    this.image.onload = () => {
      this.isLoaded = true
    }

    // shadow
    this.shadow = new Image()
    this.useShadow = true
    if(this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png"
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true
    }

    // configure animation & initial state
    this.animations = config.animations || {
      idleDown: [[0, 0]]
    }
    this.currentAnimation = config.currentAnimation || "idleDown"
    this.currentAnimationFrame = 0

    // reference gameObject
    this.gameObject = config.gameObject
  }

  draw(ctx) {
    const x = this.gameObject.x - 8
    const y = this.gameObject.y - 18

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

    //  wait for the file to load the image
    this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32)
  }
}
