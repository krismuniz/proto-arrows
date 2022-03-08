import { interpolateCubicBezier, interpolateCubicBezierAngle } from '../src/interpolation'
import { easeInOutCubic } from './beziers'

describe('interpolateCubicBezier', function () {
  it('correctly interpolates a cubic bezier', function () {
    expect(interpolateCubicBezier(easeInOutCubic, 0)).toEqual({ x: 0, y: 100 })
    expect(interpolateCubicBezier(easeInOutCubic, 0.25)).toEqual({ x: 33.90625, y: 43.890625 })
    expect(interpolateCubicBezier(easeInOutCubic, 0.5)).toEqual({ x: 50, y: 25.375 })
    expect(interpolateCubicBezier(easeInOutCubic, 0.75)).toEqual({ x: 66.09375, y: 44.171875 })
    expect(interpolateCubicBezier(easeInOutCubic, 1)).toEqual({ x: 100, y: 100 })
  })
})

describe('interpolateCubicBezierAngle', function () {
  it('correctly interpolates a cubic bezier and gets its angle', function () {
    expect(interpolateCubicBezierAngle(easeInOutCubic, 0)).toBeCloseTo(-56.9761, 4)
    expect(interpolateCubicBezierAngle(easeInOutCubic, 0.25)).toBeCloseTo(-59.4086, 4)
    expect(interpolateCubicBezierAngle(easeInOutCubic, 0.5)).toBeCloseTo(0.8185, 4)
    expect(interpolateCubicBezierAngle(easeInOutCubic, 0.75)).toBeCloseTo(59.47166, 4)
    expect(interpolateCubicBezierAngle(easeInOutCubic, 1)).toBeCloseTo(56.7125, 4)
  })
})
