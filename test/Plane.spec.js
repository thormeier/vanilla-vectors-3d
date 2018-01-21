import chai from 'chai'
import Vector from '../src/Vector'
import Line from '../src/Line'
import Plane from '../src/Plane'

chai.should()

describe('Plane', () => {
  it('Should be instantiatable with three vectors', () => {
    const v1 = new Vector(1, 1, 1)
    const v2 = new Vector(1, 0, 0)
    const v3 = new Vector(0, 1, 0)

    const p = new Plane(v1, v2, v3)

    p.p0.should.equal(v1)
    p.n.x.should.equal(-1)
    p.n.y.should.equal(-1)
    p.n.z.should.equal(1)
  })

  it('Should not be instantiatable with two linerly dependent direction vectors', () => {
    const v1 = new Vector(0, 0, 0)
    const v2 = new Vector(2, 0, 0)
    const v3 = new Vector(1, 0, 0)

    const constructor = () => { new Plane(v1, v2, v3) }

    chai.expect(constructor).to.throw(Error, 'Cannot create plane, r1 and r2 are linearly dependent')
  })

  it('Should not get an intersection vector with a parallel line', () => {
    const pv1 = new Vector(0, 0, 0)
    const pv2 = new Vector(1, 0, 0)
    const pv3 = new Vector(0, 1, 0)

    const p = new Plane(pv1, pv2, pv3)

    const lp1 = new Vector(2, 0, 0)
    const lp2 = new Vector(2, 2, 0)

    const l = new Line(lp1, lp2)

    chai.expect(p.getIntersectionWith(l)).to.equal(null)
  })

  it('Should not get an intersection vector of a line that lies within the plane', () => {
    const pv1 = new Vector(0, 0, 0)
    const pv2 = new Vector(1, 0, 0)
    const pv3 = new Vector(0, 1, 0)

    const p = new Plane(pv1, pv2, pv3)

    const lp1 = new Vector(1, 1, 0)
    const lp2 = new Vector(2, 2, 0)

    const l = new Line(lp1, lp2)

    chai.expect(p.getIntersectionWith(l)).to.equal(null)
  })

  it('Should get a single intersection vector of a line that intersects with the plane', () => {
    const pv1 = new Vector(0, 0, 0)
    const pv2 = new Vector(1, 0, 0)
    const pv3 = new Vector(0, 1, 0)

    const p = new Plane(pv1, pv2, pv3)

    const lp1 = new Vector(1, 1, 1)
    const lp2 = new Vector(2, 2, -1)

    const l = new Line(lp1, lp2)

    const i = p.getIntersectionWith(l)

    i.x.should.equal(1.5)
    i.y.should.equal(1.5)
    i.z.should.equal(0)
  })
})
