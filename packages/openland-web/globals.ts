import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { AppNotifications } from 'openland-y-runtime-web/AppNotifications';
import { Router } from './routes';

// import './api/index';
// import './components/withApp';
// import 'openland-x-analytics';
// import 'react-lottie';
// import '@turf/turf';

// Is it a good place?
if (canUseDOM) {
    AppNotifications.setRouter(Router);
}