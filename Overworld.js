class Overworld {
  constructor(config) {
    this.element = config.element
    this.canvas = this.element.querySelector(".game-canvas")
    this.ctx = this.canvas.getContext("2d")
  }

  init() {
    // draw the map first
    const image = new Image()
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0)
    }
    image.src = "/images/maps/Demolower.png"

    // hero position
    const x = 5
    const y = 6

    // draw the shadow under the hero character
    const shadow = new Image()
    shadow.onload = () => {
      this.ctx.drawImage(
        shadow,
        0, // left cut
        0, // right cut
        32, // width of cut
        32, // height of cut
        x * 16 - 8, // compensating with the tile size
        y * 16 - 18, // compensating with the tile size
        32, // zoom
        32 // zoom
      )
    }
    shadow.src = "/images/characters/shadow.png"

    // draw the hero second
    const hero = new Image()
    hero.onload = () => {
      this.ctx.drawImage(
        hero,
        0, // left cut
        0, // right cut
        32, // width of cut
        32, // height of cut
        x * 16 - 8, // compensating with the tile size
        y * 16 - 18, // compensating with the tile size
        32, // zoom
        32 // zoom
      )
    }
    hero.src = "/images/characters/people/hero.png"
  }
}

// asprite to edit pixelArt
