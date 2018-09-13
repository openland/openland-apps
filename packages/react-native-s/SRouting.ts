import { SRoutes } from './SRoutes';
import { NavigationManager } from './navigation/NavigationManager';

export class SRouting {
    readonly navigationManager: NavigationManager;

    constructor(routes: SRoutes) {
        this.navigationManager = new NavigationManager(routes);
    }
}