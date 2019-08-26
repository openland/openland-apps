import { TimingAnimation, Animation, SequenceAnimation } from './Animation';

export const Animations = {
    timing: (args: { from: number, to: number, duration: number, delay?: number }): Animation => new TimingAnimation(args.from, args.to, args.duration, args.delay || 0),
    sequence: (...animations: Animation[]): Animation => new SequenceAnimation(animations)
};