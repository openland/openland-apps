import { getTyping } from './typing';
import { getFileTyping } from './fileTyping';

const cache = {};

const getHash = (name: string, color: string): string => `${name}${color}`;

export const getJSON = (name: string, color: string): object => {
  const hash = getHash(name, color);

  switch (name) {

    case 'typing':
      if (!cache[hash]) {
        cache[hash] = getTyping(color);
      }
      return cache[hash];

    case 'file':
      if (!cache[hash]) {
        cache[hash] = getFileTyping(color);
      }
      return cache[hash];

    default:
      if (!cache[hash]) {
        cache[hash] = getTyping(color);
      }
      return cache[hash];
  }
};