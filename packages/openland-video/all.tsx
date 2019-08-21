import * as React from 'react';
import { VideoRegistry } from './VideoRegistry';
import { SampleVideo, SampleVideoDuration } from './videos/SampleVideo';

VideoRegistry.register('sample', <SampleVideo />, SampleVideoDuration);