export function readGeneration(): number {
    let generationValue = localStorage.getItem('storage.generation');
    let generation = 0;
    if (generationValue) {
        generation = Number.parseInt(generationValue, 10);
    }
    return generation;
}

export function advanceGeneration() {
    localStorage.setItem('storage.generation', (readGeneration() + 1).toString());
}