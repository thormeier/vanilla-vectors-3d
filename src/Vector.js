/**
 * Number of decimals used for calculations
 * @type {number}
 */
const decimals = 15

class Vector {
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x, y, z) { //
    this.x = x
    this.y = y
    this.z = z
  }

  /**
   * Adds one vector to another
   * @param {Vector} b
   * @return {Vector}
   */
  plus (b) {
    return new Vector( //
      this.x + b.x,
      this.y + b.y,
      this.z + b.z
    )
  }

  /**
   * Subtracts one vector from another
   * @param {Vector} b
   * @return {Vector}
   */
  minus (b) {
    return new Vector( //
      this.x - b.x,
      this.y - b.y,
      this.z - b.z
    )
  }

  /**
   * Multiplies this vector with a scalar
   * @param {number} s
   * @return {Vector}
   */
  timesScalar (s) {
    return new Vector( //
      this.x * s,
      this.y * s,
      this.z * s
    )
  }

  /**
   * Calculates the cross product of this and another vector
   * @param {Vector} b
   * @return {Vector}
   */
  cross (b) {
    return new Vector(
      (this.y * b.z - this.z * b.y),
      (this.z * b.x - this.x * b.z),
      (this.x * b.y - this.y * b.x)
    )
  }

  /**
   * Calculates the scalar product of this and another vector
   * @param {Vector} b
   * @return {number}
   */
  scalarProduct (b) {
    return (this.x * b.x) + (this.y * b.y) + (this.z * b.z)
  }

  /**
   * Calculates the length of this vector
   * @return {number}
   */
  get length () {
    return this.getLength()
  }

  /**
   * Calculates the length of this vector
   * @return {number}
   */
  getLength () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  /**
   * Normalizes this vector, i.e. transforms it so its length will be 1
   * @return {Vector}
   */
  normalize () {
    const factor = 1 / this.getLength();

    return new Vector(
      this.x * factor,
      this.y * factor,
      this.z * factor
    )
  }

  /**
   * Rotate this vector around a given axis (x, y or z) in a given angle
   * @param axis
   * @param angle
   * @return {Vector}
   */
  rotate (axis, angle) {
    angle = angle / 180 * Math.PI; // Degrees to radians

    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    return this.applyTransformationMatrix([
      [
        ('x' === axis ? 1 : cos).toFixed(decimals),
        ('z' === axis ? sin : 0).toFixed(decimals),
        ('y' === axis ? -1 * sin : 0).toFixed(decimals)
      ],
      [
        ('z' === axis ? -1 * sin : 0).toFixed(decimals),
        ('y' === axis ? 1 : cos).toFixed(decimals),
        ('x' === axis ? sin : 0).toFixed(decimals)
      ],
      [
        ('y' === axis ? sin : 0).toFixed(decimals),
        ('x' === axis ? -1 * sin : 0).toFixed(decimals),
        ('z' === axis ? 1 : cos).toFixed(decimals)
      ]
    ])
  }

  /**
   * Rotates this vector around a line (represented by its normal vector) by a given angle
   * @param {Vector} vector
   * @param {number} angle
   * @return {Vector}
   */
  rotateAroundVector (vector, angle) {
    const n1 = vector.x;
    const n2 = vector.y;
    const n3 = vector.z;

    angle = angle / 180 * Math.PI; // Degrees to radians

    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    return this.applyTransformationMatrix([
      [
        (((n1 * n1) * (1 - cos)) + cos),
        (((n2 * n1) * (1 - cos)) + (n3 * sin)),
        (((n3 * n1) * (1 - cos)) - (n2 * sin))
      ],
      [
        (((n1 * n2) * (1 - cos)) - (n3 * sin)),
        (((n2 * n2) * (1 - cos)) + cos),
        (((n3 * n2) * (1 - cos)) + (n1 * sin))
      ],
      [
        (((n1 * n3) * (1 - cos)) + (n2 * sin)),
        (((n2 * n3) * (1 - cos)) - (n1 * sin)),
        (((n3 * n3) * (1 - cos)) + cos)
      ]
    ])
  }

  /**
   *
   * @param {Line} axis
   * @param {number} angle
   * @return {Vector}
   */
  rotateAroundLine (axis, angle) {
    const n = axis.l.normalize()

    // Move vector through 0/0/0, rotate, and move back again
    return this.minus(axis.l0).rotateAroundVector(n, angle).plus(axis.l0)
  }

  /**
   * Checks if b is multiple of this vector
   * @param {Vector} b
   * @return {boolean}
   */
  isLinearlyDependentOn (b) {
    // Same
    if (this.x === b.x && this.y === b.y && this.z === b.z) {
      return true
    }

    // Factors of each, if one of those can
    const dx = this.x / b.x
    const dy = this.y / b.y
    const dz = this.z / b.z

    // All factors are the same
    if (dx === dy && dy === dz && dx === dz) {
      return true
    }

    // One factor can produce this vector
    if (b.timesScalar(dx).isEqualTo(this) || b.timesScalar(dy).isEqualTo(this) || b.timesScalar(dz).isEqualTo(this)) {
      return true
    }

    return false
  }

  /**
   * Checks if another vector is the same as this
   * @param {Vector} b
   * @return {boolean}
   */
  isEqualTo (b) {
    return (this.x === b.x)
      && (this.y === b.y)
      && (this.z === b.z)
  }

  /**
   *
   * @param {Array<Array<Number>>} m
   * @return {Vector}
   */
  applyTransformationMatrix (m) {
    return new Vector(
      parseFloat(((m[0][0] * this.x) + (m[1][0] * this.y) + (m[2][0] * this.z)).toFixed(decimals)),
      parseFloat(((m[0][1] * this.x) + (m[1][1] * this.y) + (m[2][1] * this.z)).toFixed(decimals)),
      parseFloat(((m[0][2] * this.x) + (m[1][2] * this.y) + (m[2][2] * this.z)).toFixed(decimals))
    )
  }
}

export default Vector
