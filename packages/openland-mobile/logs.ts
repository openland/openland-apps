import { disableTag, disableAll } from 'mental-log';

// Disable annoying logs
disableTag('Throttler');
disableTag('API');
disableTag('NavigationManager');
disableTag('GraphQL-Native');
disableTag('SAnimated');

//
// Disable all in production
//

if (!__DEV__) {
    disableAll();
}