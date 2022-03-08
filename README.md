# `proto-arrows`

[![License:MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT) ![Type Declarations](https://img.shields.io/npm/types/combi.svg?style=flat-square)

A set of utility functions for drawing beautiful arrows using cubic bezier paths. Inspired by [`perfect-arrows`](https://github.com/steveruizok/perfect-arrows).

Why `proto-arrows`? Because cubic bezier curves look delicious for prototyping software like Sketch or Figma. So, why not make a library that simplifies the process of drawing them too?

## Example Usage

### An Arrow component in React

```tsx
import React from 'react'
import {
  getCurve,
  interpolateCubicBezierAngle,
  getCubicBezierSVGPath,
} from 'proto-arrows'

export function Arrow() {
  const curve = getCurve({ x: 128, y: 128 }, { x: 256, y: 256 })
  const svgPath = getCubicBezierSVGPath(bezierCurve)
  const endAngle = interpolateCubicBezierAngle(bezierCurve, 1)

  return (
    <svg
      viewBox="0 0 512 512"
      style={{ width: 512, height: 512 }}
      stroke="#000"
      fill="#000"
      strokeWidth={3}
    >
      <circle cx={curve.start.x} cy={curve.start.y} r={4} />
      <path d={svgPath} fill="none" />
      <polygon
        points="0,-6 12,0, 0,6"
        transform={`translate(${curve.end.x},${curve.end.y}) rotate(${endAngle})`}
      />
    </svg>
  )
}
```

## Special Thanks

* [Steve Ruiz - (steveruizok)](https://github.com/steveruizok) for building the [`perfect-arrows` (MIT)](https://github.com/steveruizok/perfect-arrows) library, which inspired this library.

* [Peter Beshai - (pbeshai)](https://github.com/pbeshai) for building [`vis-utils` (MIT)](https://github.com/pbeshai/vis-utils), from which I borrowed the interpolation functions for cubic bezier paths.
