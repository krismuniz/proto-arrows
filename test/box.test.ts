import { getBoxBounds, getIdealBoxSides, isPointOnLeftOrRightSide } from '../src/box'

describe('getBoxBounds', function () {
  it('properly returns all bounds of a rectangle', function () {
    expect(getBoxBounds({ x: 0, y: 0, w: 10, h: 10 })).toEqual([
      { x: 0, y: 5 },
      { x: 10, y: 5 },
      { x: 5, y: 0 },
      { x: 5, y: 10 }
    ])
  })
})

describe('getIdealBoxSides', function () {
  it('properly finds the ideal points to draw a path from/to', function () {
    expect(getIdealBoxSides({ x: 2, y: 18, w: 4, h: 4 }, { x: 18, y: 2, w: 4, h: 4 })).toEqual({
      startPoint: { x: 6, y: 20 }, // right side
      endPoint: { x: 20, y: 6 } // bottom side
    })

    expect(getIdealBoxSides({ x: 2, y: 13, w: 4, h: 4 }, { x: 18, y: 13, w: 4, h: 4 })).toEqual({
      startPoint: { x: 6, y: 15 }, // right side
      endPoint: { x: 18, y: 15 } // left side
    })
  })
})

describe('isPointOnLeftOrRightSide', function () {
  it('properly detects when a point is on the left/right side of a box', function () {
    expect(isPointOnLeftOrRightSide({ x: 0, y: 2 }, { x: 0, y: 0, w: 4, h: 4 })).toEqual(true) // left side
    expect(isPointOnLeftOrRightSide({ x: 4, y: 2 }, { x: 0, y: 0, w: 4, h: 4 })).toEqual(true) // right side
    expect(isPointOnLeftOrRightSide({ x: 2, y: 0 }, { x: 0, y: 0, w: 4, h: 4 })).toEqual(false) // top side
    expect(isPointOnLeftOrRightSide({ x: 2, y: 4 }, { x: 0, y: 0, w: 4, h: 4 })).toEqual(false) // bottom side
  })
})
