import { Box, CubicBezier, Point } from './types'
import { getIdealBoxSides, isPointOnLeftOrRightSide } from './box'

/**
 * Find the center of two points using rudimentary
 * linear interpolation.
 */
export function getLineCenter (pointA: Point, pointB: Point): Point {
  return {
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2
  }
}

/**
 * Given a cubic bezier curve, produce its corresponding
 * SVG path string.
 */
export function getCubicBezierSVGPath (bezier: CubicBezier): string {
  const { start, control1, control2, end } = bezier

  return [
    `M${start.x},${start.y}`,
    `C${control1.x},${control1.y} ${control2.x},${control2.y}`,
    `${end.x},${end.y}`
  ].join(' ')
}

/**
 * Given two points, produce a cubic bezier curve that
 * links them.
 */
export function getCurve (start: Point, end: Point, options?: { flip?: boolean }): CubicBezier {
  const center = getLineCenter(start, end)
  const controlPoints: [Point, Point] =
    options?.flip
      ? [
          {
            x: center.x,
            y: start.y
          },
          {
            x: center.x,
            y: end.y
          }
        ]
      : [
          {
            x: start.x,
            y: center.y
          },
          {
            x: end.x,
            y: center.y
          }
        ]

  return { start: start, control1: controlPoints[0], control2: controlPoints[1], end: end }
}

export function getBoxToBoxCurve (startBox: Box, endBox: Box): CubicBezier {
  const { startPoint, endPoint } = getIdealBoxSides(startBox, endBox)

  return getCurve(
    startPoint,
    endPoint,
    {
      // Flip the curve if the `startPoint` is on the left/right
      // side of the `startBox` AND the `endPoint` is on the
      // left/right side of the `endBox`.
      //
      // In the future we'll make this an option.
      flip: isPointOnLeftOrRightSide(startPoint, startBox) &&
      isPointOnLeftOrRightSide(endPoint, endBox)
    }
  )
}
