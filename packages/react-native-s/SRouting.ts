import { SRoutes } from './SRoutes';
import { NavigationManager } from './navigation/NavigationManager';

export class SRouting {

    static create(routes: SRoutes, route?: string, params?: any) {
        return new SRouting(new NavigationManager(routes, route, params));
    }

    readonly navigationManager: NavigationManager;

    constructor(navigationManager: NavigationManager) {
        this.navigationManager = navigationManager;
    }
}