import { Easing } from './Easing';

export const Easings = {
    ease: new Easing(0.25, 0.1, 0.25, 1),
    easeIn: new Easing(0.42, 0, 1, 1),
    easeOut: new Easing(0, 0, 0.58, 1),
    easeInOut: new Easing(0.42, 0, 0.58, 1),
    standart: new Easing(.29, .09, .24, .99)
};