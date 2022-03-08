import { Box, Point } from './types'

/**
 * Get a list of points set up at the center
 * of every side of the box (left, right, top, bottom)
 */
export function getBoxBounds (box: Box): [Point, Point, Point, Point] {
  return [
    { x: box.x, y: box.y + box.h / 2 }, // left
    { x: box.x + box.w, y: box.y + box.h / 2 }, // right
    { x: box.x + box.w / 2, y: box.y }, // top
    { x: box.x + box.w / 2, y: box.y + box.h } // bottom
  ]
}

/**
 * Find the ideal points to draw an edge
 * between the two boxes by finding the
 * shortest linear distance between the
 * two.
 */
export function getIdealBoxSides (
  startBox: Box,
  endBox: Box
): {
  startPoint: Point
  endPoint: Point
} {
  const startPts = getBoxBounds(startBox)
  const endPts = getBoxBounds(endBox)

  let minDistanceSource: [number, Point] = [Infinity, { x: 0, y: 0 }]
  let minDistanceTarget: [number, Point] = [Infinity, { x: 0, y: 0 }]

  for (const pointA of startPts) {
    for (const pointB of endPts) {
      const distance = Math.hypot(pointA.x - pointB.x, pointA.y - pointB.y)

      if (distance < minDistanceSource[0]) {
        minDistanceSource = [distance, pointA]
      }

      if (distance < minDistanceTarget[0]) {
        minDistanceTarget = [distance, pointB]
      }
    }
  }

  return {
    startPoint: minDistanceSource[1],
    endPoint: minDistanceTarget[1]
  }
}

/**
 * Infer if a point is on the left or right side of a box
 */
export function isPointOnLeftOrRightSide (point: Point, box: Box): boolean {
  return point.x === box.x || point.x === box.x + box.w
}
