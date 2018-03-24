export function parseGeometry(geometry: string) {
    return (JSON.parse(geometry) as number[][][]).map((p) => p.map((c) => c.map((c2) => [c2[0], c2[1]])));
}
export function parceGeometryToGeoJSON(geometry: string) {
    return { 'type': 'MultiPolygon', 'coordinates': parseGeometry(geometry) };
}