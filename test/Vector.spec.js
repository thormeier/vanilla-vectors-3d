import chai from 'chai'
import Vector from '../src/Vector'
import Line from '../src/Line'

chai.should()

describe('Vector', () => {
  it('Should be instantiatable with three coordinates', () => {
    const v = new Vector(1, 2, 3)

    v.x.should.be.a('number')
    v.x.should.equal(1)

    v.y.should.be.a('number')
    v.y.should.equal(2)

    v.z.should.be.a('number')
    v.z.should.equal(3)
  })

  it('Should add vectors correctly', () => {
    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(4, 5, 6)

    const vr = v1.plus(v2)

    vr.x.should.equal(5)
    vr.y.should.equal(7)
    vr.z.should.equal(9)
  })

  it('Should subrract vectors correctly', () => {
    const v1 = new Vector(4, 5, 6)
    const v2 = new Vector(3, 2, 1)

    const vr = v1.minus(v2)

    vr.x.should.equal(1)
    vr.y.should.equal(3)
    vr.z.should.equal(5)
  })

  it('Should multiply with a scalar correctly', () => {
    const v = new Vector(1, 2, 3)

    const r = v.timesScalar(5)

    r.x.should.equal(5)
    r.y.should.equal(10)
    r.z.should.equal(15)
  })

  it('Should calculate the cross product correctly', () => {
    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(4, 5, 6)

    const r = v1.cross(v2)

    r.x.should.equal(-3)
    r.y.should.equal(6)
    r.z.should.equal(-3)
  })

  it('Should calculate the scalar product correctly', () => {
    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(4, 5, 6)

    const r = v1.scalarProduct(v2)

    r.should.equal(-24)
  })

  it('Should calculate the correct length', () => {
    const v1 = new Vector(1, 0, 0)
    v1.length.should.equal(1)

    const v2 = new Vector(0, 1, 0)
    v2.length.should.equal(1)

    const v3 = new Vector(0, 0, 1)
    v3.length.should.equal(1)

    const v4 = new Vector(2, 2, 2)
    v4.length.should.equal(Math.sqrt(12))
  })

  it('Should normalize correctly', () => {
    const v1 = new Vector(12, 6, 9)
    v1.length.should.equal(16.15549442140351)

    const v2 = v1.normalize()
    v2.length.should.equal(1)
    v2.x.should.equal(0.7427813527082076)
    v2.y.should.equal(0.3713906763541038)
    v2.z.should.equal(0.5570860145311557)

    const v3 = new Vector(1, 2, 3)
    console.log(v3.normalize())
  })

  it('Should rotate around axes correctly', () => {
    // Normal x axis vector should not change when rotated around x-axis
    const v1 = new Vector(1, 0, 0)
    const v1rx = v1.rotate('x', 90)

    v1rx.x.should.equal(1)
    v1rx.y.should.equal(0)
    v1rx.z.should.equal(0)

    // Rotation of zero vector should equal zero vector, i.e. transformation is linear
    const v2 = new Vector(0, 0, 0)
    const v2rx = v2.rotate('x', 70)

    v2rx.x.should.equal(0)
    v2rx.y.should.equal(0)
    v2rx.z.should.equal(0)

    // Some other axis rotation, that actually does something
    const v3 = new Vector(1, 0, 0)
    const v3ry = v3.rotate('y', 90)

    v3ry.x.should.equal(0)
    v3ry.y.should.equal(0)
    v3ry.z.should.equal(-1)

    const v4 = new Vector(1, 0, 0)
    const v4ry = v4.rotate('z', 90)

    v4ry.x.should.equal(0)
    v4ry.y.should.equal(1)
    v4ry.z.should.equal(0)
  })

  it('Should rotate aound a line represented by its normal vector correctly', () => {
    const v = new Vector(12, 13, 14) // Vector to rotate
    const vl = new Vector(3, 2, 1) // Line vector

    const vr = v.rotateAroundVector(vl.normalize(), 90)

    vr.x.should.equal(20.29463291440065)
    vr.y.should.equal(2.839305599770126)
    vr.z.should.equal(9.437490057257795)
  })

  it('Should rotate around a line correctly', () => {
    const vl0 = new Vector(1, 2, 3)
    const vl = new Vector(5, 3, 2)

    const l = new Line(vl0, vl)

    const v = new Vector(3, 2, 1)

    const vr = v.rotateAroundLine(l, 90)

    vr.x.should.equal(2.750817701431191)
    vr.y.should.equal(3.969769117928651)
    vr.z.should.equal(1.973039923653413)
  })

  it('Should identify linearly dependent vectors correctly', () => {
    const v1 = new Vector(1, 1, 1)
    const v2 = new Vector(15, 15, 15)
    const v3 = new Vector(15, 15, 16)

    v1.isLinearlyDependentOn(v2).should.equal(true)
    v2.isLinearlyDependentOn(v1).should.equal(true)

    v1.isLinearlyDependentOn(v3).should.equal(false)
    v2.isLinearlyDependentOn(v3).should.equal(false)

    v3.isLinearlyDependentOn(v1).should.equal(false)
    v3.isLinearlyDependentOn(v2).should.equal(false)
  })
})
