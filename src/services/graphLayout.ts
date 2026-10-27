export type NodeType = 'INSTITUTION' | 'DOCUMENT' | 'SIGNATORY';

export interface GraphNode {
  id: string;
  nameEn: string;
  nameHi: string;
  subEn: string;
  subHi: string;
  type: NodeType;
  radius: number; // visual radius in px
  source: 'LIVE' | 'SANDBOX' | 'SIMULATED';
  hash?: string;
  identifiers?: string[];
  // Normalized lane target (0 to 1)
  laneX: number;
  laneY: number;
}

export interface GraphEdge {
  id: string;
  source: string; // node id
  target: string; // node id
  pattern: 'solid' | 'dashed' | 'dotted';
  status: 'PASS' | 'DEFICIENCY' | 'REVIEW';
  labelEn: string;
  labelHi: string;
  fullReasonEn?: string;
  fullReasonHi?: string;
  reasonEn?: string;
  reasonHi?: string;
  tRatio?: number; // parametric position along edge (0.35, 0.5, 0.65)
  curveOffset?: number; // perpendicular bend amount in px
}

export interface PositionedNode extends GraphNode {
  x: number; // absolute center px
  y: number; // absolute center px
}

export interface PositionedEdge extends GraphEdge {
  sourceNode: PositionedNode;
  targetNode: PositionedNode;
  // Edge start and end at circle borders (not centers!)
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  curveControlX: number;
  curveControlY: number;
  pillX: number;
  pillY: number;
}

export interface LayoutBounds {
  width: number;
  height: number;
  padding?: number;
}

/**
 * Computes spread-out, collision-free layout where edges start/end strictly at circle borders,
 * edge pills are cleanly separated without collisions, and labels have clear space.
 */
export function computeGraphLayout(
  nodes: GraphNode[],
  edges: GraphEdge[],
  bounds: LayoutBounds
): {
  positionedNodes: PositionedNode[];
  positionedEdges: PositionedEdge[];
} {
  const width = Math.max(bounds.width, 360);
  const height = Math.max(bounds.height, 460);
  const padding = bounds.padding ?? 48;

  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  // Step 1: Initial placement from normalized coordinates
  const positionedNodes: PositionedNode[] = nodes.map((node) => ({
    ...node,
    x: padding + node.laneX * usableWidth,
    y: padding + node.laneY * usableHeight,
  }));

  // Step 2: Multi-pass collision & distance relaxation (up to 50 iterations)
  // Ensures at least ~90px clear separation between centers of nodes
  for (let iter = 0; iter < 50; iter++) {
    for (let i = 0; i < positionedNodes.length; i++) {
      for (let j = i + 1; j < positionedNodes.length; j++) {
        const n1 = positionedNodes[i];
        const n2 = positionedNodes[j];

        // Separation buffer: node radii + generous label area buffer (90px)
        const minDist = n1.radius + n2.radius + 90;
        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < minDist) {
          const overlap = (minDist - dist) / 2;
          const pushX = (dx / dist) * overlap;
          const pushY = (dy / dist) * overlap;

          n1.x -= pushX;
          n1.y -= pushY;
          n2.x += pushX;
          n2.y += pushY;

          // Clamp strictly within bounds (accounting for label below)
          n1.x = Math.max(padding + 50, Math.min(width - padding - 50, n1.x));
          n1.y = Math.max(padding + 25, Math.min(height - padding - 65, n1.y));
          n2.x = Math.max(padding + 50, Math.min(width - padding - 50, n2.x));
          n2.y = Math.max(padding + 25, Math.min(height - padding - 65, n2.y));
        }
      }
    }
  }

  const nodeMap = new Map<string, PositionedNode>();
  positionedNodes.forEach((n) => nodeMap.set(n.id, n));

  // Step 3: Compute Edge paths from circle border to circle border, with curve routing
  const rawEdges = edges
    .map((edge) => {
      const sourceNode = nodeMap.get(edge.source);
      const targetNode = nodeMap.get(edge.target);
      if (!sourceNode || !targetNode) return null;

      const dx = targetNode.x - sourceNode.x;
      const dy = targetNode.y - sourceNode.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      // Normal unit vector along line
      const uX = dx / dist;
      const uY = dy / dist;

      // Start at source circle border, end at target circle border
      const startX = sourceNode.x + uX * sourceNode.radius;
      const startY = sourceNode.y + uY * sourceNode.radius;
      const endX = targetNode.x - uX * targetNode.radius;
      const endY = targetNode.y - uY * targetNode.radius;

      // Perpendicular unit vector (-uY, uX)
      const perpX = -uY;
      const perpY = uX;

      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      // Curve offset: bend away from center labels if needed
      const bend = edge.curveOffset ?? 0;
      const curveControlX = midX + perpX * bend;
      const curveControlY = midY + perpY * bend;

      // Parametric point along quadratic curve: t (default 0.5)
      const t = edge.tRatio ?? 0.5;
      const oneMinusT = 1 - t;
      // B(t) = (1-t)^2 * P0 + 2*(1-t)*t * P1 + t^2 * P2
      const pointOnCurveX =
        oneMinusT * oneMinusT * startX + 2 * oneMinusT * t * curveControlX + t * t * endX;
      const pointOnCurveY =
        oneMinusT * oneMinusT * startY + 2 * oneMinusT * t * curveControlY + t * t * endY;

      // Offset pill perpendicular to edge by 14px so it rests cleanly beside line
      const pillOffset = 14;
      const pillX = pointOnCurveX + perpX * (bend >= 0 ? pillOffset : -pillOffset);
      const pillY = pointOnCurveY + perpY * (bend >= 0 ? pillOffset : -pillOffset);

      return {
        ...edge,
        sourceNode,
        targetNode,
        startX,
        startY,
        endX,
        endY,
        curveControlX,
        curveControlY,
        pillX,
        pillY,
      };
    })
    .filter((e): e is PositionedEdge => e !== null);

  // Step 4: Simple pill collision pass (push apart any two overlapping pills)
  for (let pIter = 0; pIter < 20; pIter++) {
    for (let i = 0; i < rawEdges.length; i++) {
      for (let j = i + 1; j < rawEdges.length; j++) {
        const p1 = rawEdges[i];
        const p2 = rawEdges[j];

        // Pill box dimensions approximately 110px x 24px
        const pDistX = Math.abs(p1.pillX - p2.pillX);
        const pDistY = Math.abs(p1.pillY - p2.pillY);

        if (pDistX < 115 && pDistY < 28) {
          // Push vertically and horizontally
          const nudgeY = (28 - pDistY) / 2;
          const nudgeX = (115 - pDistX) / 2;
          if (p1.pillY <= p2.pillY) {
            p1.pillY -= nudgeY;
            p2.pillY += nudgeY;
            p1.pillX -= nudgeX;
            p2.pillX += nudgeX;
          } else {
            p1.pillY += nudgeY;
            p2.pillY -= nudgeY;
            p1.pillX += nudgeX;
            p2.pillX -= nudgeX;
          }
        }
      }
    }
  }

  return { positionedNodes, positionedEdges: rawEdges };
}
