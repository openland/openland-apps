export function extractPlaceholder(src: string) {
    let s = src.trim();
    if (s.length === 0) {
        return '?';
    }
    let s2 = s.split(' ');
    if (s2.length === 1) {
        return s2[0].trim().substring(0, 1).toUpperCase();
    }
    return s2[0].trim().substring(0, 1).toUpperCase() + s2[1].trim().substring(0, 1).toUpperCase();
} 