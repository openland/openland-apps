import { getTyping } from './typing';

const cache = {}

const assertNever = (name: string): never => {
  throw new TypeError(`Wrong icon name: ${name}`)
}

const getHash = (name: string, color: string): string => `${name}${color}`;

export const getJSON = (name: string, color: string): object => {
  const hash = getHash(name, color)

  switch (name) {

    case 'typing':
      if (!cache[hash]) {
        cache[hash] = getTyping(color)
      }

      return cache[hash]

    default:
      return assertNever(name)
  }
}