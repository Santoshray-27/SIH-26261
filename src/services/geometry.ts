/**
 * Pure geometry utilities for floorplan measurements and geo-distance calculations.
 * Solution references:
 * - §6 MeasurementSession (polygon tracing, shoelace area formula, scale calibration)
 * - §3.3 haversine distance for campus geotag validation
 */

export interface Point2D {
  x: number;
  y: number;
}

/**
 * Computes Euclidean pixel distance between two points.
 */
export function euclideanDistance(p1: Point2D, p2: Point2D): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Derives scale in pixels per meter.
 * @param p1 First point on scale bar
 * @param p2 Second point on scale bar
 * @param statedLengthMeters Declared ground length in meters
 */
export function derivePixelsPerMeter(
  p1: Point2D,
  p2: Point2D,
  statedLengthMeters: number
): number {
  if (statedLengthMeters <= 0) {
    throw new Error('Stated scale length must be greater than zero.');
  }
  const pixelDistance = euclideanDistance(p1, p2);
  if (pixelDistance <= 0) {
    throw new Error('Reference points must not be identical.');
  }
  return pixelDistance / statedLengthMeters;
}

/**
 * Calculates area in square meters of a 2D polygon using the Shoelace formula (Gauss's area formula).
 * @param vertices Polygon points in pixel coordinates
 * @param pixelsPerMeter Calibrated scale factor
 */
export function computeShoelaceArea(
  vertices: Point2D[],
  pixelsPerMeter: number
): number {
  const n = vertices.length;
  if (n < 3) {
    return 0;
  }
  if (pixelsPerMeter <= 0) {
    throw new Error('Pixels per meter must be positive.');
  }

  let pixelArea2 = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    pixelArea2 += vertices[i].x * vertices[j].y;
    pixelArea2 -= vertices[j].x * vertices[i].y;
  }

  const rawPixelArea = Math.abs(pixelArea2) / 2;
  const squareMetersPerSquarePixel = 1 / (pixelsPerMeter * pixelsPerMeter);
  return rawPixelArea * squareMetersPerSquarePixel;
}

/**
 * Compares computed area with declared area against a percentage tolerance.
 */
export function evaluateAreaTolerance(
  computedAreaSqm: number,
  declaredAreaSqm: number,
  tolerancePercent: number = 5.0
): {
  isWithinTolerance: boolean;
  deltaSqm: number;
  deltaPercent: number;
} {
  const deltaSqm = computedAreaSqm - declaredAreaSqm;
  const deltaPercent = declaredAreaSqm > 0 ? (Math.abs(deltaSqm) / declaredAreaSqm) * 100 : 0;
  const isWithinTolerance = deltaPercent <= tolerancePercent;

  return {
    isWithinTolerance,
    deltaSqm: Math.round(deltaSqm * 100) / 100,
    deltaPercent: Math.round(deltaPercent * 100) / 100,
  };
}

/**
 * Computes great-circle distance in meters between two (lat, lon) coordinates using Haversine formula.
 */
export function haversineDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth's mean radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
