const utils = {
  withGrid(n) {
    return n * 16
  },
  asGridCoords(x, y) {
    return `${x * 16},${y * 16}`
  },
  nextPosition(initialX, initialY, direction) {
    let x = initialX
    let y = initialY
    const size = 16
    if (direction === "left") {
      x -= size
    } else if (direction === "right") {
      x += size
    } else if (direction === "up") {
      y -= size
    } else if (direction === "down") {
      y += size
    }
    return {x, y}
  },

  emitEvent(name, detail) {3
    // creating a new Custom event for the browser listem
    const event = new CustomEvent(name, {
      detail
    })
    // dispatch the event just created
    document.dispatchEvent(event)
  },

  oppositeDirection(direction) {
    switch (direction) {
      case "right":
        return "left"
      case "left":
        return "right"
      case "up":
        return "down"
      default: 
        return "up"
    }
  },

  wait(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, ms)
    })
  }


}
