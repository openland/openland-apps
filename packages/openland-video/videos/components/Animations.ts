import { TimingAnimation, Animation, SequenceAnimation, SetValueAnimation } from './Animation';

export const Animations = {
    setValue: (to: number): Animation => new SetValueAnimation(to),
    timing: (args: { to: number, duration: number, delay?: number }): Animation => new TimingAnimation(args.to, args.duration, args.delay || 0),
    sequence: (...animations: Animation[]): Animation => new SequenceAnimation(animations)
};