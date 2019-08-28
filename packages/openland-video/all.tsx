import * as React from 'react';
import { VideoRegistry } from './VideoRegistry';
import { AnimationSampleView, AnimationSampleViewDuration } from './videos/AnimationSampleView';

VideoRegistry.register('sample', <AnimationSampleView />, AnimationSampleViewDuration);