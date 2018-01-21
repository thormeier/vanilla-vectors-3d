class Line {
  /**
   * A line given by two vectors
   * @param {Vector} l0 Base vector
   * @param {Vector} l  Direction vector
   */
  constructor (l0, l) {
    this.l0 = l0
    this.l = l.minus(l0) // Direction vector
    this.lPrime = l // We might need it further down, though
  }

  /**
   * Rotates a line by two given angles
   * @param {number} alpha
   * @param {number} beta
   */
  rotate (alpha, beta) {
    if (alpha > 0) {
      this.l = this.l.rotate('x', alpha)
    }

    if (beta > 0) {
      this.l = this.l.rotate('z', beta)
    }
  }

  /**
   * Rotates a line by another line
   * @param line
   * @param angle
   * @return {Line}
   */
  rotateAroundLine (line, angle) {
    return new Line(
      this.l0.rotateAroundLine(line, angle),
      this.lPrime.rotateAroundLine(line, angle)
    )
  }
}

export default Line
