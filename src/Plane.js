class Plane {
  /**
   * A plane, described by three vectors that form it
   * @param {Vector} p0
   * @param {Vector} a
   * @param {Vector} b
   */
  constructor (p0, a, b) {
    const r1 = a.minus(p0) // First direction vector
    const r2 = b.minus(p0) // Second direction vector

    if (r1.isLinearlyDependentOn(r2)) {
      throw new Error('Cannot create plane, r1 and r2 are linearly dependent')
    }

    // Normal form
    this.n = r2.cross(r1) // Normal vector
    this.p0 = p0
  }

  /**
   * Calculates an intersection with a line
   * @param {Line} line
   * @return {null|Vector}
   */
  getIntersectionWith (line) {
    const a = this.p0.minus(line.l0).scalarProduct(this.n)
    const b = line.l.scalarProduct(this.n)

    // If a is 0 = line is parallel, if b is 0 = line is on the plane
    if (0 === a || 0 === b) {
      return null
    }

    const d = a / b

    return line.l.timesScalar(d).plus(line.l0);
  }
}

export default Plane
