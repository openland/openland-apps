export function parseGeometry(geometry: any) {
    return (JSON.parse(geometry as any) as number[][][]).map((p) => p.map((c) => c.map((c2) => [c2[0], c2[1]])));
}