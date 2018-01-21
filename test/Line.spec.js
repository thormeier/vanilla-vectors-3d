import chai from 'chai'
import Vector from '../src/Vector'
import Line from '../src/Line'

chai.should()

describe('Line', () => {
  it('Should be instantiatable with two vectors', () => {
    const v1 = new Vector(1, 0, 0)
    const v2 = new Vector(0, 1, 0)

    const l = new Line(v1, v2)

    l.l0.should.equal(v1)
    l.lPrime.should.equal(v2)
  })

  it('Should rotate by to angles correctly', () => {
    const v1 = new Vector(1, 0, 0)
    const v2 = new Vector(0, 1, 0)
    const vr = new Vector(0, -1, 1)

    const l = new Line(v1, v2)

    l.rotate(90, 90)

    l.l0.should.equal(v1)

    l.l.x.should.equal(0)
    l.l.y.should.equal(-1)
    l.l.z.should.equal(1)
  })

  it('Should rotate around another line correctly', () => {
    const v1 = new Vector(1, 0, 0)
    const v2 = new Vector(0, 1, 0)

    const v3 = new Vector(1, 1, 0)
    const v4 = new Vector(1, 1, 1)

    const l1 = new Line(v1, v2)
    const l2 = new Line(v3, v4)

    l1.rotateAroundLine(l2, 90)

    l1.l0.should.equal(v1)

    l1.l.x.should.equal(-1)
    l1.l.y.should.equal(1)
    l1.l.z.should.equal(0)
  })
})
