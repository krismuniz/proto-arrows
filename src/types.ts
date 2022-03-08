export interface Point {
  x: number;
  y: number;
}

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CubicBezier {
  start: Point;
  control1: Point;
  control2: Point;
  end: Point;
}
