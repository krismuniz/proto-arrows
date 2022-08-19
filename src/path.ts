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
 * Controls how "curvy" the path is by offsetting
 * the control points from the ideal points.
 */
const CONTROL_POINT_OFFSET_RATE = 0.75

/**
 * Given two points, produce a cubic bezier curve that
 * links them.
 */
export function getCurve (start: Point, end: Point, options?: { flip?: boolean }): CubicBezier {
  const dX = (end.x - start.x) * (options?.flip ? CONTROL_POINT_OFFSET_RATE : 0)
  const dY = (end.y - start.y) * (options?.flip ? 0 : -CONTROL_POINT_OFFSET_RATE)

  const controlPoints: [Point, Point] =
    options?.flip
      ? [
          {
            x: start.x + dX,
            y: start.y - dY
          },
          {
            x: end.x - dX,
            y: end.y + dY
          }
        ]
      : [
          {
            x: start.x + dX,
            y: start.y - dY
          },
          {
            x: end.x - dX,
            y: end.y + dY
          }
        ]

  return { start: start, control1: controlPoints[0], control2: controlPoints[1], end: end }
}

/**
 * Given two boxes, produce a cubic bezier curve that
 * links them.
 */
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
