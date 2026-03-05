export interface BoundingBox {
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface DetectedObject {
  label: string;
  braille: string;
  boundingBox: BoundingBox;
}
