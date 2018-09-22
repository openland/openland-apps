import { SRoutes } from './SRoutes';
import { NavigationManager } from './navigation/NavigationManager';

export class SRouting {

    static create(routes: SRoutes) {
        return new SRouting(new NavigationManager(routes));
    }

    readonly navigationManager: NavigationManager;

    constructor(navigationManager: NavigationManager) {
        this.navigationManager = navigationManager;
    }
}