import { describe, it, expect } from 'vitest';
import {
  euclideanDistance,
  derivePixelsPerMeter,
  computeShoelaceArea,
  evaluateAreaTolerance,
  haversineDistanceMeters,
} from './geometry';

describe('Geometry & Floor-Plan Measurement Service', () => {
  it('calculates Euclidean distance correctly', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 300, y: 400 };
    expect(euclideanDistance(p1, p2)).toBe(500);
  });

  it('derives pixels per meter scale factor accurately', () => {
    // 200 pixels representing 10 meters ground truth => 20 px/m
    const p1 = { x: 50, y: 100 };
    const p2 = { x: 250, y: 100 };
    const ppm = derivePixelsPerMeter(p1, p2, 10);
    expect(ppm).toBe(20);
  });

  it('throws on invalid scale parameters', () => {
    const p1 = { x: 10, y: 10 };
    const p2 = { x: 10, y: 10 };
    expect(() => derivePixelsPerMeter(p1, p2, 5)).toThrow();
    expect(() => derivePixelsPerMeter(p1, { x: 20, y: 20 }, 0)).toThrow();
  });

  it('computes polygon area using Shoelace formula correctly', () => {
    // A 10m x 20m rectangle => 200 sq. meters
    // At scale 10 pixels per meter:
    // Width = 10m * 10px/m = 100px
    // Height = 20m * 10px/m = 200px
    const pixelsPerMeter = 10;
    const rectangleVertices = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 200 },
      { x: 0, y: 200 },
    ];

    const area = computeShoelaceArea(rectangleVertices, pixelsPerMeter);
    expect(area).toBeCloseTo(200, 2);
  });

  it('handles irregular L-shaped polygons', () => {
    // L-shape:
    // (0,0) -> (40,0) -> (40,20) -> (20,20) -> (20,40) -> (0,40)
    // Area = (40*20) + (20*20) = 800 + 400 = 1200 square pixels
    // At 1 px/meter => 1200 sqm
    const lShape = [
      { x: 0, y: 0 },
      { x: 40, y: 0 },
      { x: 40, y: 20 },
      { x: 20, y: 20 },
      { x: 20, y: 40 },
      { x: 0, y: 40 },
    ];
    const area = computeShoelaceArea(lShape, 1);
    expect(area).toBe(1200);
  });

  it('evaluates area tolerance accurately', () => {
    // Computed 195 sqm vs declared 200 sqm -> delta = -5 (-2.5%), within 5% tolerance
    const within = evaluateAreaTolerance(195, 200, 5.0);
    expect(within.isWithinTolerance).toBe(true);
    expect(within.deltaSqm).toBe(-5);
    expect(within.deltaPercent).toBe(2.5);

    // Computed 180 sqm vs declared 200 sqm -> delta = -20 (-10%), outside 5% tolerance
    const outside = evaluateAreaTolerance(180, 200, 5.0);
    expect(outside.isWithinTolerance).toBe(false);
    expect(outside.deltaPercent).toBe(10);
  });

  it('calculates Haversine distance between coordinates', () => {
    // Delhi Connaught Place to India Gate (~2.3 km)
    // CP: 28.6328, 77.2197
    // India Gate: 28.6129, 77.2295
    const distanceMeters = haversineDistanceMeters(28.6328, 77.2197, 28.6129, 77.2295);
    expect(distanceMeters).toBeGreaterThan(2000);
    expect(distanceMeters).toBeLessThan(2600);
  });
});
