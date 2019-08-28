import { Easings } from './Easings';
import { TimingAnimation, Animation, SequenceAnimation, SetValueAnimation } from './Animation';
import { Easing } from './Easing';

export const Animations = {
    setValue: (to: number): Animation => new SetValueAnimation(to),
    timing: (args: { to: number, duration: number, delay?: number, easing?: Easing }): Animation => new TimingAnimation(args.to, args.duration, args.delay || 0, args.easing || Easings.standart),
    sequence: (...animations: Animation[]): Animation => new SequenceAnimation(animations)
};