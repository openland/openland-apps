import * as ga from 'react-ga';
import { canUseDOM } from './environment';
ga.initialize('UA-99506931-3');
if (canUseDOM) {
    ga.pageview('/');
}