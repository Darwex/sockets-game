class Utils {
  intersect = (a, b, offset = 0)  => (
      a.x < b.x + b.width + offset &&
      a.x + a.width + offset > b.x &&
      a.y < b.y + b.height + offset &&
      a.height + offset + a.y > b.y
    )

  viewIntersect = (a,b) => this.intersect(a, b, 1)
}

export {
  Utils
}