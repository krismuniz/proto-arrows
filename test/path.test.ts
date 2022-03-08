import { getBoxToBoxCurve, getCubicBezierSVGPath, getCurve, getLineCenter } from '../src/path'
import { easeInOutCubic } from './beziers'

describe('getLineCenter', function () {
  it('properly gets the center point using linear interpolation', function () {
    expect(getLineCenter({ x: 0, y: 0 }, { x: 10, y: 10 })).toEqual({ x: 5, y: 5 })
    expect(getLineCenter({ x: 0, y: 0 }, { x: -10, y: -10 })).toEqual({ x: -5, y: -5 })
    expect(getLineCenter({ x: 0, y: 0 }, { x: 0, y: 10 })).toEqual({ x: 0, y: 5 })
    expect(getLineCenter({ x: 0, y: 0 }, { x: 10, y: 0 })).toEqual({ x: 5, y: 0 })
  })
})

describe('getCubicBezierSVGPath', function () {
  it('returns a proper svg path in the correct format', function () {
    expect(getCubicBezierSVGPath(easeInOutCubic)).toEqual('M0,100 C65,0 35,1 100,100')
  })
})

describe('getCurve', function () {
  it('returns the right curve given two points', function () {
    expect(getCurve({ x: 0, y: 0 }, { x: 10, y: 10 })).toMatchSnapshot()
    expect(getCurve({ x: 0, y: 0 }, { x: -10, y: -10 })).toMatchSnapshot()
    expect(getCurve({ x: 0, y: 0 }, { x: 0, y: 10 })).toMatchSnapshot()
    expect(getCurve({ x: 0, y: 0 }, { x: 10, y: 0 })).toMatchSnapshot()
  })
})

describe('getBoxToBoxCurve', function () {
  it('returns the right curve given two boxes', function () {
    expect(getBoxToBoxCurve({ x: 0, y: 0, w: 4, h: 4 }, { x: 0, y: 0, w: 4, h: 4 })).toMatchSnapshot()
    // on the right side of the other box
    expect(getBoxToBoxCurve({ x: 0, y: 0, w: 4, h: 4 }, { x: 4, y: 0, w: 4, h: 4 })).toMatchSnapshot()
    // above the other one
    expect(getBoxToBoxCurve({ x: 0, y: 0, w: 4, h: 4 }, { x: 0, y: -4, w: 4, h: 4 })).toMatchSnapshot()
    // below the other one
    expect(getBoxToBoxCurve({ x: 0, y: 0, w: 4, h: 4 }, { x: 0, y: 4, w: 4, h: 4 })).toMatchSnapshot()
    // left side of the other box
    expect(getBoxToBoxCurve({ x: 0, y: 0, w: 4, h: 4 }, { x: -4, y: 0, w: 4, h: 4 })).toMatchSnapshot()
  })
})
