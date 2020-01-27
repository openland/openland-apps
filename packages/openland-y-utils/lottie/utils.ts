export const hexToRgba = (hex: string): Array<number> => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 8), 16);
  return [r, g, b, 1];
}

export const rgbaToLotty = ([r, g, b, a]: Array<number>): Array<number> => 
  [r, g, b].map(color => color / 255).concat([a]);